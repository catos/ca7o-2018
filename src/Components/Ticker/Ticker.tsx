import * as React from 'react';
import * as io from 'socket.io-client';

import { AppConfig } from '../../AppConfig';

export class Ticker extends React.Component {
    private socketId: string;
    private socket: SocketIOClient.Socket;

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
    }

    public render() {
        return (
            <div className="mt-3">
                asdf
                <button onClick={this.onClick}>Click</button>
            </div>
        );
    }

    private onClick = () => {
        console.log('click');
        
        this.socket.emit('event', { message: 'click' });
    }
}