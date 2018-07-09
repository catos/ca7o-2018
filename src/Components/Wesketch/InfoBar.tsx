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
                <div className="timer">
                    {this.props.gameState.timeRemaining}
                </div>
                <ul>
                    <li>Phase: {PhaseTypes[this.props.gameState.phase]}</li>
                    <li>Round: {this.props.gameState.round} of {this.props.gameState.players.length * 3}</li>
                    <li>Drawing player: {drawingPlayerName}</li>                    
                    <li>Word: {this.props.gameState.currentWord}</li>
                    <li>
                        <button onClick={() => this.props.wss.emit(WesketchEventType.PauseGame, {})}>
                            {this.props.gameState.gamePaused ? 'Un-pause' : 'Pause'}
                        </button>
                    </li>
                    <li>
                        <button onClick={() => this.props.wss.emit(WesketchEventType.ResetGame, {})}>
                            Reset
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}
