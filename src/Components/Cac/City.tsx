import * as React from 'react';

import { SocketClientService } from './SocketClientService';
import { IPlayer } from './IPlayer';
import { IGameState } from './IGameState';
import { CacButton } from './CacButton';

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
            <div className="city">
                <div className="info">
                    <h3>City</h3>
                    <h4>Level {player.city.level.value}</h4>
                    <div>Workers: {player.city.workers.value} <span className="fa fa-chess-pawn" /></div>
                </div>

                <div className="bonuses">
                    <div><strong>Bonuses</strong></div>
                    <div>Work: +{player.city.bonuses.work}%</div>
                    <div>Discount: +{player.city.bonuses.buildCost}%</div>
                    <div>Build time: +{player.city.bonuses.buildTime}%</div>
                    <div>Defense: +{player.city.bonuses.defence}%</div>
                </div>

                <div className="interactions">
                    {/* <button className={this.canCraftCss(player.city.work.inProgress, 'btn-warning')} onClick={this.work}>
                        <div className="label">Work</div>
                        <div className="cost">Rewards: {Math.floor(player.city.workers.value * (player.city.bonuses.work / 100 + 1))} <span className="fa fa-coins" /></div>
                        <div className="time">Time: {Math.floor(player.city.work.timeRemaining / 1000)} seconds</div>
                    </button> */}
                    <CacButton 
                        label="Work" 
                        item={player.city.work} 
                        onClick={this.work} />

                    <button className={this.canCraftCss(player.city.workers.inProgress, 'btn-success')} onClick={this.hireWorker}>
                        <div className="label">Hire Worker</div>
                        <div className="cost">Cost: {player.city.workers.cost} <span className="fa fa-coins" /> per <span className="fa fa-chess-pawn" /></div>
                        <div className="time">Time: {Math.floor(player.city.workers.timeRemaining / 1000)} seconds</div>
                    </button>

                    <button
                        className={'btn btn-lg' + (player.city.level.inProgress || player.coins < player.city.level.cost ? ' btn-secondary' : ' btn-info')}
                        onClick={this.upgrade}>
                        <div className="label">Upgrade</div>
                        <div className="cost">Cost: {player.city.level.cost} <span className="fa fa-coins" /></div>
                        <div className="time">Time: {Math.floor(player.city.level.timeRemaining / 1000)} seconds</div>
                    </button>
                </div>
            </div>);
    }

    private canCraftCss = (inProgress: boolean, color: string = 'btn-primary') => {
        return inProgress
            ? 'btn btn-lg btn-secondary'
            : `btn btn-lg ${color}`;
    }

    private work = () => {
        this.props.socketService.emit('city-work', {});
    }

    private hireWorker = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('city-hire-worker', {});
    }

    private upgrade = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('city-upgrade', {});
    }

}
