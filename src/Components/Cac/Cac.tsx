import * as React from 'react';

import { AppConfig } from '../../AppConfig';
import './Cac.css';
import { SocketClientService, ISocketEvent } from './SocketClientService';
import { CacEvents } from './CacEvents';
import { Lobby } from './Lobby';
import { IGameState } from './Models';
import { PlayerMe } from './PlayerMe';
import { CacDeveloperTools } from './CacDeveloperTools';

interface IState {
    socketService: SocketClientService;
    gs: IGameState;
}

export class Cac extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            socketService: new SocketClientService(`${AppConfig.serverUrl}/cac`),
            gs: {
                timer: 0,
                ticks: 0,
                phase: '',
                gameOver: false,
                players: []
            }
        };
    }

    public componentDidMount() {
        this.state.socketService.eventHandlers
            .push({ eventType: 'update-game-state', handle: this.updateGameState });
    }

    public render() {
        const { gs, socketService } = this.state;

        const opponents = gs.players.filter(p => p.socketId !== this.state.socketService.socket.id);
        const opponentsRender = opponents.length
            ? <div className="p-3">
                <h4>Opponents</h4>
                <div className="card-deck">
                    {opponents.map((player, idx) =>
                        <div key={idx} className={'p-3 card text-center border' + (player.isDead ? ' border-danger text-danger' : '')}>
                            <h3>{player.name} {player.isDead ? <span className="fa fa-skull" /> : ''} {player.isComputer ? '[AI]' : ''}</h3>
                            <div className="text-center">{player.socketId}</div>
                            <h4>{player.army.soldiers} <span className="fa fa-chess-knight" /> - {player.citizens.workers} <span className="fa fa-chess-pawn" /> - {player.coins} <span className="fa fa-coins" /></h4>
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
            : '';

        const me = gs.players.find(p => p.socketId === this.state.socketService.socket.id);

        const mainWindow = {
            lobby: <Lobby gs={gs} socketService={socketService} />,
            running: <div className="bar">
                <button className="btn btn-danger mr-1" onClick={this.stopGame}>Stop Game</button>
                <div>Timer: {gs.timer}</div>
                <div>Ticks: {gs.ticks}</div>
                <div>Phase: {gs.phase}</div>
            </div>,
            over: <div>Game Over</div>
        };

        return (
            <div id="cac" className="bg-light">

                <CacDeveloperTools socketService={socketService} />

                {opponentsRender}

                {mainWindow[gs.phase]}

                {me !== undefined
                    ? <PlayerMe player={me} gs={gs} socketService={socketService} />
                    : ''}

                <CacEvents socketService={socketService} />
            </div>
        );
    }

    private updateGameState = (event: ISocketEvent) => {
        console.log(`updateGameState:`, event);
        const gs = event.value as IGameState;
        this.setState({ gs });
    }

    private stopGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('stop game pls!');
        this.state.socketService.emit('stop-game', {});
    }
}
