import * as React from 'react';
import { WesketchSocket, WesketchEventType } from './WesketchSocket';

interface IProps {
    wss: WesketchSocket;
}

export const ClearCanvasButton: React.SFC<IProps> = (props) => {
    const clearCanvas = () => {
        props.wss.emit(WesketchEventType.ClearCanvas, {})
    };

    return (
        <div className="button fa fa-file" onClick={clearCanvas} />
    );
}