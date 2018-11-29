import * as React from 'react';
import { CacSocket, ICacEvent } from './CacSocket';

// interface IGameState {
//     stopGame: boolean;
//     now: number;
//     dt: number;
//     dtAcc: number;
//     last: number;
//     step: number;
//     ticks: number;
//     // players: IPlayer[],
//     log: string[]
// }

interface IPlayer {
    socketId: string;
    name: string;
    ticks: number;
    clicks: number;
    tps: number;
}

interface IGameState {
    timer: number;
    clicks: number;
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
                timer: 0,
                clicks: 0,
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
                    <li>My socketId: {this.state.cs.socketId}</li>
                    <li>timer: {gameState.timer}</li>
                    <li>clicks: {gameState.clicks}</li>
                    <li>players:
                        <ul>
                            {gameState.players.map((player, idx) =>
                                <li key={idx}>{player.socketId} - {player.name} - {player.clicks}</li>
                            )}
                        </ul>
                    </li>
                </ul>
                <button className="btn btn-primary" onClick={this.test}>Click</button>
            </div>
        );
    }

    private onEvent = (event: ICacEvent) => {
        // console.log(`onEvent - type: ${event.type}`);

        if (event.type === 'UpdateGameState') {
            const gameState = event.value as IGameState;
            this.setState({ gameState });
        }

    }

    private test = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('test click!');
        this.state.cs.emit('click', { foo: 'bar' });
    }
}
