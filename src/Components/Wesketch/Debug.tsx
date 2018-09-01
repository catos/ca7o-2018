import * as React from 'react';
import * as moment from 'moment';

import { IWesketchGameState } from './Wesketch';
import { IWesketchEvent, WesketchEventType } from './WesketchService';
import { PhaseTypes } from './PhaseTypes';

interface IProps {
    gameState: IWesketchGameState;
    events: IWesketchEvent[];
}

interface IState {
    showGameState: boolean;
    showEvents: boolean;
}

export class Debug extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            showGameState: false,
            showEvents: false
        };
    }

    public render() {
        const { gameState } = this.props;

        const gameStateString = this.state.showGameState
            // ? JSON.stringify(this.props.gameState, undefined, 2)
            ? <div>
                <ul>
                    <li>debugMode: {gameState.debugMode.toString()}</li>
                    <li>phase: {PhaseTypes[gameState.phase]}</li>
                    <li>stop: {gameState.stop.toString()}</li>
                    <li>round: {gameState.round}</li>
                    <li>timer: {gameState.timer.remaining} / {gameState.timer.duration}</li>
                    <li>currentWord: ******</li>
                    <li>hintsGiven: {gameState.hintsGiven}</li>
                    <li>primaryColor: {gameState.primaryColor}</li>
                    <li>secondaryColor: {gameState.secondaryColor}</li>
                    <li>brushSize: {gameState.brushSize}</li>
                    <li>players: ....</li>
                </ul>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>ClientId</th>
                            <th>UserId</th>
                            <th>Name</th>
                            <th>Score</th>
                            <th>IsReady</th>
                            <th>IsDrawing</th>
                            <th>DrawCount</th>
                            <th>GuessedWord</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameState.players.map((player, idx) =>
                            <tr key={idx}>
                                <td>{player.clientId}</td>
                                <td>{player.userId}</td>
                                <td>{player.name}</td>
                                <td>{player.score}</td>
                                <td>{player.isReady.toString()}</td>
                                <td>{player.isDrawing.toString()}</td>
                                <td>{player.drawCount}</td>
                                <td>{player.guessedWord.toString()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            : '';

        const events = this.state.showEvents
            ? <table className="table table-sm">
                <thead>
                    <tr>
                        <th>timestamp</th>
                        <th>type</th>
                        <th>username</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.events.slice(Math.max(this.props.events.length - 10, 1)).map((event, idx) =>
                        <tr key={idx}>
                            <td>{moment(event.timestamp).format('HH:mm:ss')}</td>
                            <td>{WesketchEventType[event.type]}</td>
                            <td>{event.userName}</td>
                            <td>
                                {(event.type !== WesketchEventType.UpdateGameState)
                                    ? JSON.stringify(event.value, undefined, 2)
                                    : ''
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            : '';

        return (
            <div id="debug">
                <div className="info">
                    <i className="fa fa-info" onClick={this.toggleShowGameState} />
                    {gameStateString}
                </div>

                <div className="events">
                    <div><i className="fa fa-list" onClick={this.toggleShowEvents} /></div>
                    {events}
                </div>
            </div>
        );
    }

    private toggleShowGameState = () => {
        this.setState({
            showGameState: !this.state.showGameState
        });
    }

    private toggleShowEvents = () => {
        this.setState({
            showEvents: !this.state.showEvents
        })
    }
}