import * as React from 'react'

import { IWesketchGameState } from './Wesketch';
import { PhaseTypes } from './PhaseTypes';

interface IProps {
    resetGame: () => void;
    gameState: IWesketchGameState;
}

export const InfoBar: React.SFC<IProps> = (props) => {
    return (
        <div id="info-bar">
            <ul>
                <li>Phase: {PhaseTypes[props.gameState.phase]}</li>
                <li><button onClick={() => props.resetGame()}>Reset</button></li>
            </ul>
        </div>
    );
}
