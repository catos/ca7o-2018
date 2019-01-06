import * as React from 'react';
import { CacSocket, ICacEvent } from './CacSocket';
import { CacEvents } from './CacEvents';

interface IPlayer {
    socketId: string;
    name: string;
    ticks: number;
    clicks: number;
    tps: number;
}

interface IGameState {
    updated: number;
    prevUpdated: number;
    ticks: number;
    players: IPlayer[]
}

interface IState {
    cs: CacSocket;
    gameState: IGameState;
}

export class Cac extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            cs: new CacSocket(),
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
                <ul>
                    <li>Ticks: {gameState.ticks}</li>
                    <li>Players:
                        <ul>
                            {gameState.players.map((player, idx) =>
                                <li key={idx}>{player.socketId} - {player.name} - {player.clicks}</li>
                            )}
                        </ul>
                    </li>
                </ul>
                <button className="btn btn-primary mr-1" onClick={this.joinGame}>Join Game</button>
                <button className="btn btn-success mr-1" onClick={this.startGame}>Start Game</button>
                <button className="btn btn-danger mr-1" onClick={this.stopGame}>Stop Game</button>
                <button className="btn btn-secondary mr-1" onClick={this.click}>Click</button>

                <hr />

                <CacEvents cs={this.state.cs} />
            </div>
        );
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
        this.state.cs.emit('join-game', { name: 'Cato' });
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
