import * as React from 'react';
import { IPlayer } from './IPlayer';

interface IProps {
    player: IPlayer;
}

interface IState {
    timeRemaining: number;
    isWorking: boolean;
}

export class Citizens extends React.Component<IProps, IState> {
    private readonly WORK_TIME: number = 5000;

    constructor(props: IProps) {
        super(props);

        this.state = {
            timeRemaining: this.WORK_TIME,
            isWorking: false,
        };
    }


    public render() {
        const { player } = this.props;

        return (
            <div className="player-citizens">
                <h3>Citizens</h3>
                <h4>Level {player.citizens.level}</h4>
                <div>Workers: {player.citizens.workers} <span className="fa fa-chess-pawn" /></div>
                <div><strong>Bonuses</strong></div>
                <div>Efficiency: +0%</div>

                <button className="btn btn-primary">
                    <h5>Hire</h5>
                    <div>Cost: 5 <span className="fa fa-coins" /> per <span className="fa fa-chess-pawn" /></div>
                    <div className="production-container">
                        <div className="production-slot">Slot 1</div>
                        <div className="production-slot disabled">Slot 2</div>
                        <div className="production-slot disabled">Slot 3</div>
                    </div>
                </button>

                <button className="btn btn-info">
                    <h5>Upgrade Workers</h5>
                    <div>+5% Efficiency</div>
                    <div>Cost: 100 <span className="fa fa-coins" /></div>
                </button>
            </div>
        );
    }
}
