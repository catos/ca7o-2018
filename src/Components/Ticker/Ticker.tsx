import * as React from 'react';
import * as io from 'socket.io-client';

import { AppConfig } from '../../AppConfig';

interface IPlayer {
    userId: string;
    name: string;
    ticks: number;
    tps: number;
}

interface ITickerState {
    timer: number;
    clicks: number;
    players: IPlayer[]
}

interface IState {
    gameState: ITickerState 
}

export class Ticker extends React.Component<{}, IState> {
    private socketId: string;
    private socket: SocketIOClient.Socket;

    constructor(props: any) {
        super(props);

        this.state = {
            gameState: {
                timer: 0,
                clicks: 0,
                players: []
            }
        };
    }

    public componentDidMount() {
        this.socket = io(`${AppConfig.serverUrl}/ticker`);
        // , {
        //     path: '/ticker'
        // });

        // Client connected
        this.socket.on('connect', () => {
            console.log('WebSocketService:connect')
            this.socketId = this.socket.id;
            const event = {
                client: this.socketId
            };
            this.socket.emit('event', event);
        })

        // Client disconnected
        this.socket.on('disconnect', () => {
            console.log('WebSocketService:on-disconnect')
        })

        this.socket.on('event', (event: any) => {
            if (event.type === 'UpdateGameState') {
                this.setState({
                    gameState: event.value
                });
            }
        })
    }

    public render() {
        return (
            <div className="mt-3">
                <div>Timer: {this.state.gameState.timer}</div>
                <div>Clicks: {this.state.gameState.clicks}</div>
                <button onClick={this.onClick}>Click</button>
                <button onClick={this.onStop}>Stop</button>
            </div>
        );
    }

    private onClick = () => {
        console.log('click');
        this.socket.emit('event', { type: 'click' });
    }

    private onStop = () => {
        console.log('click');
        this.socket.emit('event', { type: 'stop' });
    }
}