import * as React from 'react';

import { SocketClientService } from './SocketClientService';

import { IPlayer } from './IPlayer';
import { IGameState } from './IGameState';
import { City } from './City';
import { Army } from './Army';

interface IProps {
    player: IPlayer;
    gs: IGameState;
    socketService: SocketClientService;
}

interface IState {
    latency: number;
}

export class PlayerMe extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            latency: 0
        };
    }

    public componentDidMount() {
        // Watch events
        this.props.socketService.pongHandlers.push({ handle: this.onPong });
    }

    public render() {
        const { player } = this.props;
        return (
            <div className="player">
                <h1 className="name">{player.name} <small>({this.state.latency} ms)</small></h1>
                <div><small>{player.socketId}</small></div>
                <div>
                    <span className="coins">Treasury: {player.coins} <span className="fa fa-coins" /></span>
                    <span className="cps">@{player.cpt} <span className="fa fa-coins" />/s</span>
                </div>
                <City player={player} gs={this.props.gs} socketService={this.props.socketService} />
                <Army player={player} gs={this.props.gs} socketService={this.props.socketService} />
            </div >
        );
    }

    private onPong = (ms: number) => {
        this.setState({ latency: ms });
    }
}