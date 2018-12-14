import * as io from 'socket.io-client';

import { AppConfig } from '../../AppConfig';
import { auth } from '../../Common/AuthService';

export interface ICacEvent {
    socketId: string;
    name: string;
    timestamp: Date;
    type: string;
    value: any;
}

export class CacSocket {
    public socketId: string;
    public events: ICacEvent[];

    private socket: SocketIOClient.Socket;


    constructor() {

        this.events = [];

        // Create socket
        this.socket = io(`${AppConfig.serverUrl}/cac`, { query: `name=${auth.currentUser().name}` });

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
        const user = auth.currentUser();
        const event = {
            socketId: this.socket.id,
            name: user.name,
            timestamp: new Date(),
            type,
            value
        } as ICacEvent;

        this.events.push(event);
        this.socket.emit('event', event);
    }
}