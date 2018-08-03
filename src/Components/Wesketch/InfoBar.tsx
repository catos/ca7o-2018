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
        // let canDraw = false;

        const drawingPlayer = gameState.players.find(p => p.isDrawing);
        if (drawingPlayer) {
            imDrawing = drawingPlayer.userId === auth.currentUser().guid;

            // Everyone can draw in debugmode
            // canDraw = gameState.phase === PhaseTypes.Drawing && imDrawing || gameState.debugMode;
        }

        const infoWord = imDrawing
            ? <div className="info-word">DRAW THE WORD: {gameState.currentWord}</div>
            : '';

        const infoDrawingPlayer = drawingPlayer !== undefined && !imDrawing
            ? <div className="info-drawing-player">DRAWING: {drawingPlayer.name}</div>
            : '';

        const drawingPlayerOptions = drawingPlayer !== undefined && imDrawing
            ? <div>
                <button className="info-give-hint btn btn-sm btn-info mr-3" onClick={this.giveHint}>Give hint</button>
                <button className="info-give-up btn btn-sm btn-warning" onClick={this.giveUp}>I give up!</button>
            </div>
            : '';

        return (
            <div id="info-bar">
                {drawingPlayerOptions}

                <div className="info-round">ROUND: {gameState.round} of {gameState.players.length * 3}</div>
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
        console.log('give hint');
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
}
