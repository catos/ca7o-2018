import * as React from 'react'
import { WesketchEventType, WesketchService } from './WesketchService';

interface IProps {
    currentColor: string;
    wss: WesketchService;
}

const COLORS = [
    '#000000',
    '#ffffff',
    '#123524',
    '#003153',
    '#584630',
    '#E32636',
    '#fff600'
];

export const Colors: React.SFC<IProps> = (props) => {
    const changeColor = (newColor: string) => {
        props.wss.emit(WesketchEventType.ChangeColor, newColor);
    }

    return (
        <div id="colors">
            {COLORS.map((color, idx) =>
                <div key={idx} 
                    className={ "button " + (props.currentColor === color ? 'current-color' : '')} 
                    style={{ backgroundColor: color }}
                    onClick={() => changeColor(color)} />
            )}
        </div>
    );
}
