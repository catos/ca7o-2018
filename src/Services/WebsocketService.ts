import * as io from 'socket.io-client';
import { AppConfig } from '../AppConfig';
import { auth } from 'src/Services/AuthService';

export enum WesketchEventType {
    ServerError,
    PlayerJoined,
    PlayerLeft,
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

class WebSocketService {
    public socket: SocketIOClient.Socket;

    constructor() {
        // Create socket
        this.socket = io(AppConfig.serverUrl);

        // Client connected
        this.socket.on('connect', () => {
            console.log('WebSocketService:connect')
            const event = {
                client: this.socket.id,
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
            console.log('WebSocketService:disconnect')
            !!!!! connect og disconnect må leve i wesketch-component!
            const event = {
                client: this.socket.id,
                userId: auth.currentUser().guid,
                timestamp: new Date(),
                type: WesketchEventType.PlayerLeft
            } as IWesketchEvent;
            this.socket.emit('event', event);
        })
    }

    // TODO: make fancier
    public on = (eventName: string, cb: (event: IWesketchEvent) => any) => {
        this.socket.on(eventName, cb);
    }

    // on(eventName: string): Observable<any> {
    //     return new Observable(observer => {

    //         this.socket.on(eventName, data => {
    //             observer.next(data);
    //         });

    //         // observable is disposed
    //         return () => {
    //             this.socket.off(eventName);
    //         }

    //     });
    // }

    public emit(type: WesketchEventType, value: any) {
        const event = {
            client: this.socket.id,
            userId: auth.currentUser().guid,
            timestamp: new Date(),
            type,
            value
        } as IWesketchEvent;
        console.log(event);
        
        this.socket.emit('event', event)
    }
}

export const wss = new WebSocketService();