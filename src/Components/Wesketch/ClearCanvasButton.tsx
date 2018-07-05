import * as React from 'react';
import { WesketchService, WesketchEventType } from './WesketchService';

interface IProps {
    wss: WesketchService;
}

export const ClearCanvasButton: React.SFC<IProps> = (props) => {
    const clearCanvas = () => {
        props.wss.emit(WesketchEventType.ClearCanvas, {})
    };

    return (
        <div className="button fa fa-times-circle" onClick={clearCanvas} />
    );
}