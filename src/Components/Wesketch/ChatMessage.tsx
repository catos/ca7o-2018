import * as React from 'react';
import * as moment from 'moment';

import { IWesketchEvent } from 'src/Services/WebsocketService';

interface IChatMessageProps {
    event: IWesketchEvent
}

export const ChatMessage: React.SFC<IChatMessageProps> = (props) => {
    return (
        <div>
            <small>{moment(props.event.timestamp).format('HH:mm:ss')}</small>
            <strong> {props.event.value.sender}: </strong>
            {props.event.value.message}
        </div>
    );
}