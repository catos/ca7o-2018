import * as io from 'socket.io-client';

import { AppConfig } from '../../AppConfig';

export interface ICacEvent {
    socketId: string;
    name: string;
    timestamp: number;
    type: string;
    value: any;
}

export class CacSocket {
    public clientName: string;
    public socketId: string;
    public events: ICacEvent[];

    private socket: SocketIOClient.Socket;    

    constructor() {
        this.clientName = 'New Player';
        this.events = [];

        // Create socket
        this.socket = io(`${AppConfig.serverUrl}/cac`);

        // Client connected
        this.socket.on('connect', () => {
            this.socketId = this.socket.id;
            console.log(`[ WebSocketService.connect ] socket.id: ${this.socket.id}`)
            // this.socketId = this.socket.id;
            // const event = {
            //     client: this.socketId,
            //     userId: auth.currentUser().guid,
            //     userName: auth.currentUser().name,
            //     timestamp: new Date(),
            //     type: WesketchEventType.PlayerJoined
            // } as IWesketchEvent;
            // this.socket.emit('event', event);
        })

        // Client disconnected
        this.socket.on('disconnect', () => {
            console.log(`[ WebSocketService.connect ] socket.id: ${this.socket.id}`)
            this.socket.disconnect();
        });

        this.socket.on('event', (event: ICacEvent) => {
            // console.log(`[ WesketchSocket.event ] event.userId: ${event.userId}, type: ${event.type}`);
        });
    }

    public disconnect = () => {
        // console.log(`[ WebSocketService.disconnect ] socket.id: ${this.socket.id}`)
        this.socket.disconnect();
    }

    public on = (eventName: string, cb: (event: ICacEvent) => any) => {
        console.log('this.socket', this.socket);
        this.socket.on(eventName, cb);
    }

    public emit = (type: string, value: any) => {
        const event: ICacEvent = {
            socketId: this.socket.id,
            name: this.clientName,
            timestamp: Date.now(),
            type,
            value
        };

        this.events.push(event);
        this.socket.emit('event', event);
    }

    public setClientName(name: string) {
        this.clientName = name;
    }
}