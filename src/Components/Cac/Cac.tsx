import * as React from 'react';

import './Cac.css';
import { AppConfig } from '../../AppConfig';
import { SocketClientService, ISocketEvent } from '../../Common/SocketClientService';
import { IGameState } from './IGameState';
import { CacEvents } from './CacEvents';

import { Lobby } from './Lobby';
import { PlayerMe } from './PlayerMe';
import { CacDeveloperTools } from './CacDeveloperTools';

interface IState {
    name: string;
    joined: boolean;
    gs: IGameState;
}

export class Cac extends React.Component<{}, IState> {
    protected socketService: SocketClientService;

    constructor(props: any) {
        super(props);

        this.socketService = new SocketClientService(`${AppConfig.serverUrl}/cac`),
            this.state = {
                name: '',
                joined: false,
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
        this.socketService.eventHandlers
            .push({ type: 'update-game-state', handle: this.updateGameState });
    }

    public componentWillUnmount() {
        this.socketService.disconnect();
    }

    public render() {
        const { gs } = this.state;


        if (!this.state.joined) {
            return (
                <div className="lobby">
                    <input type="text" value={this.state.name} onChange={this.onChange} placeholder="Enter your name" />
                    <div>
                        <button className="btn btn-primary mr-1" onClick={this.joinGame}>Join</button>
                    </div>
                </div>
            );
        }

        const opponents = gs.players.filter(p => p.socketId !== this.socketService.socket.id);
        const opponentsRender = opponents.length
            ? <div className="p-3">
                <h4>Opponents</h4>
                <div className="card-deck">
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
            : '';

        const me = gs.players.find(p => p.socketId === this.socketService.socket.id);

        const mainWindow = {
            lobby: <Lobby socketService={this.socketService} />,
            running: <div className="bar p-3">
                <h4>Running</h4>
                <button className="btn btn-warning mr-1" onClick={this.stopGame}>Stop Game</button>
                <div>Timer: {gs.timer}</div>
                <div>Ticks: {gs.ticks}</div>
                <div>Phase: {gs.phase}</div>
            </div>,
            over: <div className="p-3">
                <h4>Game Over</h4>
                <div>...</div>
            </div>
        };

        return (
            <div id="cac" className="bg-light">
                {opponentsRender}

                {mainWindow[gs.phase]}

                {me !== undefined
                    ? <PlayerMe player={me} gs={gs} socketService={this.socketService} />
                    : ''}

                <hr />

                <div>My socket id: {this.socketService.socket.id}</div>
                <CacEvents socketService={this.socketService} />
                <CacDeveloperTools socketService={this.socketService} gs={gs} />
            </div>
        );
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: event.target.value });
    }

    private joinGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('join game pls!');
        // TODO: this.props.socketService.setClientName(this.state.myName);
        this.socketService.emit('join-game', this.state.name);
        this.setState({ joined: true });
    }

    private updateGameState = (event: ISocketEvent) => {
        // console.log(`updateGameState:`, event);
        const gs = event.value as IGameState;
        this.setState({ gs });
    }

    private stopGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.socketService.emit('stop-game', {});
    }
}
