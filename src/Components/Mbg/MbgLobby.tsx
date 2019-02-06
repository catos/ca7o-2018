import * as React from "react";

import { AppConfig } from "src/AppConfig";
import { SocketClientService, ISocketEvent } from "src/Common/SocketClientService";

interface IState {
    socketService: SocketClientService;
    rooms: string[]
}

export class MbgLobby extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            socketService: new SocketClientService(`${AppConfig.serverUrl}/mbg`),
            rooms: []
        }
    }

    public componentDidMount() {
        this.state.socketService.eventHandlers.push({ type: 'get-rooms', handle: this.onGetRooms })
        this.state.socketService.emit('get-rooms');
    }

    public render = () => {
        return (
            <div>
                <h1>MbgLobby!</h1>
                <ul>
                    {this.state.rooms.map((room, idx) =>
                        <li key={idx}>{room}</li>
                    )}
                </ul>
            </div>
        );
    }

    private onGetRooms = (event: ISocketEvent) => {
        console.log('onGetRooms', event);
        this.setState({ rooms: event.value });
    }
}