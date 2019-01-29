import * as React from "react";
import { SocketClientService } from "./SocketClientService";

interface IProps {
    socketService: SocketClientService;
}

export class CacDeveloperTools extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);        
    }

    public render() {
        return (
            <div>
                <button className="btn btn-info" onClick={this.getCoins}>100</button>
            </div>
        );
    }

    private getCoins = (event: React.MouseEvent) => {
        console.log('event', event.currentTarget.innerHTML);
        this.props.socketService.emit('dev-get-coins', event.currentTarget.innerHTML);
    }
}