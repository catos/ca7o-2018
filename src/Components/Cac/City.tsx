import * as React from 'react';

import { SocketClientService } from './SocketClientService';
import { IPlayer, IGameState } from './Models';

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
                <div>Treasury: {player.coins} <span className="fa fa-coins" /> @{player.cpt} <span className="fa fa-coins" />/s</div>
                <div><hr /></div>
                <div><strong>Bonuses</strong></div>
                <div>Work: +{player.city.bonuses.work}%</div>
                <div>Discount: +{player.city.bonuses.buildCost}%</div>
                <div>Build time: +{player.city.bonuses.buildTime}%</div>
                <div>Defense: +{player.city.bonuses.defence}%</div>
                <div><hr /></div>
                <h5>Work the fields</h5>
                <div className="mb-3">
                    Rewards: {Math.floor(player.citizens.workers * (player.city.bonuses.work / 100 + 1))} <span className="fa fa-coins" />
                </div>
                <div>
                    <button className={'btn btn-lg' + (player.city.work.inProgress ? ' btn-secondary' : ' btn-primary')} onClick={this.work}>
                        Work
                        <div><small>Time: {Math.floor(player.city.work.timeRemaining / 1000)} seconds</small></div>
                    </button>
                </div>

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

    private work = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('city-work', {});
    }

    private upgrade = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('city-upgrade', {});
    }

}
