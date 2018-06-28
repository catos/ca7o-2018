import * as io from 'socket.io-client';
import {auth} from './AuthService';

// const BASE_URL = 'http://localhost:8080/';
const BASE_URL = 'https://ca7o-server.herokuapp.com/';

export interface IWesketchEvent {
    client: string
    timestamp: Date
    type: WesketchEventType
    value: any
}

export enum WesketchEventType {
    PlayerJoined,
    PlayerLeft,
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
            this.emit(WesketchEventType.PlayerJoined, {
                player: auth.currentUser().name
            })
        })

        // Client disconnected
        this.socket.on('disconnect', () => {
            this.emit(WesketchEventType.PlayerLeft, {
                player: auth.currentUser().name
            })
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
        const clientEvent = {
            client: this.socket.id,
            timestamp: new Date(),
            type,
            value
        } as IWesketchEvent;

        this.socket.emit('event', clientEvent)
    }
}

export const wss = new WebSocketService();