import * as React from 'react';
import { PhaseTypes } from './PhaseTypes';
import { ITimer } from './Wesketch';

interface ITimerProps {
    phase: PhaseTypes;
    timer: ITimer;
}

export const Timer: React.SFC<ITimerProps> = (props) => {
    const { timer } = props;

    // if (props.phase === PhaseTypes.Drawing) {
        return (
            <div id="timer">
                <div className="timer-bar" style={{ width: Math.floor(timer.remaining / timer.duration * 100) + '%' }} />
            </div>
        );
    // }

    // return (
    //     <div id="timer" />
    // )
}