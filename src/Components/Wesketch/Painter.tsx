import * as React from 'react';

import { Vector2 } from "./Vector2";
import { WesketchService, WesketchEventType, IWesketchEvent } from './WesketchService';
import { auth } from '../../Common/AuthService';

import { ClearCanvasButton } from './ClearCanvasButton';

interface IProps {
    wss: WesketchService;
}

interface IState {
    canvasRect: ClientRect;

    isDrawing: boolean;
    mousePos: Vector2;
    from: Vector2;
    to: Vector2;

    lineWidth: number;
    currentColor: string;
}

export class Painter extends React.Component<IProps, IState> {
    private canvas: HTMLCanvasElement;
    // TODO: change type any to CanvasRenderingContext2D
    private ctx: any; // CanvasRenderingContext2D;

    constructor(props: IProps) {
        super(props);

        this.state = {
            canvasRect: { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 },
            isDrawing: false,
            mousePos: new Vector2(0, 0),
            from: new Vector2(0, 0),
            to: new Vector2(0, 0),
            lineWidth: 3,
            currentColor: '#000000',
        };

        // this.canvas = null;
    }

    public componentDidMount() {
        this.props.wss.on('event', this.onEvent);

        if (this.canvas !== null) {

            this.ctx = this.canvas.getContext('2d')!;
            this.ctx.lineJoin = 'round';
            this.ctx.lineCap = 'round';
            this.ctx.lineWidth = this.state.lineWidth;
            this.ctx.strokeStyle = this.state.currentColor;


            this.setState({
                canvasRect: this.canvas.getBoundingClientRect()
            })
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
        return (
            <div id="painter" className="cursorClass">

                <div className="tools">
                    <ClearCanvasButton onClick={() => this.props.wss.emit(WesketchEventType.ClearCanvas, {})} />
                    {/* <div><button className="btn btn-primary btn-sm">F</button></div>
                    <BrushSizeButton label="+" modifier={3} onClick={this.createWesketchEvent} />
                    <BrushSizeButton label="-" modifier={-3} onClick={this.createWesketchEvent} />
                    <Colors currentColor={this.state.currentColor} onClick={this.createWesketchEvent} /> */}
                </div >

                <div className="canvas">
                    <canvas width="500" height="500"
                        ref={(el) => this.canvas = el as HTMLCanvasElement}
                        onMouseDown={this.onMouseDown}
                        onMouseUp={this.onMouseUp}
                        onMouseMove={this.onMouseMove}
                        onMouseOut={this.onMouseOut} />
                </div >

                {/* <DebugInfo painterState={this.state} /> */}
            </div >
        );
    }

    private draw(from: Vector2, to: Vector2) {
        this.ctx.beginPath()

        const brushOffset = -5; // Math.floor(this.ctx.lineWidth / 2);
        this.ctx.moveTo(from.x + brushOffset, from.y + brushOffset)
        this.ctx.lineTo(to.x + brushOffset, to.y + brushOffset)

        this.ctx.stroke()
    }

    private onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
        // if (this.currentTool === PainterTool.Brush) {
        this.setState({
            isDrawing: true,
            from: this.state.mousePos
        });
        this.draw(this.state.from, this.state.from)
        // }
    }

    private onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const mousePosition = new Vector2(
            event.clientX - this.state.canvasRect.left, 
            event.clientY - this.state.canvasRect.top);
        this.setState({
            mousePos: mousePosition,
            to: mousePosition
        });

        if (this.state.isDrawing) {
            this.draw(this.state.from, this.state.to);
            this.props.wss.emit(WesketchEventType.Draw, { from: this.state.from, to: this.state.to })
        }

        this.setState({
            from: this.state.to
        });
    }

    private onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            isDrawing: false
        });
        this.ctx.closePath();
    }

    private onMouseOut = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            isDrawing: false
        });
    }

    private onEvent = (event: IWesketchEvent) => {
        if (event.type === WesketchEventType.Draw) {

            // Do not redraw your own drawing :D
            // TODO: check why auth is null (chrome debug) ?!?
            if (event.userId !== auth.currentUser().guid) {
                this.draw(event.value.from, event.value.to);
            }
        }

        if (event.type === WesketchEventType.ClearCanvas) {
            this.ctx.clearRect(0, 0, this.state.canvasRect.width, this.state.canvasRect.height);
        }
    }


}