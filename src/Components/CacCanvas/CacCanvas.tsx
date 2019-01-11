import * as React from "react";
import { IPlayer } from "../Cac/Models";
import { CacSocket, ICacEvent } from "../Cac/CacSocket";
import { Vector2 } from "../Wesketch/Painter/Vector2";
import { CanvasUI } from "./CanvasUI";

import './CacCanvas.css';

export interface IGameState {
    phase: string;
    gameOver: boolean;
    ticks: number;
    players: IPlayer[];
}

interface IState {
    canvasRect: ClientRect;
    cs: CacSocket;
    myName: string;
    gs: IGameState;
}

export class CacCanvas extends React.Component<{}, IState> {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private cui: CanvasUI;
    private mousePos: Vector2;

    constructor(props: any) {
        super(props);

        this.state = {
            canvasRect: { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0 },
            cs: new CacSocket(),
            myName: 'Player 1',
            gs: {
                phase: '',
                gameOver: false,
                ticks: 0,
                players: []
            }
        };

        this.mousePos = new Vector2(0, 0);
    }

    public componentDidMount() {
        // Watch events
        this.state.cs.on('event', this.onEvent);

        if (this.canvas !== null) {
            this.canvas.width = 500;
            this.canvas.height = 500;
            this.ctx = this.canvas.getContext('2d')!;
            this.ctx.scale(4, 4);

            this.setState({
                canvasRect: this.canvas.getBoundingClientRect()
            });

        }

        this.update();
    }

    public componentWillUnmount() {
        this.state.cs.disconnect();
    }

    public render() {
        return (
            <div>
                <canvas id="cac-canvas"
                    ref={(el) => this.canvas = el as HTMLCanvasElement}
                    // onMouseDown={this.onMouseDown}
                    // onMouseUp={this.onMouseUp}
                    onMouseMove={this.onMouseMove}
                // onMouseOut={this.onMouseOut} 
                />
            </div>
        );
    }

    private draw = () => {
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.cui = new CanvasUI(this.canvas, this.ctx);
        this.cui.label(50, 50, 'onClick!');
        this.cui.button(100, 100, 'Click', () => {
            console.log('onClick!! fire event!');
            this.state.cs.emit('click', { foo: 'bar' });
        });

        this.cui.pixel(10, 10);
        this.cui.pixel(490, 490);
        this.cui.pixel(10, 490);
        this.cui.pixel(490, 10);
        this.cui.label(5, 5, `Mouse: ${this.mousePos.x}, ${this.mousePos.y}`)
}

    private update = (time: number = 0) => {
        
        this.draw();

        requestAnimationFrame(this.update);
    }

    private onEvent = (event: ICacEvent) => {
        console.log(`onEvent - type: ${event.type}`);

        if (event.type === 'UpdateGameState') {
            const gs = event.value as IGameState;
            this.setState({ gs });
        }
    }

    // private onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    //     console.log('onMouseDown');
    // }

    // private onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
    //     console.log('onMouseUp');
    // }

    private onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        this.mousePos = new Vector2(
            event.clientX - this.state.canvasRect.left,
            event.clientY - this.state.canvasRect.top + window.scrollY);
    }

    // private onMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    //     console.log('onMouseOut');
    // }

}