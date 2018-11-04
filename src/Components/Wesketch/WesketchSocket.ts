import * as io from 'socket.io-client';

import { WesketchEventTypes } from './Types';
import { IWesketchEvent } from './Interfaces';

import { AppConfig } from '../../AppConfig';
import { auth } from '../../Common/AuthService';

export class WesketchSocket {
    public socketId: string;
    public events: IWesketchEvent[];

    private socket: SocketIOClient.Socket;


    constructor() {

        this.events = [];

        // Create socket
        this.socket = io(`${AppConfig.serverUrl}/wesketch`);

        // Client connected
        this.socket.on('connect', () => {
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

        this.socket.on('event', (event: IWesketchEvent) => {
            console.log(`[ WesketchSocket.event ] event.userId: ${event.userId}, type: ${WesketchEventTypes[event.type]}`);
            if (event.type !== WesketchEventTypes.Draw) {
                this.events.push(event);
            }
        });
    }

    public disconnect = () => {
        console.log(`[ WebSocketService.disconnect ] socket.id: ${this.socket.id}`)
        this.socket.disconnect();
    }

    public on = (eventName: string, cb: (event: IWesketchEvent) => any) => {
        this.socket.on(eventName, cb);
    }

    public emit = (type: WesketchEventTypes, value: any) => {
        const user = auth.currentUser();
        const event = {
            clientId: this.socketId,
            userId: user.guid,
            userName: user.name,
            timestamp: new Date(),
            type,
            value
        } as IWesketchEvent;

        this.events.push(event);
        this.socket.emit('event', event);
    }
}