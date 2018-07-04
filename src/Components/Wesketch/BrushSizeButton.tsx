import * as React from 'react';
import { WesketchService, WesketchEventType } from './WesketchService';

interface IProps {
    label: string;
    modifier: number;
    wss: WesketchService;
}

export const BrushSizeButton: React.SFC<IProps> = (props) => {
    const clearCanvas = () => {
        props.wss.emit(WesketchEventType.ChangeBrushSize, props.modifier)
    };

    return (
        <div>
            <button className="btn btn-primary btn-sm" onClick={clearCanvas}>
                {props.modifier > 0 
                    ? <i className="fa fa-plus-circle" />
                    : <i className="fa fa-minus-circle" />
                }                
            </button>
        </div>
    );
}