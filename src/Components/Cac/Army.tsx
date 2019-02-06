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
                    <CacButton label="Train soldier" item={player.army.soldiers} onClick={this.recruit} />
                    <CacButton label="Upgrade" item={player.army.level} onClick={this.upgrade} />
                </div>

            </div>
        );
    }

    private recruit = () => {
        this.props.socketService.emit('army-recruit', {});
    }

    private upgrade = () => {
        this.props.socketService.emit('army-upgrade', {});
    }

}
