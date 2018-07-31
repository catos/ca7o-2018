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
        const { gameState } = this.props;

        const drawingPlayer = gameState.players.find(p => p.isDrawing);
        const drawingPlayerInfo = drawingPlayer !== undefined
            ? <li>Drawing player: {drawingPlayer.name}</li>
            : '';

        return (
            <div id="info-bar">
                <ul>
                    <li>Phase: {PhaseTypes[gameState.phase]}</li>
                    <li>Round: {gameState.round} of {gameState.players.length * 3}</li>
                    {drawingPlayerInfo}
                    <li>Timer: {gameState.timer.remaining} / {gameState.timer.duration}</li>
                </ul>
                <ul>
                    <li>
                        <div className="fa fa-bug"
                            onClick={() => this.props.wss.emit(WesketchEventType.ToggleDebugMode, {})} />
                    </li>
                    <li>
                        <div className={"fa" + (gameState.gamePaused ? ' fa-play-circle' : ' fa-pause-circle')}
                            onClick={() => this.props.wss.emit(WesketchEventType.PauseGame, {})} />
                    </li>
                    <li>
                        <div className="fa fa-power-off"
                            onClick={() => this.props.wss.emit(WesketchEventType.ResetGame, {})} />
                    </li>

                </ul>
            </div>
        );
    }
}
