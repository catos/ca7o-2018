import * as React from 'react';

import { SocketClientService } from '../../Common/SocketClientService';
import { IGameState } from './IGameState';

interface IProps {
    socketService: SocketClientService;
    gs: IGameState
}

export class CacOpponents extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const opponents = this.props.gs.players.filter(p => p.socketId !== this.props.socketService.socket.id);
        return (
            <div className="p-3">
                <h4>Opponents</h4>
                <div>
                    {opponents.map((player, idx) =>
                        <div key={idx} className={'p-3 card text-center border' + (player.isDead ? ' border-danger text-danger' : '')}>
                            <h3>{player.name} {player.isDead ? <span className="fa fa-skull" /> : ''} {player.isComputer ? '[AI]' : ''}</h3>
                            <div className="text-center">{player.socketId}</div>
                            <h4>{player.army.soldiers.value} <span className="fa fa-chess-knight" /> - {player.city.workers.value} <span className="fa fa-chess-pawn" /> - {player.coins} <span className="fa fa-coins" /></h4>
                            <small>@{player.cpt} <span className="fa fa-coins" />/s</small>
                            <div className="card-text mt-3">
                                <h5>Attack</h5>
                                <div className="btn-group">
                                    <button className="btn btn-danger">+1</button>
                                    <button className="btn btn-danger">+10</button>
                                    <button className="btn btn-danger">+100</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}