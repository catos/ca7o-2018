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

export class PlayerMe extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }


    public render() {
        const { player } = this.props;
        return (
            <div className="player">
                <h1 className="name">{player.name}</h1>
                <div>
                    <span className="coins">Treasury: {player.coins} <span className="fa fa-coins" /></span>
                    <span className="cps">@{player.cpt} <span className="fa fa-coins" />/s</span>
                </div>
                <City player={player} gs={this.props.gs} socketService={this.props.socketService} />
                <Army player={player} gs={this.props.gs} socketService={this.props.socketService} />
            </div >
        );
    }
}