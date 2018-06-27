import * as io from 'socket.io-client';
import {auth} from './AuthService';

const BASE_URL = 'http://localhost:8080/';
// const BASE_URL = 'https://ca7o-server.herokuapp.com/api/';

export interface IClientEvent {
    client: string
    timestamp: Date
    type: ClientEventType
    value: any
}

export enum ClientEventType {
    Message,
    SystemMessage,

    StartDraw,
    Draw,
    StopDraw,
    ClearCanvas,
    GameStateChange
}

class WebSocketService {
    public socket: any

    constructor() {
        // Create socket
        this.socket = io(BASE_URL);

        // Client connected
        this.socket.on('connect', () => {
            this.emit(ClientEventType.SystemMessage, {
                sender: 'system',
                message: `${auth.currentUser().name} joined`
            })
        })

        // Client disconnected
        this.socket.on('disconnect', () => {
            this.emit(ClientEventType.SystemMessage, {
                sender: 'system',
                message: `${auth.currentUser().name} left`
            })
        })
    }

    // TODO: make fancier
    public on(eventName: string) {
        this.socket.on(eventName, (data: any) => {
            console.log('data', data);
        });
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

    public emit(type: ClientEventType, value: any) {
        const clientEvent = {
            client: this.socket.id,
            timestamp: new Date(),
            type,
            value
        } as IClientEvent;

        this.socket.emit('event', clientEvent)
    }
}

export const wss = new WebSocketService();