import * as React from 'react';

import { WesketchEventTypes } from '../Types';
import { WesketchSocket } from '../WesketchSocket';

interface IProps {
    wss: WesketchSocket;
    brushSize: number;
}

export const BrushButton: React.SFC<IProps> = (props) => {
    const onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
        const modifier = event.button === 2 ? -3 : 3;
        props.wss.emit(WesketchEventTypes.ChangeBrushSize, modifier)
    };

    const onContextMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        return;
    }

    return (
        <div className="button brush fa fa-paint-brush"
            onMouseUp={onMouseUp}
            onContextMenu={onContextMenu}>
            <span>{props.brushSize}</span>
        </div>
    );
}