import * as React from 'react';

import { Vector2 } from './Vector2';
import { WesketchService } from './WesketchService';
import { IWesketchGameState } from './Wesketch';
import { ClearCanvasButton } from './ClearCanvasButton';
import { BrushSizeButton } from './BrushSizeButton';
import { Colors } from './Colors';

// import dotsIcon from '../../Images/dots-icon.svg';

interface IProps {
    wss: WesketchService;
    gameState: IWesketchGameState;
}

interface IState {
    mousePos: Vector2
}

export class PainterTools extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            mousePos: new Vector2(0, 0)
        }

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDrag = this.onDrag.bind(this);
    }

    public render() {
        const { wss, gameState } = this.props;

        return (
            <div className="tools-wrapper">
                <div className="tools"
                    onDragStart={this.onDragStart}
                    onDrag={this.onDrag}>

                    <ClearCanvasButton wss={wss} />
                    <div className="button fa fa-paint-brush" />
                    <BrushSizeButton label="+" modifier={3} wss={wss} />
                    <BrushSizeButton label="-" modifier={-3} wss={wss} />
                    <Colors currentColor={gameState.primaryColor} wss={wss} />

                    {this.state.mousePos.x}, {this.state.mousePos.y}
                </div>
            </div>
        );
    }

    private onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const mousePos = new Vector2(
            event.clientX,
            event.clientY);
        this.setState({ mousePos });
    }

    private onDragStart = (event: any) => {
        console.log('dragStart', event.target);

    }

    private onDrag = (event: any) => {
        console.log('drag', this.state.mousePos);
    }
}