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
                <div><hr /></div>
                <div><strong>Bonuses</strong></div>
                <div>Efficiency: +0%</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div><hr /></div>
                <h5>Hire Workers</h5>
                <div className="mb-3">
                    Cost: 10 <span className="fa fa-coins" /> per <span className="fa fa-chess-pawn" />
                </div>

                <div className="btn-group">
                    <button className="btn btn-primary">+1</button>
                    <button className="btn btn-primary">+10</button>
                    <button className="btn btn-primary">+100</button>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary">+1</button>
                    <button className="btn btn-secondary">+10</button>
                    <button className="btn btn-secondary">+100</button>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary">+1</button>
                    <button className="btn btn-secondary">+10</button>
                    <button className="btn btn-secondary">+100</button>
                </div>

                <div>
                    <button className="btn btn-info">
                        <h5>Upgrade</h5>
                        <div>+10% Efficiency</div>
                        <div>Cost: 100 <span className="fa fa-coins" /></div>
                    </button>
                </div>
            </div>
        );
    }
}
