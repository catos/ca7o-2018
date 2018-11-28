import * as io from 'socket.io-client';

import { AppConfig } from '../../AppConfig';
import { auth } from '../../Common/AuthService';

export interface ICacEvent {
    clientId: string;
    userId: string;
    userName: string;
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
        this.socket = io(`${AppConfig.serverUrl}/cac`);

        // Client connected
        this.socket.on('connect', () => {
            // console.log(`[ WebSocketService.connect ] socket.id: ${this.socket.id}`)
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
            console.log(`[ WesketchSocket.event ] event.userId: ${event.userId}, type: ${event.type}`);
        });
    }

    public disconnect = () => {
        // console.log(`[ WebSocketService.disconnect ] socket.id: ${this.socket.id}`)
        this.socket.disconnect();
    }

    public on = (eventName: string, cb: (event: ICacEvent) => any) => {
        this.socket.on(eventName, cb);
    }

    public emit = (type: string, value: any) => {
        const user = auth.currentUser();
        const event = {
            clientId: this.socketId,
            userId: user.guid,
            userName: user.name,
            timestamp: new Date(),
            type,
            value
        } as ICacEvent;

        this.events.push(event);
        this.socket.emit('event', event);
    }
}