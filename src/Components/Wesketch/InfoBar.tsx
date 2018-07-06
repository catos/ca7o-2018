import * as React from 'react'

import { IWesketchGameState } from './Wesketch';
import { PhaseTypes } from './PhaseTypes';
import { WesketchService, WesketchEventType } from './WesketchService';

interface IProps {
    gameState: IWesketchGameState;
    wss: WesketchService;
}

export class InfoBar extends React.Component<IProps, {}> {
    public render() {
        const drawingPlayer = this.props.gameState.players.find(p => p.isDrawing);
        const drawingPlayerName = drawingPlayer !== undefined ? drawingPlayer.name : '';

        return (
            <div id="info-bar">
                <ul>
                    <li>Phase: {PhaseTypes[this.props.gameState.phase]}</li>
                    <li>Drawing player: {drawingPlayerName}</li>
                    <li>Time remaining: {this.props.gameState.timeRemaining}</li>
                    <li>Word: {this.props.gameState.currentWord}</li>
                    <li>
                        <span onClick={() => this.props.wss.emit(WesketchEventType.PauseGame, {})}>
                        {this.props.gameState.gamePaused ? 'Un-pause' : 'Pause'}
                        </span>
                    </li>
                    <li><span onClick={() => this.props.wss.emit(WesketchEventType.ResetGame, {})}>[Reset]</span></li>
                </ul>
            </div>
        );
    }
}
