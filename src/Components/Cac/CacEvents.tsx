import * as React from 'react';
import { SocketClientService, ISocketEvent } from '../../Common/SocketClientService';

interface IProps {
    socketService: SocketClientService;
}

interface IState {
    events: ISocketEvent[]
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
        this.props.socketService.eventHandlers.push({ eventType: '*', handle: this.onEvent });
    }

    public render() {
        return (
            <div className="events">
                <h3>Events ({this.state.events.length})</h3>
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>SocketId</th>
                            <th>Timestamp</th>
                            <th>Type</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.events.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10).map((e, idx) =>
                            <tr key={idx}>
                                <td>{e.socketId}</td>
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

    private onEvent = (event: ISocketEvent) => {
        const events = [...this.state.events];
        if (event.type !== 'update-game-state') {
            events.push(event);
        }
        this.setState({ events });
    }
}
