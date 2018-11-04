import * as React from 'react';

import { PhaseTypes } from './Types/PhaseTypes';
import { IWesketchTimer } from './Interfaces/IWesketchTimes';

interface ITimerProps {
    phase: PhaseTypes;
    timer: IWesketchTimer;
}

export const Timer: React.SFC<ITimerProps> = (props) => {
    const { timer } = props;
    
    return (
        <div id="timer">
            <div className="timer-bar" style={{ width: Math.floor(timer.remaining / timer.duration * 100) + '%' }} />
        </div>
    );
}