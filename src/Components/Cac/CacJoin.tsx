import * as React from 'react';
import { SocketClientService } from 'src/Common/SocketClientService';

interface IProps {
    onJoined: () => void;
    socketService: SocketClientService;
}

interface IState {
    name: string;
    joined: boolean;
}

export class CacJoin extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        const name: string = localStorage.getItem('cac-name') || '';
        const joined: boolean = localStorage.getItem('cac-joined') === 'true' || false;
        console.log('constructor', name, joined.toString());
        this.state = {
            name,
            joined
        };
    }

    public componentDidMount() {
        if (this.state.joined && this.state.name.length) {
            this.props.socketService.emit('join-game', this.state.name);
        }
    }

    public render() {
        return (
            <div className="lobby">
                <input type="text" value={this.state.name} onKeyUp={this.onKeyUp} onChange={this.onChange} placeholder="Enter your name" />
                <div>
                    <button className="btn btn-primary mr-1" onClick={this.joinGame}>Join</button>
                </div>
            </div>
        );
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: event.target.value });
    }

    private onKeyUp = (event: React.KeyboardEvent) => {
        console.log('onKeyUp: ', event.which);        
        if (event.which === 13) {
            this.joinGame();
        }
    }

    private joinGame = (event?: React.MouseEvent<HTMLButtonElement>) => {
        this.props.socketService.emit('join-game', this.state.name);
        this.setState({ joined: true });
        this.props.onJoined();

        localStorage.setItem('cac-name', this.state.name);
        localStorage.setItem('cac-joined', 'true');
    }


}