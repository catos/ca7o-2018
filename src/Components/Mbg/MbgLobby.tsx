import * as React from "react";

import { AppConfig } from "src/AppConfig";
import { SocketClientService, ISocketEvent } from "src/Common/SocketClientService";

interface IState {
    clients: string[],
    rooms: string[]
}

export class MbgLobby extends React.Component<{}, IState> {
    private socketService: SocketClientService;

    constructor(props: any) {
        super(props);

        this.socketService = new SocketClientService(`${AppConfig.serverUrl}/mbg`),

        this.state = {
            clients: [],
            rooms: []
        }
    }

    public componentDidMount() {
        this.socketService.eventHandlers.push({ type: 'get-clients', handle: this.onGetClients })
        this.socketService.eventHandlers.push({ type: 'get-rooms', handle: this.onGetRooms })
        this.socketService.emit('get-rooms');
    }

    public componentWillUnmount() {
        this.socketService.disconnect();
    }

    public render = () => {
        return (
            <div>
                <h1>MbgLobby!</h1>

                <h2>Clients</h2>
                <ul>
                    {this.state.clients.map((client, idx) =>
                        <li key={idx}>{client}</li>
                    )}
                </ul>
                <h2>Rooms</h2>
                <ul>
                    {this.state.rooms.map((room, idx) =>
                        <li key={idx}>{room}</li>
                    )}
                </ul>
            </div>
        );
    }

    private onGetClients = (event: ISocketEvent) => {
        this.setState({ clients: event.value });
    }

    private onGetRooms = (event: ISocketEvent) => {
        this.setState({ rooms: event.value });
    }
}