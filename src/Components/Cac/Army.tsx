import * as React from 'react';

import { IPlayer } from './IPlayer';
import { IGameState } from './IGameState';
import { SocketClientService } from './SocketClientService';

interface IProps {
    player: IPlayer;
    gs: IGameState;
    socketService: SocketClientService;
}

interface IState {
    timeRemaining: number;
    isWorking: boolean;
}

export class Army extends React.Component<IProps, IState> {
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
            <div className="army">
                <div className="info">
                    <h3>Army</h3>
                    <h4>Level {player.army.level.value}</h4>
                    <div>Soldiers: {player.army.soldiers.value} <span className="fa fa-chess-knight" /></div>
                </div>

                <div className="bonuses">
                    <div><strong>Bonuses</strong></div>
                    <div>Strength: +{player.army.strengthBonus}%</div>
                </div>

                <div className="interactions">
                    <button className={this.canCraftCss(player.army.soldiers.inProgress)} onClick={this.recruit}>
                        <div className="label">Train soldiers</div>
                        <div className="cost">Cost: {player.army.soldiers.cost} <span className="fa fa-coins" /> per <span className="fa fa-chess-knight" /></div>
                        <div className="time">Time: {Math.floor(player.army.soldiers.timeRemaining / 1000)} seconds</div>
                    </button>
                    <button className={this.canCraftCss(player.army.level.inProgress)} onClick={this.upgrade}>
                        <div className="label">Upgrade</div>
                        <div className="cost">Cost: {player.army.level.value * player.army.level.cost} <span className="fa fa-coins" /></div>
                        <div className="time">Time: {Math.floor(player.army.level.timeRemaining / 1000)} seconds</div>
                    </button>
                </div>

            </div>
        );
    }

    private canCraftCss = (inProgress: boolean, color: string = 'btn-primary') => {
        return inProgress
            ? 'btn btn-lg btn-secondary'
            : `btn btn-lg ${color}`;
    }

    private recruit = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('army-recruit', {});
    }

    private upgrade = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('army-upgrade', {});
    }

}
