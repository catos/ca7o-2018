import * as React from 'react';
import { CacSocket, ICacEvent } from './CacSocket';
import { CacEvents } from './CacEvents';

export interface ICity {
    level: number;
    workTimer: number;
    isWorking: boolean;
}

export interface IArmy {
    level: number;
    strength: number;
    soldiers: number;
}

export interface ICitizens {
    level: number;
    efficiency: number;
    workers: number;
}

export interface IPlayer {
    socketId: string;
    name: string;
    coins: number;
    cps: number;
    isDead: boolean;
    isComputer: boolean;

    city: ICity;
    army: IArmy;
    citizens: ICitizens;
}

interface IGameState {
    updated: number;
    prevUpdated: number;
    ticks: number;
    players: IPlayer[]
}

interface IState {
    cs: CacSocket;
    myName: string;
    gameState: IGameState;
}

export class Cac extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            cs: new CacSocket(),
            myName: 'Player 1',
            gameState: {
                updated: Date.now(),
                prevUpdated: Date.now(),
                ticks: 0,
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
        const { gameState } = this.state;

        return (
            <div>
                <h3>Cac!</h3>

                <input type="text" value={this.state.myName} onChange={this.onFieldValueChange} />
                <button className="btn btn-primary mr-1" onClick={this.joinGame}>Join Game</button>
                <button className="btn btn-success mr-1" onClick={this.startGame}>Start Game</button>
                <button className="btn btn-danger mr-1" onClick={this.stopGame}>Stop Game</button>
                <button className="btn btn-secondary mr-1" onClick={this.click}>Click</button>

                <hr />

                <ul>
                    <li>Ticks: {gameState.ticks}</li>
                    <li>Players:
                        <ul>
                            {gameState.players.map((player, idx) =>
                                <li key={idx}>{player.socketId} - {player.name} - {player.coins}</li>
                            )}
                        </ul>
                    </li>
                </ul>

                <CacEvents cs={this.state.cs} />
            </div>
        );
    }

    private onFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextState = {
            ...this.state,
            myName: event.target.value
        };
        this.setState(nextState);
    }

    private onEvent = (event: ICacEvent) => {
        console.log(`onEvent - type: ${event.type}`);

        if (event.type === 'UpdateGameState') {
            const gameState = event.value as IGameState;
            this.setState({ gameState });
        }

    }

    private joinGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('join game pls!');
        this.state.cs.setClientName(this.state.myName);
        this.state.cs.emit('join-game', {});
    }

    private startGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('start game pls!');
        this.state.cs.emit('start-game', {});
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
