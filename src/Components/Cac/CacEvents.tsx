import * as React from 'react';
import { CacSocket, ICacEvent } from './CacSocket';

interface IProps {
    cs: CacSocket
}

interface IState {
    events: ICacEvent[]
}

export class CacEvents extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            events: []
        };
    }

    public componentDidMount() {
        // Watch events
        this.props.cs.on('event', this.onEvent);
    }

    public render() {
        return (
            <div className="events">
                <h3>Events ({this.state.events.length})</h3>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>SocketId</th>
                            <th>Name</th>
                            <th>Timestamp</th>
                            <th>Type</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10).map((e, idx) =>
                            <tr key={idx}>
                                <td>{e.socketId}</td>
                                <td>{e.name}</td>
                                <td>{e.timestamp}</td>
                                <td>{e.type}</td>
                                <td>{JSON.stringify(e.value)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    private onEvent = (event: ICacEvent) => {
        const events = [...this.state.events];
        if (event.type !== 'UpdateGameState') {
            events.push(event);
        }
        this.setState({ events });
    }
}
