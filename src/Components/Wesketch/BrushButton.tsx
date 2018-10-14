import * as React from 'react';
import { WesketchService, WesketchEventType } from './WesketchService';

interface IProps {
    wss: WesketchService;
    brushSize: number;
}

export const BrushButton: React.SFC<IProps> = (props) => {
    const onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
        const modifier = event.button === 2 ? -3 : 3;
        props.wss.emit(WesketchEventType.ChangeBrushSize, modifier)
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