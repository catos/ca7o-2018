import * as React from 'react'

import { PhaseTypes, WesketchEventTypes } from './Types';
import { IWesketchGameState, IWesketchPlayer } from './Interfaces';

import { auth } from '../../Common/AuthService';
import { Timer } from './Timer';
import { WesketchSocket } from './WesketchSocket';

interface IProps {
    gameState: IWesketchGameState;
    wss: WesketchSocket;
}

export class InfoBar extends React.Component<IProps, {}> {
    public render() {
        const { gameState } = this.props;

        let imDrawing = false;
        const drawingPlayer = gameState.players.find(p => p.isDrawing);
        if (drawingPlayer) {
            imDrawing = drawingPlayer.userId === auth.currentUser().guid;
        }

        const hints = gameState.hintsGiven > 0
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
                <div id="debug" className="debug-info-bar">
                    <div className="mr-2 fa fa-step-forward" onClick={this.toggleGameEnd} />
                    <div className="mr-2 fa fa-bug" onClick={this.toggleDebugMode} />
                    <div className="fa fa-power-off" onClick={this.resetGame} />
                </div>
                <div className="info-bar-container">

                    <div className="info-col info-col-1">
                        {hints}
                    </div>

                    <div className="info-col info-col-2">
                        {gameState.phase !== PhaseTypes.Lobby
                            ? <div>ROUND : <span className="bold">{gameState.round}</span> of <span className="bold">{gameState.players.length * 3}</span></div>
                            : ''}
                    </div>

                    <div className="info-col info-col-3">
                        {gameState.phase !== PhaseTypes.Lobby
                            ? <div className="info-timer-number">{gameState.timer.remaining}</div>
                            : ''}
                    </div>

                    <div className="info-col info-col-4">
                        {infoWord}
                        {infoDrawingPlayer}
                    </div>
                    <div className="info-col info-col-5">
                        {imDrawing && gameState.phase === PhaseTypes.Drawing
                            ? <div>
                                <button className="info-give-hint btn btn-sm btn-info mr-3" onClick={this.giveHint}>Give hint</button>
                                <button className="info-give-up btn btn-sm btn-warning" onClick={this.giveUp}>I give up!</button>
                            </div>
                            : ''}
                    </div>
                </div>
                <Timer phase={gameState.phase} timer={gameState.timer} />
            </div>
        );
    }

    private giveHint = () => {
        this.props.wss.emit(WesketchEventTypes.GiveHint, {});
    }

    private giveUp = () => {
        this.props.wss.emit(WesketchEventTypes.GiveUp, {});
    }

    private toggleDebugMode = () => {
        const players: IWesketchPlayer[] = [
            { clientId: '/wesketch#WdWJMyw-CvTuwzziAAAK', userId: 'ee822f6d-11a5-4594-b70e-225416131b2b', name: 'thomas', isReady: true, score: 0, drawCount: 0, isDrawing: false, guessedWord: false, pingCount: 0 },
            { clientId: '/wesketch#WnKF0W69_TvOBQMRAAAL', userId: '4f6a7db2-3160-4e2f-b077-ad0386323097', name: 'Cato Skogholt', isReady: true, score: 0, drawCount: 0, isDrawing: true, guessedWord: false, pingCount: 0 },
        ];

        const gameState: IWesketchGameState = {
            debugMode: false,
            phase: PhaseTypes.Drawing,
            players,
            stop: false,
            round: 1,
            timer: {
                remaining: 99,
                duration: 99
            },
            currentWord: 'LITTERBOX',
            hintsGiven: 0,
            primaryColor: '#000000',
            secondaryColor: '#ffffff',
            brushSize: 3
        };

        this.setState({ gameState });

        this.props.wss.emit(WesketchEventTypes.UpdateGameState, gameState);
    }

    private toggleGameEnd = () => {
        const players: IWesketchPlayer[] = [
            { clientId: '/wesketch#WdWJMyw-CvTuwzziAAAK', userId: 'ee822f6d-11a5-4594-b70e-225416131b2b', name: 'thomas', isReady: false, score: 56, drawCount: 3, isDrawing: false, guessedWord: false, pingCount: 0 },
            { clientId: '/wesketch#WnKF0W69_TvOBQMRAAAL', userId: '4f6a7db2-3160-4e2f-b077-ad0386323097', name: 'Cato Skogholt', isReady: false, score: 73, drawCount: 3, isDrawing: false, guessedWord: false, pingCount: 0 },
            { clientId: 'f0cc3457-1e00-416b-a785-a8bd921c25a5', userId: '3', name: 'Turd Furgeson', isReady: false, score: 51, drawCount: 3, isDrawing: false, guessedWord: false, pingCount: 0 },
            { clientId: 'f0cc3457-1e00-416b-a785-a8bd921c25a4', userId: '4', name: 'Jack Daniels', isReady: false, score: 85, drawCount: 3, isDrawing: false, guessedWord: false, pingCount: 0 },
            { clientId: 'f0cc3457-1e00-416b-a785-a8bd921c25a3', userId: '5', name: 'Niels Armstrogn', isReady: false, score: 116, drawCount: 3, isDrawing: false, guessedWord: false, pingCount: 0 },
            { clientId: 'f0cc3457-1e00-416b-a785-a8bd921c25a1', userId: '6', name: 'Bjarte Tjøstheim', isReady: false, score: 19, drawCount: 3, isDrawing: false, guessedWord: false, pingCount: 0 }
        ];

        const gameState: IWesketchGameState = {
            debugMode: false,
            phase: PhaseTypes.GameEnd,
            players,
            stop: false,
            round: 1,
            timer: {
                remaining: 0,
                duration: 0
            },
            currentWord: '',
            hintsGiven: 0,
            primaryColor: '#000000',
            secondaryColor: '#ffffff',
            brushSize: 3
        };

        this.setState({ gameState });
        this.props.wss.emit(WesketchEventTypes.UpdateGameState, gameState);
    }

    private resetGame = () => {
        this.props.wss.emit(WesketchEventTypes.ResetGame, {});
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
