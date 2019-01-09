import * as React from "react";

import { CacSocket } from "./CacSocket";
import { IGameState } from "./Cac";

interface IProps {
    gs: IGameState;
    cs: CacSocket;
}

interface IState {
    myName: string;
}

export class Lobby extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            myName: 'Player 1'
        }
    }

    public render() {
        return (
            <div>
                <input type="text" value={this.state.myName} onChange={this.onFieldValueChange} />
                <button className="btn btn-primary mr-1" onClick={this.joinGame}>Join Game</button>
                <button className="btn btn-success mr-1" onClick={this.startGame}>Start Game</button>
            </div>
        );
    }

    private onFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextState = {
            ...this.state,
            myName: event.target.value
        };
        this.setState(nextState);
    }

    private joinGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('join game pls!');
        this.props.cs.setClientName(this.state.myName);
        this.props.cs.emit('join-game', {});
    }

    private startGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('start game pls!');
        this.props.cs.emit('start-game', {});
    }


}