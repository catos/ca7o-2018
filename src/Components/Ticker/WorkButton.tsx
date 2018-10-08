import * as React from "react";
import { IPlayer } from "./IPlayer";

interface IProps {
    player: IPlayer;
}

interface IState {
    timeRemaining: number;
    isWorking: boolean;
}

export class WorkButton extends React.Component<IProps, IState> {
    private readonly WORK_TIME: number = 5000;

    constructor(props: IProps) {
        super(props);

        this.state = {
            timeRemaining: this.WORK_TIME,
            isWorking: false,
        };
    }

    public render() {
        return (
            <button className={'mr-1 btn' + (this.state.isWorking ? ' btn-secondary' : ' btn-primary')} onClick={this.onClick}>
                WORK
                <div><small>Rewards: {Math.floor(this.props.player.citizens.workers / 5)} <span className="fa fa-coins" /></small></div>
                <div><small>Time: {this.state.timeRemaining / 1000} seconds</small></div>
            </button>
        );
    }

    private onClick = () => {
        const { player } = this.props;

        // player is already crafting
        if (this.state.isWorking) {
            return;
        }

        // start order / craft
        this.craft(() => {
            player.coins += Math.floor(this.props.player.citizens.workers / 5);

            this.setState({
                timeRemaining: this.WORK_TIME,
                isWorking: false
            });
        });
    }


    private craft = (callback: () => void) => {
        this.setState({ isWorking: true });

        const intervalId = setInterval(() => {
            this.setState(prevState => ({ timeRemaining: prevState.timeRemaining - 1000 }), 
            () => {
                if (this.state.timeRemaining <= 0) {
                    clearInterval(intervalId);
                    callback();
                }
            });
        }, 1000);
    }
}