import * as React from 'react';
import { WesketchService, WesketchEventType } from './WesketchService';

interface IProps {
    label: string;
    modifier: number;
    wss: WesketchService;
}

export const BrushSizeButton: React.SFC<IProps> = (props) => {
    const changeBrushSize = () => {
        props.wss.emit(WesketchEventType.ChangeBrushSize, props.modifier)
    };

    return (
        <div onClick={changeBrushSize}
            className={"button fa " + (props.modifier > 0
                ? 'fa-plus-circle'
                : 'fa-minus-circle')} />
    );
}