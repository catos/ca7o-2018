import * as React from "react";

import { IGameState } from "./IGameState";
import { SocketClientService } from "../../Common/SocketClientService";

interface IProps {
    socketService: SocketClientService;
    gs: IGameState
}

export class CacDeveloperTools extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <div className="p-3">                
                <button className="btn btn-info" onClick={this.getCoins}>100</button>

                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>socketId</th>
                            <th>name</th>
                            <th>coins</th>
                            <th>cpt</th>
                            <th>isDead</th>
                            <th>isComputer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.gs.players.map((player, idx) =>
                            <tr key={idx}>
                                <td>{player.socketId}</td>
                                <td>{player.name}</td>
                                <td>{player.coins}</td>
                                <td>{player.cpt}</td>
                                <td>{player.isDead.toString()}</td>
                                <td>{player.isComputer.toString()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    private getCoins = (event: React.MouseEvent) => {
        this.props.socketService.emit('dev-get-coins', event.currentTarget.innerHTML);
    }
}