import * as React from "react";

import { AppConfig } from "src/AppConfig";
import { SocketClientService, ISocketEvent } from "src/Common/SocketClientService";

interface IMbgPlayer {
    socketId: string;
    name: string;
}

interface IState {
    name: string,
    players: IMbgPlayer[],
    rooms: string[],
}

export class MbgLobby extends React.Component<{}, IState> {
    private socketService: SocketClientService;

    constructor(props: any) {
        super(props);

        this.socketService = new SocketClientService(`${AppConfig.serverUrl}/mbg`),

            this.state = {
                name: '',
                players: [],
                rooms: []
            }
    }

    public componentDidMount() {
        this.socketService.eventHandlers.push({ type: 'get-players', handle: this.onGetPlayers })
        this.socketService.eventHandlers.push({ type: 'get-rooms', handle: this.onGetRooms })
        this.socketService.emit('get-players');
        this.socketService.emit('get-rooms');
    }

    public componentWillUnmount() {
        this.socketService.disconnect();
    }

    public render = () => {
        return (
            <div>
                <h1>MbgLobby!</h1>

                <div>
                    <div className="lead">What is your name ?</div>
                    <input type="text" placeholder="Enter your name" value={this.state.name} onChange={this.onNameChange} />
                    <button className="btn btn-primary" onClick={this.join}>Join</button>
                </div>

                <h2>Clients</h2>
                <ul>
                    {this.state.players.map((player, idx) =>
                        <li key={idx}>{player.socketId} - {player.name}</li>
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

    private onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {        
        this.setState({ name: event.target.value });
    }

    private join = () => {
        this.state.name.length
            ? this.socketService.emit('join', this.state.name)
            : console.log('Please enter a valid name');
    }

    private onGetPlayers = (event: ISocketEvent) => {
        this.setState({ players: event.value });
    }

    private onGetRooms = (event: ISocketEvent) => {
        this.setState({ rooms: event.value });
    }
}