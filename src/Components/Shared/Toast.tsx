import * as React from 'react';

import './Toast.css';

export interface IProps {
    message: string;
    visible: boolean;
    level?: string;
    onHide: () => void;
}

interface IState {
    visible: boolean;
}

export class Toast extends React.Component<IProps, IState> {
    private intervalId: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            visible: false,
        };

        this.fade();
    }

    public componentWillReceiveProps(nextProps) {
        if (this.props.visible !== nextProps.visible) {
            this.setState({
                visible: nextProps.visible
            });
        }

        this.fade();
    }

    public render() {
        return (
            <div className={this.classes()}>
                {this.props.message}
            </div>
        );
    }

    private classes = (): string => {
        let result = 'toast';

        result += this.state.visible
            ? ' toast-fade-in'
            : ' toast-fade-out';


        result += this.props.level
            ? ' ' + this.props.level
            : ' info';

        return result;
    }

    private fade = () => {
        this.intervalId = setTimeout(() => {
            this.setState({ visible: false });
            this.props.onHide();
            clearInterval(this.intervalId);
        }, 5000);
    }
}