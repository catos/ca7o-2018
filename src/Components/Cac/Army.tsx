import * as React from 'react';
import { IPlayer, IGameState } from './Models';
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
            <div className="player-army">
                <h3>Army</h3>
                <h4>Level {player.army.level.value}</h4>
                <div>Soldiers: {player.army.soldiers.value} <span className="fa fa-chess-knight" /></div>
                <div><hr /></div>
                <div><strong>Bonuses</strong></div>
                <div>Strength: +{player.army.strengthBonus}%</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div><hr /></div>
                <h5>Train soldiers</h5>
                <div className="mb-3">
                    Cost: {player.army.soldiers.cost} <span className="fa fa-coins" /> per <span className="fa fa-chess-knight" />
                </div>
                <button className={this.canCraftCss(player.army.soldiers.inProgress)} onClick={this.recruit}>
                    Recruit
                    <div><small>Time: {Math.floor(player.army.soldiers.timeRemaining / 1000)} seconds</small></div>
                </button>

                <div>
                    <button className={this.canCraftCss(player.army.level.inProgress)} onClick={this.upgrade}>
                        <h5>Upgrade</h5>
                        <div>Cost: {player.army.level.value * player.army.level.cost} <span className="fa fa-coins" /></div>
                        <div><small>Time: {Math.floor(player.army.level.timeRemaining / 1000)} seconds</small></div>
                    </button>
                </div>
            </div>
        );
    }

    private canCraftCss = (inProgress: boolean) => {
        return inProgress
            ? 'btn btn-lg btn-secondary'
            : 'btn btn-lg btn-primary';
    }

    private recruit = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('army-recruit', {});
    }

    private upgrade = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('army-upgrade', {});
    }

}
