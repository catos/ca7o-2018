import * as React from 'react';
import * as moment from 'moment';

import { WesketchEventType } from './Types/WesketchEventType';
import { IWesketchEvent } from './Interfaces/IWesketchEvent';

interface IProps {
    event: IWesketchEvent
}

export const ChatMessage: React.SFC<IProps> = (props) => {
    return (
        <div className={props.event.type === WesketchEventType.SystemMessage ? 'system-message' : ''}>
            <small>{moment(props.event.timestamp).format('HH:mm:ss')}</small>
            {props.event.type === WesketchEventType.SystemMessage
                ? ''
                : <strong> {props.event.userName}:</strong>}
            <span className="ml-1">{props.event.value.message}</span>
        </div>
    );
}