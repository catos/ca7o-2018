import * as React from 'react';

import { CacSocket } from './CacSocket';

import { IPlayer } from './Models';
import { IGameState } from './Cac';
import { City } from './City';
import { Army } from './Army';
import { Citizens } from './Citizens';

interface IProps {
    player: IPlayer;
    gs: IGameState;
    cs: CacSocket;
}

export class PlayerMe extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }


    public render() {
        const { player } = this.props;
        return (
            <div id="player" className="bg-light mb-3 p-3">
                <h1 className="text-center">{player.name}</h1>
                <div className="text-center">{player.socketId}</div>
                <div className="container">
                    <City player={player} gs={this.props.gs} cs={this.props.cs} />
                    <Army player={player} />
                    <Citizens player={player} />
                </div>
            </div>
        );
    }
}