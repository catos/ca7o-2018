import * as React from 'react';
import { IProperty } from './IPlayer';

interface IProps {
    isMe: boolean;
    label: string;
    item: IProperty;
    onClick: () => void;
}

export class CacButton extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { item } = this.props;
        const className =
            'cac-btn btn btn-lg' + (!item.inProgress ? ' btn-primary' : ' btn-secondary');

        return (
            <button className={className} onClick={this.onClick}>
                <div className="cac-btn-content">
                    <div className="label">{this.props.label}</div>
                    <div className="cost">{item.cost} <span className="fa fa-coins" /></div>
                    <div className="time">{Math.floor(item.timeRemaining / 1000)}</div>
                    <div>isMe: {this.props.isMe.toString()}</div>
                </div>
                <span className="cac-btn-progress-bar" style={{ width: Math.floor(item.timeRemaining / item.timeToUpgrade * 100) + '%' }} />
            </button>
        );
    }

    private onClick = (event: React.MouseEvent) => {
        if (!this.props.item.inProgress) {
            this.props.onClick();
        }
        return;
    }
}