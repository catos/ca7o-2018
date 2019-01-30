import * as io from 'socket.io-client';

export interface ISocketEvent {
    socketId: string;
    timestamp: number;
    type: string;
    value: any;
}

export interface ISocketEventHandler {
    eventType: string;
    handle: (event: ISocketEvent) => void;
}

export class SocketClientService {
    public socket: SocketIOClient.Socket;
    public eventHandlers: ISocketEventHandler[] = [];

    constructor(uri: string) {

        this.socket = io(uri);
        console.log('SocketClientService...constructor');

        this.socket.on('connect', (wtf: any) => {
            console.log(`SocketClientService...connect: ${JSON.stringify(wtf)}`);
        });

        this.socket.on('event', (event: ISocketEvent) => {
            this.eventHandlers.forEach(h => {
                if (h.eventType === '*' || h.eventType === event.type) {
                    h.handle(event);
                }
            });
        });
        this.socket.on('disconnect', (reason: string) => console.log(`### disconnect, reason: ${reason}`));
        this.socket.on('connect_timeout', () => console.log(`### timeout, socketId: ${this.socket.id}`))
        this.socket.on('connect_error', (error: any) => console.log(`### error, socketId: ${this.socket.id}, error: ${JSON.stringify(error)}`));

        this.socket.on('ping', () => console.log(`### Ping`));
        this.socket.on('pong', (ms: number) => console.log(`### Pong, latency: ${ms}`));
    }

    public emitEvent = (event: ISocketEvent) => {
        this.socket.emit('event', event);
    }

    public emit = (type: string = 'message', value: any) => {
        const event: ISocketEvent = {
            socketId: this.socket.id,
            timestamp: Date.now(),
            type,
            value
        };
        this.emitEvent(event);
    }
}