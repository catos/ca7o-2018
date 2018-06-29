import * as io from 'socket.io-client';

import { AppConfig } from '../../AppConfig';
import { auth } from '../../Common/AuthService';

export enum WesketchEventType {
    ServerError,
    PlayerJoined,
    PlayerLeft,
    PlayerReady,
    Message,
    SystemMessage,
    StartDraw,
    Draw,
    StopDraw,
    ClearCanvas,
    UpdateGameState
}

export interface IWesketchEvent {
    client: string;
    userId: string;
    timestamp: Date;
    type: WesketchEventType;
    value: any;
}

export class WesketchService {
    private socket: SocketIOClient.Socket;
    private socketId: string;

    constructor() {
        // Create socket
        this.socket = io(AppConfig.serverUrl);

        // Client connected
        this.socket.on('connect', () => {
            console.log('WebSocketService:connect')
            this.socketId = this.socket.id;
            const event = {
                client: this.socketId,
                userId: auth.currentUser().guid,
                timestamp: new Date(),
                type: WesketchEventType.PlayerJoined,
                value: {
                    player: auth.currentUser().name
                }
            } as IWesketchEvent;
            this.socket.emit('event', event);
        })

        // Client disconnected
        this.socket.on('disconnect', () => {
            console.log('WebSocketService:on-disconnect')
        })
    }

    public on = (eventName: string, cb: (event: IWesketchEvent) => any) => {
        this.socket.on(eventName, cb);
    }

    public emit(type: WesketchEventType, value: any) {
        const event = {
            client: this.socketId,
            userId: auth.currentUser().guid,
            timestamp: new Date(),
            type,
            value
        } as IWesketchEvent;
        this.socket.emit('event', event)
    }
}