import * as React from 'react';
import { SocketClientService } from 'src/Common/SocketClientService';

interface IProps {
    joinGame: () => void;
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
        this.state = {
            name,
            joined
        };
        console.log(`constructor: name = ${this.state.name}, joined = ${this.state.joined}`);
    }

    public componentDidMount() {
        console.log(`componentDidMount: name = ${this.state.name.length}, joined = ${this.state.joined}`);

        // if (this.state.joined) {
        //     this.props.socketService.emit('join-game', this.state.name);
        //     this.props.onJoined();
        // }
    }

    public render() {
        return (
            <div id="cac" className="bg-light">
                <div className="join">
                    <h3>Welcome to Cities and Casles!</h3>
                    <div className="lead mb-3">Join the fray by entering your name and clicking the button</div>
                    <input className="form-control mb-3" type="text" value={this.state.name} onKeyUp={this.onKeyUp} onChange={this.onChange} placeholder="Enter your name" />
                    <button className="btn btn-primary" onClick={this.joinGame}>Join</button>
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
        localStorage.setItem('cac-name', this.state.name);
        localStorage.setItem('cac-joined', 'true');
        this.props.joinGame();
    }


}