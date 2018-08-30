import * as React from 'react';
import { IWesketchGameState } from './Wesketch';
import { WesketchService, WesketchEventType } from './WesketchService';

interface IProps {
    gameState: IWesketchGameState,
    wss: WesketchService
}

export class GameEnd extends React.Component<IProps, any> {
    public render() {
        const { players } = this.props.gameState;

        return (
            <div id="phase-game-end">
                <h1>Oh Hai Score!</h1>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, idx) =>
                            <tr key={idx}>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <button className="btn btn-dark" onClick={this.resetGame}>Start a new game!</button>
            </div>
        );
    }

    private resetGame = () => {
        this.props.wss.emit(WesketchEventType.ResetGame, {});
    }
}