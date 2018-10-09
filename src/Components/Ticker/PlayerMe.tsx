import * as React from 'react';
import { IPlayer } from './IPlayer';
import { City } from './City';
import { Army } from './Army';
import { Citizens } from './Citizens';
import { IGameState } from './IGameState';


interface IProps {
    player: IPlayer;
    gameState: IGameState;
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
                <div className="container">
                    <City player={player} gameState={this.props.gameState} />
                    <Army player={player} />
                    <Citizens player={player} />
                </div>
            </div>
        );
    }
}