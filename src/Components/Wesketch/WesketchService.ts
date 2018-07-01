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
    UpdateGameState,
    ResetGame
}

export interface IWesketchEvent {
    client: string;
    userId: string;
    userName: string;
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
                userName: auth.currentUser().name,
                timestamp: new Date(),
                type: WesketchEventType.PlayerJoined
            } as IWesketchEvent;
            this.socket.emit('event', event);
        })

        // Client disconnected
        this.socket.on('disconnect', () => {
            console.log('WebSocketService:on-disconnect')
        })
    }

    public disconnect = () => {
        this.socket.close();
    }

    public on = (eventName: string, cb: (event: IWesketchEvent) => any) => {
        this.socket.on(eventName, cb);
    }

    public emit = (type: WesketchEventType, value: any) => {
        const user = auth.currentUser();
        const event = {
            client: this.socketId,
            userId: user.guid,
            userName: user.name,
            timestamp: new Date(),
            type,
            value
        } as IWesketchEvent;
        console.log('wss.emit: ', event);
        
        this.socket.emit('event', event)
    }
}