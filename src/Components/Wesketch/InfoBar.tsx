import * as React from 'react'

import { IWesketchGameState } from './Wesketch';
import { WesketchService, WesketchEventType } from './WesketchService';
// import { PhaseTypes } from './PhaseTypes';
import { auth } from '../../Common/AuthService';
import { Timer } from './Timer';
import { PhaseTypes } from './PhaseTypes';

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

        const drawingPlayerOptions = imDrawing && gameState.phase === PhaseTypes.Drawing
            ? <div>
                <button className="info-give-hint btn btn-sm btn-info mr-3" onClick={this.giveHint}>Give hint</button>
                <button className="info-give-up btn btn-sm btn-warning" onClick={this.giveUp}>I give up!</button>
            </div>
            : '';

        const hints = !imDrawing && gameState.hintsGiven > 0
            ? <div className="info-hint">
                <span className="label">HINT:</span>
                {this.hintArray().map((char, idx) =>
                    <span key={idx} className="bold character">{char}</span>
                )}
            </div>
            : '';

        const infoWord = imDrawing && gameState.phase === PhaseTypes.Drawing
            ? <div className="info-word">WORD: <span className="bold">{gameState.currentWord}</span></div>
            : '';

        // If drawing player is defined (and it is not me)
        const infoDrawingPlayer = drawingPlayer !== undefined && (!imDrawing || gameState.phase !== PhaseTypes.Drawing)
            ? <div className="info-drawing-player">DRAWING{gameState.phase !== PhaseTypes.Drawing ? ' NEXT' : ''}: <span className="bold">{drawingPlayer.name}</span></div>
            : '';

        return (
            <div id="info-bar">
                <div className="info-bar-container">

                    <div className="info-col info-col-1">
                        {drawingPlayerOptions}
                        {hints}
                    </div>
                    <div className="info-col info-col-2">ROUND: <span className="bold">{gameState.round}</span> of <span className="bold">{gameState.players.length * 3}</span></div>

                    <div className="info-col info-col-3">
                        <div className="info-timer-number">{gameState.timer.remaining}</div>
                    </div>

                    <div className="info-col info-col-4">
                        {infoWord}
                        {infoDrawingPlayer}
                    </div>
                    <div className="info-col info-col-5">
                        <div className="info-options">
                            <div className="fa fa-bug" onClick={this.toggleDebugMode} />
                            <div className="fa fa-power-off" onClick={this.resetGame} />
                        </div>
                    </div>
                </div>
                <Timer phase={gameState.phase} timer={gameState.timer} />
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
