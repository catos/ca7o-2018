import * as React from 'react';
import * as moment from 'moment';

import { PhaseTypes, WesketchEventTypes } from './Types';
import { IWesketchEvent, IWesketchGameState, IWesketchGameSettings } from './Interfaces';

interface IProps {
    gameSettings: IWesketchGameSettings;
    gameState: IWesketchGameState;
    events: IWesketchEvent[];
}

interface IState {
    showGameState: boolean;
    showPlayers: boolean;
    showEvents: boolean;
}

export class Debug extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            showGameState: false,
            showPlayers: false,
            showEvents: false
        };
    }

    public render() {
        const { gameSettings, gameState } = this.props;

        const gameStateString = this.state.showGameState
            ? <table className="table table-sm">
                <tbody>
                    <tr><th>debugMode</th><td>{gameState.debugMode.toString()}</td></tr>
                    <tr><th>phase</th><td>{PhaseTypes[gameState.phase]}</td></tr>
                    <tr><th>stop</th><td>{gameState.stop.toString()}</td></tr>
                    <tr><th>round</th><td>{gameState.round}</td></tr>
                    <tr><th>timer</th><td>{gameState.timer.remaining} / {gameState.timer.duration}</td></tr>
                    <tr><th>hintsGiven</th><td>{gameState.hintsGiven}</td></tr>
                    <tr><th>primaryColor</th><td>{gameState.primaryColor}</td></tr>
                    <tr><th>secondaryColor</th><td>{gameState.secondaryColor}</td></tr>
                    <tr><th>brushSize</th><td>{gameState.brushSize}</td></tr>
                    <tr><th>-- Settings</th><td>&nbsp;</td></tr>
                    <tr><th>language</th><td>{gameSettings.language}</td></tr>
                    <tr><th>difficulties</th><td>{JSON.stringify(gameSettings.difficulties)}</td></tr>
                    <tr><th>wordCount</th><td>{gameSettings.wordCount}</td></tr>
                </tbody>
            </table>
            : '';

        const players = this.state.showPlayers
            ? <table className="table table-sm">
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
                        <th>Pings</th>
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
                            <td>{player.pingCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
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
                            <td>{WesketchEventTypes[event.type]}</td>
                            <td>{event.userName}</td>
                            <td>
                                {(event.type !== WesketchEventTypes.UpdateGameState)
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
                    <i className="toggler fa fa-info-circle" onClick={() => this.toggle('info')} />
                    {gameStateString}
                </div>
                <div className="players">
                    <i className="toggler fa fa-users" onClick={() => this.toggle('players')} />
                    {players}
                </div>
                <div className="events">
                    <div><i className="toggler fa fa-list" onClick={() => this.toggle('events')} /></div>
                    {events}
                </div>
            </div>
        );
    }

    private toggle = (target: string) => {
        switch (target) {
            case 'info':
                this.setState({ showGameState: !this.state.showGameState });
                break;
            case 'players':
                this.setState({ showPlayers: !this.state.showPlayers });
                break;
            case 'events':
                this.setState({ showEvents: !this.state.showEvents });
                break;
            default:
                break;
        }
    }
}