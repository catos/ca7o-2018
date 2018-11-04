import * as React from 'react';

import { WesketchEventTypes } from '../Types';
import { WesketchSocket } from '../WesketchSocket';

interface IProps {
    wss: WesketchSocket;
}

export const ClearCanvasButton: React.SFC<IProps> = (props) => {
    const clearCanvas = () => {
        props.wss.emit(WesketchEventTypes.ClearCanvas, {})
    };

    return (
        <div className="button fa fa-file" onClick={clearCanvas} />
    );
}