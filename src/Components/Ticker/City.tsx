import * as React from 'react';
import { IPlayer } from './IPlayer';

interface IProps {
    player: IPlayer;
}

interface IState {
    timeRemaining: number;
    isWorking: boolean;
}

export class City extends React.Component<IProps, IState> {
    private readonly WORK_TIME: number = 5000;

    constructor(props: IProps) {
        super(props);

        this.state = {
            timeRemaining: this.WORK_TIME,
            isWorking: false,
        };
    }


    public render() {
        const { player } = this.props;

        return (
            <div className="player-city">
                <h3>City</h3>
                <h4>Level {player.city.level}</h4>
                <div>Treasury: {player.coins} <span className="fa fa-coins" /></div>
                <div>Income: {player.cps} <span className="fa fa-coins" />/s</div>
                <div>Build Slots: {player.city.level}</div>
                <div><strong>Bonuses</strong></div>
                <div>Cost: +0%</div>
                <div>Build time: +0%</div>
                <div>Defense: +10%</div>
                <div>
                    <button className={'mr-1 btn' + (this.state.isWorking ? ' btn-secondary' : ' btn-primary')} onClick={this.onClick}>
                        Work
                        <div><small>Rewards: {Math.floor(this.props.player.citizens.workers / 5)} <span className="fa fa-coins" /></small></div>
                        <div><small>Time: {this.state.timeRemaining / 1000} seconds</small></div>
                    </button>

                    <button className="btn btn-info">
                        <h5>Upgrade</h5>
                        <div>Cost: {player.city.level * 100} <span className="fa fa-coins" /></div>
                        <div>Current Level: {player.city.level}</div>
                    </button>
                </div>
            </div>);
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
