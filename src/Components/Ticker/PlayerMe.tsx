import * as React from 'react';
import { IPlayer } from './IPlayer';
import { City } from './City';
import { Army } from './Army';
import { Citizens } from './Citizens';


interface IProps {
    player: IPlayer;
}

export class PlayerMe extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }


    public render() {
        const { player } = this.props;

        return (
            <div id="player" className="bg-light mb-3 p-3">
                <div className="header">
                    <strong>{player.name}</strong>
                </div>
                <div className="container">
                    <City player={player} />
                    <Army player={player} />
                    <Citizens player={player} />
                </div>
            </div>
        );
    }
}