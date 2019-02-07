import * as React from "react";

import { SocketClientService } from "../../Common/SocketClientService";

interface IProps {
    socketService: SocketClientService;
}

interface IState {
    myName: string;
}

export class Lobby extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            myName: ''
        }
    }

    public render() {
        return (
            <div className="lobby p-3">
                <h4>Lobby</h4>
                <div>
                    <button className="btn btn-success mr-1" onClick={this.startGame}>Start Game</button>
                </div>
            </div>
        );
    }

    private startGame = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('start game pls!');
        this.props.socketService.emit('start-game', {});
    }


}