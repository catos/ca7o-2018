import * as React from 'react'

import { IWesketchGameState } from './Wesketch';
import { WesketchService, WesketchEventType } from './WesketchService';
// import { PhaseTypes } from './PhaseTypes';
import { auth } from '../../Common/AuthService';

interface IProps {
    gameState: IWesketchGameState;
    wss: WesketchService;
}

export class InfoBar extends React.Component<IProps, {}> {
    public render() {
        const { gameState } = this.props;

        let imDrawing = false;
        const drawingPlayer = gameState.players.find(p => p.isDrawing);
        if (drawingPlayer) {
            imDrawing = drawingPlayer.userId === auth.currentUser().guid;
        }

        const drawingPlayerOptions = imDrawing
            ? <div>
                <button className="info-give-hint btn btn-sm btn-info mr-3" onClick={this.giveHint}>Give hint</button>
                <button className="info-give-up btn btn-sm btn-warning" onClick={this.giveUp}>I give up!</button>
            </div>
            : '';

        const hints = !imDrawing && gameState.hintsGiven > 0
            ? <div>
                <span className="mr-1">HINT:</span>
                {this.hintArray().map((char, idx) =>
                    <span key={idx} className="mr-1">{char}</span>
                )}
            </div>
            : '';

        const infoWord = imDrawing
            ? <div className="info-word">WORD: <span>{gameState.currentWord}</span></div>
            : '';

        const infoDrawingPlayer = drawingPlayer !== undefined && !imDrawing
            ? <div className="info-drawing-player">DRAWING: <span>{drawingPlayer.name}</span></div>
            : '';

        return (
            <div id="info-bar">
                {drawingPlayerOptions}
                {hints}
                <div className="info-round">ROUND: <span>{gameState.round}</span> of <span>{gameState.players.length * 3}</span></div>
                <div className="info-timer">{gameState.timer.remaining}</div>
                {infoWord}
                {infoDrawingPlayer}
                <ul className="game-options">
                    <li>
                        <div className="fa fa-bug" onClick={this.toggleDebugMode} />
                    </li>

                    <li>
                        <div className="fa fa-power-off"
                            onClick={this.resetGame} />
                    </li>

                </ul>
            </div>
        );
    }

    private giveHint = () => {
        this.props.wss.emit(WesketchEventType.GiveHint, {});
    }

    private giveUp = () => {
        this.props.wss.emit(WesketchEventType.GiveUp, {});
    }

    private toggleDebugMode = () => {
        this.props.wss.emit(WesketchEventType.ToggleDebugMode, {});
    }

    private resetGame = () => {
        this.props.wss.emit(WesketchEventType.ResetGame, {});
    }

    private hintArray = (): string[] => {
        const { gameState } = this.props;
        const result: string[] = [];
        if (gameState.hintsGiven > 0) {
            Array.from(gameState.currentWord, (v, i) => {
                if (gameState.hintsGiven > 1 && i === 0) {
                    result.push(v);
                } else if (gameState.hintsGiven > 2 && i === 1) {
                    result.push(v);
                } else {
                    result.push('_');
                }
            })
        }
        return result;
    }
}
