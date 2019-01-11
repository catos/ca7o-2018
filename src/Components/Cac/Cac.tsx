import * as React from 'react';
import { CacSocket, ICacEvent } from './CacSocket';
import { CacEvents } from './CacEvents';
import { Lobby } from './Lobby';
import { IPlayer } from './Interfaces';
import { PlayerMe } from './PlayerMe';

export interface IGameState {
    timer: number;
    ticks: number;
    phase: string;
    gameOver: boolean;
    players: IPlayer[];
}

interface IState {
    cs: CacSocket;
    myName: string;
    gs: IGameState;
}

export class Cac extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            cs: new CacSocket(),
            myName: 'Player 1',
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
        // Watch events
        this.state.cs.on('event', this.onEvent);
    }

    public componentWillUnmount() {
        this.state.cs.disconnect();
    }

    public render() {
        const { gs, cs } = this.state;

        const opponents = gs.players.filter(p => p.name !== this.state.myName);
        const opponentsRender = opponents.length
            ? <div className="bg-light mb-3 p-3">
                <h4>Opponents</h4>
                <div className="card-deck">
                    {opponents.map((player, idx) =>
                        <div key={idx} className={'p-3 card text-center border' + (player.isDead ? ' border-danger text-danger' : '')}>
                            <h3>{player.name} {player.isDead ? <span className="fa fa-skull" /> : ''} {player.isComputer ? '[AI]' : ''}</h3>
                            <h4>{player.army.soldiers} <span className="fa fa-chess-knight" /> - {player.citizens.workers} <span className="fa fa-chess-pawn" /> - {player.coins} <span className="fa fa-coins" /></h4>
                            <small>@{player.cps} <span className="fa fa-coins" />/s</small>
                            <div className="card-text mt-3">
                                <div>
                                    <button className="btn btn-danger">Attack</button>
                                    <button className="btn btn-danger">+10</button>
                                    <button className="btn btn-danger">+100</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            : '';

        const me = gs.players.find(p => p.name === this.state.myName);
        
        const mainWindow = {
            lobby: <Lobby gs={gs} cs={cs} />,
            running: <div>Playing...</div>,
            over: <div>Game Over</div>
        };

        return (
            <div id="cac">

                {mainWindow[gs.phase]}

                <button className="btn btn-secondary mr-1" onClick={this.click}>Click</button>
                <button className="btn btn-danger mr-1" onClick={this.stopGame}>Stop Game</button>

                <hr />

                <ul>
                    <li>Timer: {gs.timer}</li>
                    <li>Ticks: {gs.ticks}</li>
                    <li>Phase: {gs.phase}</li>
                    <li>Players:
                        <ul>
                            {gs.players.map((player, idx) =>
                                <li key={idx}>{player.socketId} - {player.name} - {player.coins}</li>
                            )}
                        </ul>
                    </li>
                </ul>

                {opponentsRender}

                {me !== undefined
                    ? <PlayerMe player={me} gs={gs} />
                    : ''}

                <CacEvents cs={this.state.cs} />
            </div>
        );
    }

    private onEvent = (event: ICacEvent) => {
        console.log(`onEvent - type: ${event.type}`);

        if (event.type === 'UpdateGameState') {
            const gs = event.value as IGameState;
            this.setState({ gs });
        }

    }

    private stopGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('stop game pls!');
        this.state.cs.emit('stop-game', {});
    }

    private click = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('test click!');
        this.state.cs.emit('click', { foo: 'bar' });
    }
}
