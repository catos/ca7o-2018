import * as React from 'react';

import { SocketClientService } from './SocketClientService';
import { IPlayer } from './IPlayer';
import { IGameState } from './IGameState';

interface IProps {
    player: IPlayer;
    gs: IGameState;
    socketService: SocketClientService;
}

export class City extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { player } = this.props;

        return (
            <div className="player-city">
                <h3>City</h3>
                <h4>Level {player.city.level.value}</h4>
                <div>Workers: {player.city.workers.value} <span className="fa fa-chess-pawn" /></div>
                <div><hr /></div>
                <div><strong>Bonuses</strong></div>
                <div>Work: +{player.city.bonuses.work}%</div>
                <div>Discount: +{player.city.bonuses.buildCost}%</div>
                <div>Build time: +{player.city.bonuses.buildTime}%</div>
                <div>Defense: +{player.city.bonuses.defence}%</div>
                
                <div><hr /></div>

                <div>
                    <button className={'btn btn-lg' + (player.city.work.inProgress ? ' btn-secondary' : ' btn-primary')} onClick={this.work}>
                        Work
                        <div><small>Rewards: {Math.floor(player.city.workers.value * (player.city.bonuses.work / 100 + 1))} <span className="fa fa-coins" /></small></div>
                        <div><small>Time: {Math.floor(player.city.work.timeRemaining / 1000)} seconds</small></div>
                    </button>
                </div>

                <button className={this.canCraftCss(player.city.workers.inProgress)} onClick={this.hireWorker}>
                    Hire Worker
                    <div><small>Cost: {player.city.workers.cost} <span className="fa fa-coins" /> per <span className="fa fa-chess-pawn" /></small></div>
                    <div><small>Time: {Math.floor(player.city.workers.timeRemaining / 1000)} seconds</small></div>
                </button>

                <div>
                    <button 
                        className={'btn btn-lg' + (player.city.level.inProgress || player.coins < player.city.level.cost ? ' btn-secondary' : ' btn-info')} 
                        onClick={this.upgrade}>
                        <h5>Upgrade</h5>
                        <div>Cost: {player.city.level.cost} <span className="fa fa-coins" /></div>
                        <div><small>Time: {Math.floor(player.city.level.timeRemaining / 1000)} seconds</small></div>
                    </button>
                </div>
            </div>);
    }

    private canCraftCss = (inProgress: boolean) => {
        return inProgress
            ? 'btn btn-lg btn-secondary'
            : 'btn btn-lg btn-primary';
    }

    private work = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('city-work', {});
    }

    private hireWorker = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('citizens-hire-worker', {});
    }
    
    private upgrade = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('city-upgrade', {});
    }

}
