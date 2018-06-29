import * as React from 'react'

import { IWesketchGameState } from './Wesketch';
import { PhaseTypes } from './PhaseTypes';

interface IProps {
    gameState: IWesketchGameState;
}

export const InfoBar: React.SFC<IProps> = (props) => {
    return (
        <div id="info-bar">
            Phase: {PhaseTypes[props.gameState.phase]}
        </div>
    );
}
