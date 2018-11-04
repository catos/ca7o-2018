import * as React from 'react';

import { PhaseTypes } from '../Types/PhaseTypes';
import { WesketchEventType } from '../Types/WesketchEventType';
import { IWesketchEvent } from '../Interfaces/IWesketchEvent';
import { IWesketchPlayer } from '../Interfaces/IWesketchPlayer';
import { IWesketchGameState } from '../Interfaces/IWesketchGameState';

import { auth } from '../../../Common/AuthService';
import { Vector2 } from "./Vector2";
import { WesketchSocket } from '../WesketchSocket';

import { PainterTools } from './PainterTools';

interface IProps {
    gameState: IWesketchGameState;
    wss: WesketchSocket;
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
        const { gameState } = this.props;

        // Only drawing player, in drawing-phase can draw
        let canDraw = false;
        const drawingPlayer = gameState.players.find(p => p.isDrawing);
        if (drawingPlayer) {
            canDraw = gameState.phase === PhaseTypes.Drawing
                && drawingPlayer.userId === auth.currentUser().guid;
        }

        // TODO: Everyone can draw in debugmode
        canDraw = gameState.debugMode ? true : canDraw;

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
        const { wss, gameState } = this.props;

        return (
            <div id="painter" className={this.state.canDraw ? 'can-draw' : ''}>

                <div id="debug" className="debug-painter">
                    <div>Coords: {this.state.mousePos.x}, {this.state.mousePos.y}</div>
                    <div>From: {this.state.from.x}, {this.state.from.y}</div>
                    <div>To: {this.state.to.x}, {this.state.to.y}</div>
                    <div>canvasRect: {this.state.canvasRect.left}, {this.state.canvasRect.top} - {this.state.canvasRect.width}, {this.state.canvasRect.height}</div>
                    <div>window.scroll: {window.scrollX}, {window.scrollY}</div>
                    <div>isDrawing: {this.state.isDrawing.toString()}</div>
                    <div>canDraw: {this.state.canDraw.toString()}</div>
                </div>

                {this.state.canDraw
                    ? <PainterTools wss={wss} gameState={gameState} />
                    : ''}

                <canvas width="960" height="544"
                    className={`paint-cursor-${gameState.brushSize}`}
                    ref={(el) => this.canvas = el as HTMLCanvasElement}
                    onMouseDown={this.onMouseDown}
                    onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                    onMouseOut={this.onMouseOut}
                    onWheel={this.onMouseWheel}
                    onContextMenu={this.onContextMenu} />
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

            // Set color to primary or secondary
            const color = event.button === 2
                ? this.props.gameState.secondaryColor
                : this.props.gameState.primaryColor;

            this.setState({
                isDrawing: true,
                from: this.state.mousePos,
                color
            });
            this.draw(this.state.from, this.state.to, this.state.color);
            this.props.wss.emit(WesketchEventType.Draw, { from: this.state.from, to: this.state.to, color })
        }
    }

    private onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const coords = this.getCoords(event);
        this.setState({ mousePos: coords, to: coords });

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

    private onMouseWheel = (event: React.WheelEvent<HTMLElement>) => {
        event.preventDefault();
        if (this.state.canDraw) {
            const modifier = event.nativeEvent.wheelDelta < 0 ? -3 : 3;
            this.props.wss.emit(WesketchEventType.ChangeBrushSize, modifier)
        }
    }

    private onContextMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        return;
    }

    private getCoords = (event: React.MouseEvent<HTMLElement>): Vector2 => {
        const coords = new Vector2(
            event.clientX - this.state.canvasRect.left,
            event.clientY - this.state.canvasRect.top + window.scrollY);

        if (this.ctx.lineWidth > 0) {
            const brushOffset = Math.floor(this.ctx.lineWidth / 2)
            coords.x += brushOffset
            coords.y += brushOffset
        }

        return coords;
    }

    private onEvent = (event: IWesketchEvent) => {
        const { wss, gameState } = this.props;
        const currentUser = auth.currentUser();

        const drawingPlayer = gameState.players.find(p => p.isDrawing) as IWesketchPlayer;
        if (event.type === WesketchEventType.SaveDrawing
            && drawingPlayer.userId === currentUser.guid) {
            wss.emit(WesketchEventType.SaveDrawing, {
                player: currentUser.name,
                word: gameState.currentWord,
                data: this.canvas.toDataURL()
            });
        }

        if (event.type === WesketchEventType.Draw) {
            // Do not redraw your own drawing :D
            if (event.userId !== currentUser.guid) {
                this.draw(event.value.from, event.value.to, event.value.color);
            }
        }

        if (event.type === WesketchEventType.ClearCanvas) {
            this.ctx.clearRect(0, 0, this.state.canvasRect.width, this.state.canvasRect.height);
        }

        if (event.type === WesketchEventType.UpdateGameState) {
            this.ctx.lineWidth = gameState.brushSize;
            this.ctx.strokeStyle = gameState.primaryColor;
        }
    }

}