import * as React from 'react';

interface IProps {
    onClick: (type: string, data: any) => void;
}

export const ClearCanvasButton: React.SFC<IProps> = (props) => {
    return (
        <div>
            <button className="btn btn-primary btn-sm" 
                onClick={() => props.onClick('clear-canvas', {})}>X</button>
            </div>
    );
}