import * as React from 'react';

import { Vector2 } from "./Vector2";
import { WesketchService, WesketchEventType, IWesketchEvent } from './WesketchService';
import { auth } from '../../Common/AuthService';

import { ClearCanvasButton } from './ClearCanvasButton';
import { IWesketchGameState } from './Wesketch';
import { Colors } from './Colors';
import { BrushSizeButton } from './BrushSizeButton';
import { PhaseTypes } from './PhaseTypes';

interface IProps {
    gameState: IWesketchGameState;
    wss: WesketchService;
}

interface IState {
    canvasRect: ClientRect;
    canDraw: boolean;
    isDrawing: boolean;
    mousePos: Vector2;
    from: Vector2;
    to: Vector2;
    color: string;
}

export class Painter extends React.Component<IProps, IState> {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor(props: IProps) {
        super(props);

        this.state = {
            canvasRect: { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 },
            canDraw: false,
            isDrawing: false,
            mousePos: new Vector2(0, 0),
            from: new Vector2(0, 0),
            to: new Vector2(0, 0),
            color: '#000000'
        };

        // this.canvas = null;
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onEvent = this.onEvent.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
    }

    public componentWillReceiveProps() {
        this.ctx.strokeStyle = this.props.gameState.primaryColor;
        this.ctx.lineWidth = this.props.gameState.brushSize;

        let canDraw = false;

        // Only drawing player, in drawing-phase can draw
        const drawingPlayer = this.props.gameState.players.find(p => p.isDrawing);
        if (drawingPlayer) {
            canDraw = this.props.gameState.phase === PhaseTypes.Drawing
                && drawingPlayer.userId === auth.currentUser().guid;
        }

        // Everyone can draw in debugmode
        canDraw = this.props.gameState.debugMode ? true : canDraw;

        this.setState({ canDraw });
    }

    public componentDidMount() {
        this.props.wss.on('event', this.onEvent);

        if (this.canvas !== null) {
            this.canvas.width = 960;
            this.canvas.height = 544;
            this.ctx = this.canvas.getContext('2d')!;
            this.ctx.lineJoin = 'round';
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = this.props.gameState.brushSize;
            this.ctx.strokeStyle = this.props.gameState.primaryColor;

            this.setState({
                canvasRect: this.canvas.getBoundingClientRect()
            });
        }

        window.addEventListener("resize", () => {
            if (this.canvas !== null) {
                this.setState({
                    canvasRect: this.canvas.getBoundingClientRect()
                })
            }
        });
    }

    public render() {
        const painterTools = this.state.canDraw
            ?
            <div className="tools">
                <ClearCanvasButton wss={this.props.wss} />
                <div className="button fa fa-paint-brush" />
                <BrushSizeButton label="+" modifier={3} wss={this.props.wss} />
                <BrushSizeButton label="-" modifier={-3} wss={this.props.wss} />
                <Colors currentColor={this.props.gameState.primaryColor} wss={this.props.wss} />
            </div>
            : '';

        return (
            <div id="painter" className={this.state.canDraw ? 'can-draw' : ''}>
                {painterTools}

                <canvas width="960" height="544"
                    ref={(el) => this.canvas = el as HTMLCanvasElement}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    onMouseOut={this.onMouseOut}
                    onContextMenu={this.onContextMenu} />

                <div className="debug">
                    <div>CanDraw: {this.state.canDraw.toString()}</div>
                    <div>Mouse: {this.state.mousePos.x}, {this.state.mousePos.y}</div>
                </div>
            </div>
        );
    }

    private draw(from: Vector2, to: Vector2, color: string) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(from.x, from.y);
        this.ctx.lineTo(to.x, to.y);
        this.ctx.stroke();
    }

    private onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        if (this.state.canDraw) {
            const color = event.button === 2 ? this.props.gameState.secondaryColor : this.props.gameState.primaryColor;
            this.setState({
                isDrawing: true,
                from: this.state.mousePos,
                color
            });
            this.draw(this.state.from, this.state.from, color)
            this.props.wss.emit(WesketchEventType.Draw, { from: this.state.from, to: this.state.to, color })
        }
    }

    private onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const mousePosition = new Vector2(
            event.clientX - this.state.canvasRect.left,
            event.clientY - this.state.canvasRect.top);
        this.setState({ mousePos: mousePosition, to: mousePosition });

        if (this.state.isDrawing) {
            this.draw(this.state.from, this.state.to, this.state.color);
            this.props.wss.emit(WesketchEventType.Draw, { from: this.state.from, to: this.state.to, color: this.state.color })
        }

        this.setState({ from: this.state.to });
    }

    private onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ isDrawing: false });
        this.ctx.closePath();
    }

    private onMouseOut = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ isDrawing: false });
    }

    private onContextMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        return;
    }

    private onEvent = (event: IWesketchEvent) => {
        if (event.type === WesketchEventType.Draw) {
            // Do not redraw your own drawing :D
            // TODO: check why auth is null (chrome debug) ?!?
            if (event.userId !== auth.currentUser().guid) {
                this.draw(event.value.from, event.value.to, event.value.color);
            }
        }

        if (event.type === WesketchEventType.ClearCanvas) {
            this.ctx.clearRect(0, 0, this.state.canvasRect.width, this.state.canvasRect.height);
        }
    }

}