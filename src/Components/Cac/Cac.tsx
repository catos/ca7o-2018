import * as React from 'react';

import './Cac.css';
import { AppConfig } from '../../AppConfig';
import { SocketClientService, ISocketEvent } from '../../Common/SocketClientService';
import { IGameState } from './IGameState';
import { CacEvents } from './CacEvents';

import { Lobby } from './Lobby';
import { PlayerMe } from './PlayerMe';
import { CacDeveloperTools } from './CacDeveloperTools';
import { CacOpponents } from './CacOpponents';
import { CacJoin } from './CacJoin';

interface IState {
    name: string;
    joined: boolean;
    gs: IGameState;
}

export class Cac extends React.Component<{}, IState> {
    protected socketService: SocketClientService;

    constructor(props: any) {
        super(props);

        this.socketService = new SocketClientService(`${AppConfig.serverUrl}/cac`);

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
        this.socketService.eventHandlers.push({ type: 'update-game-state', handle: this.updateGameState });
        this.joinGame();
    }

    public componentWillUnmount() {
        this.socketService.disconnect();
    }

    public render() {
        const { gs } = this.state;


        if (!this.state.joined) {
            return <CacJoin joinGame={this.joinGame} socketService={this.socketService} />;
        }

        const me = gs.players.find(p => p.socketId === this.socketService.socket.id);

        const mainWindow = {
            lobby: <Lobby socketService={this.socketService} />,
            running: <div className="bar p-3">
                <h4>Running</h4>
                <button className="btn btn-warning mr-1" onClick={this.stopGame}>Stop Game</button>
                <div>Timer: {gs.timer}</div>
                <div>Ticks: {gs.ticks}</div>
                <div>Phase: {gs.phase}</div>
                <button className="btn btn-warning mr-1" onClick={this.endGame}>End Game</button>
            </div>,
            over: <div className="p-3">
                <h4>Game Over</h4>
                <div>...</div>
            </div>
        };

        return (
            <div id="cac" className="bg-light">
                <CacOpponents gs={gs} socketService={this.socketService} />

                {mainWindow[gs.phase]}

                {me !== undefined
                    ? <PlayerMe player={me} gs={gs} socketService={this.socketService} />
                    : ''}

                <hr />

                <CacDeveloperTools socketService={this.socketService} gs={gs} />
                <CacEvents socketService={this.socketService} />
            </div>
        );
    }

    private joinGame = () => {
        const name: string = localStorage.getItem('cac-name') || '';
        const joined: boolean = localStorage.getItem('cac-joined') === 'true' || false;
        this.setState({
            name,
            joined
        }, () => {
            if (this.state.name.length > 2 && this.state.joined) {
                console.log(`joinGame: name = ${this.state.name}, joined = ${this.state.joined}`);
                this.socketService.emit('join-game', this.state.name);
            }
        });
    }

    private updateGameState = (event: ISocketEvent) => {
        // console.log(`updateGameState:`, event);
        const gs = event.value as IGameState;
        this.setState({ gs });
    }

    private stopGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.socketService.emit('stop-game', {});
    }

    private endGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        // this.socketService.emit('end-game', {});
        console.log('TODO: End game');
    }
}
