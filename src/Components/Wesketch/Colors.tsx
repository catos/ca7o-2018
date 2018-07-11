import * as React from 'react'
import { WesketchEventType, WesketchService } from './WesketchService';

interface IProps {
    currentColor: string;
    wss: WesketchService;
}

const COLORS = [
    '#000000',
    '#c0c0c0',
    '#ffffff',

    '#2c4fa5',
    '#00a446',
    '#f1b700',
    '#d9242a',
    '#c50c70',
    '#6c4b1f'
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
