import * as React from 'react';
import * as moment from 'moment';

import { IWesketchGameState } from './Wesketch';
import { IWesketchEvent, WesketchEventType } from './WesketchService';

interface IDebugProps {
    gameState: IWesketchGameState;
    events: IWesketchEvent[];
}

export const Debug: React.SFC<IDebugProps> = (props) => {
    return (
        <div>
            <div className="debug-info">
                <small>gameState:</small><br />
                {JSON.stringify(props.gameState, undefined, 2)}
            </div>
            <div className="debug-events">
                <small>Events from server:</small><br />
                <table className="table table-bordered table-sm">
                    <tbody>
                        {props.events.slice(Math.max(props.events.length - 5, 1)).map((event, idx) =>
                            <tr key={idx}>
                                <td>{moment(event.timestamp).format('HH:mm:ss')}</td>
                                <td>{WesketchEventType[event.type]}</td>
                                <td>{JSON.stringify(event.value, undefined, 2)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}