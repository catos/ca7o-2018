import * as React from 'react';
import * as moment from 'moment';

import { IWesketchEvent, WesketchEventType } from './WesketchService';

interface IChatMessageProps {
    event: IWesketchEvent
}

export const ChatMessage: React.SFC<IChatMessageProps> = (props) => {
    return (
        <div className={ props.event.type === WesketchEventType.SystemMessage ? 'system-message' : '' }>
            <small>{moment(props.event.timestamp).format('HH:mm:ss')}</small>
            <strong> {props.event.userName}: </strong>
            {props.event.value.message}
        </div>
    );
}