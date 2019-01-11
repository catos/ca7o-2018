import * as React from 'react';

import { CacSocket } from './CacSocket';
import { IPlayer } from './Models';
import { IGameState } from './Cac';

interface IProps {
    player: IPlayer;
    gs: IGameState;
    cs: CacSocket;
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
                <div>Treasury: {player.coins} <span className="fa fa-coins" /> @{player.cps} <span className="fa fa-coins" />/s</div>
                <div><hr /></div>
                <div><strong>Bonuses</strong></div>
                <div>Cost: +0%</div>
                <div>Build time: +0%</div>
                <div>Defense: +10%</div>
                <div><hr /></div>
                <h5>Work the fields</h5>
                <div className="mb-3">
                    Rewards: {Math.floor(player.citizens.workers / 2 * player.city.level.value)} <span className="fa fa-coins" />
                </div>
                <div>
                    <button className={'btn btn-lg' + (player.city.work.inProgress ? ' btn-secondary' : ' btn-primary')} onClick={this.work}>
                        Work
                        <div><small>Time: {Math.floor(player.city.work.time / 1000)} seconds</small></div>
                    </button>
                </div>

                <div>
                    <button 
                        className={'btn btn-lg' + (player.city.level.inProgress || player.coins < player.city.level.value * 100 ? ' btn-secondary' : ' btn-info')} 
                        onClick={this.upgrade}>
                        <h5>Upgrade</h5>
                        <div>Cost: {player.city.level.value * 100} <span className="fa fa-coins" /></div>
                        <div><small>Time: {Math.floor(player.city.level.time / 1000)} seconds</small></div>
                    </button>
                </div>
            </div>);
    }

    private work = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.cs.emit('city-work', {});
    }

    private upgrade = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.props.cs.emit('city-upgrade', {});
    }

}
