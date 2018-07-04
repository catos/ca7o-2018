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
        <div>
            <button className="btn btn-primary btn-sm" onClick={clearCanvas}><i className="far fa-times-circle" /></button>
        </div>
    );
}