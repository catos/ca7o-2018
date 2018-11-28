import * as React from 'react';
import { CacSocket, ICacEvent } from './CacSocket';

// interface IGameState {
//     stopGame: boolean;
//     now: number;
//     dt: number;
//     dtAcc: number;
//     last: number;
//     step: number;
//     ticks: number;
//     // players: IPlayer[],
//     log: string[]
// }

interface IState {
    cs: CacSocket;
}

export class Cac extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            cs: new CacSocket()
        };


    }

    public componentDidMount() {
        // Watch events
        this.state.cs.on('event', this.onEvent);
    }

    public componentWillUnmount() {
        this.state.cs.disconnect();
    }

    public render () {
        return (
            <div>
                <h3>Cac!</h3>
                <button className="btn btn-primary" onClick={this.test}>Click</button>
            </div>
        );
    }

    private onEvent = (event: ICacEvent) => {
        console.log(`onEvent - type: ${event.type}`);
        
    }

    private test = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('test click!');
        this.state.cs.emit('click', { foo: 'bar' });
    }
}
