import * as React from 'react';

import { SocketClientService } from './SocketClientService';

import { IPlayer, IGameState } from './Models';
import { City } from './City';
import { Army } from './Army';
import { Citizens } from './Citizens';

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
            <div id="player" className="mb-3 p-3">
                <h1 className="text-center">{player.name}</h1>
                <div className="text-center">{player.socketId}</div>
                <div className="container">
                    <City player={player} gs={this.props.gs} socketService={this.props.socketService} />
                    <Army player={player} gs={this.props.gs} socketService={this.props.socketService} />
                    <Citizens player={player} />
                </div>
            </div>
        );
    }
}