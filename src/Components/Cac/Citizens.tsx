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
                <div>Workers: {player.citizens.workers.value} <span className="fa fa-chess-pawn" /></div>
                <div><hr /></div>
                <div><strong>Bonuses</strong></div>
                <div>Efficiency: +0%</div>
                <div>&nbsp;</div>
                <div>&nbsp;</div>
                <div><hr /></div>
                <h5>Hire Workers</h5>
                <div className="mb-3">
                    Cost: {player.citizens.workers.cost} <span className="fa fa-coins" /> per <span className="fa fa-chess-pawn" />
                </div>
                <button className={this.canCraftCss(player.citizens.workers.inProgress)} onClick={this.hireWorker}>
                    Recruit
                    <div><small>Time: {Math.floor(player.citizens.workers.timeRemaining / 1000)} seconds</small></div>
                </button>

                <div>
                    <button className="btn btn-lg btn-info">
                        <h5>Upgrade</h5>
                        <div>+10% Eff.</div>
                        <div>Cost: 100 <span className="fa fa-coins" /></div>
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

    private hireWorker = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('citizens-hire-worker', {});
    }


}
