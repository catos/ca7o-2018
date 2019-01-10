import * as React from "react";
import { IPlayer } from "../Cac/Interfaces";
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
    }

    public componentDidMount() {
        // Watch events
        this.state.cs.on('event', this.onEvent);

        if (this.canvas !== null) {
            this.canvas.width = 960;
            this.canvas.height = 544;
            this.ctx = this.canvas.getContext('2d')!;
        
            this.setState({
                canvasRect: this.canvas.getBoundingClientRect()
            });
        }

        const cui = new CanvasUI(this.canvas, this.ctx);
        cui.button(100, 100, 'Click', () => {
            console.log('onClick!! fire event!');
            this.state.cs.emit('click', { foo: 'bar' });
        });
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
        const mousePos = new Vector2(
            event.clientX - this.state.canvasRect.left,
            event.clientY - this.state.canvasRect.top + window.scrollY);

        this.ctx.clearRect(0, 0, 100, 50);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#000000';
        this.ctx.font = `15px serif`;
        this.ctx.fillText(`Mouse: ${mousePos.x}, ${mousePos.y}`, 10, 10);
        this.ctx.stroke();
    }

    // private onMouseOut = (event: React.MouseEvent<HTMLElement>) => {
    //     console.log('onMouseOut');
    // }

}