import * as React from 'react';

import { IPlayer } from './IPlayer';
import { IGameState } from './IGameState';
import { SocketClientService } from '../../Common/SocketClientService';
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
        const isMe = player.socketId === this.props.socketService.socket.id;
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
                    <CacButton label="Work" isMe={isMe} item={player.city.work} onClick={this.work} />
                    <CacButton label="Hire Worker" isMe={isMe} item={player.city.workers} onClick={this.hireWorker} />
                    <CacButton label="Upgrade City" isMe={isMe} item={player.city.level} onClick={this.upgradeCity} />
                </div>
            </div>);
    }

    private work = () => {
        this.props.socketService.emit('city-work', {});
    }

    private hireWorker = () => {
        this.props.socketService.emit('city-hire-worker', {});
    }

    private upgradeCity = () => {
        this.props.socketService.emit('city-upgrade', {});
    }

}
