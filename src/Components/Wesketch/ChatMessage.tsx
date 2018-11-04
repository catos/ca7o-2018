import * as React from 'react';
import * as moment from 'moment';

import { WesketchEventTypes } from './Types';
import { IWesketchEvent } from './Interfaces';

interface IProps {
    event: IWesketchEvent
}

export const ChatMessage: React.SFC<IProps> = (props) => {
    return (
        <div className={props.event.type === WesketchEventTypes.SystemMessage ? 'system-message' : ''}>
            <small>{moment(props.event.timestamp).format('HH:mm:ss')}</small>
            {props.event.type === WesketchEventTypes.SystemMessage
                ? ''
                : <strong> {props.event.userName}:</strong>}
            <span className="ml-1">{props.event.value.message}</span>
        </div>
    );
}