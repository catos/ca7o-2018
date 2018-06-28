import * as React from 'react';
import * as moment from 'moment';

import { IMessage } from 'src/Components/Wesketch/Chat';

interface IChatMessageProps {
    message: IMessage
}

export const ChatMessage: React.SFC<IChatMessageProps> = (props) => {
    return (
        <div>
            <small>{moment(props.message.date).format('HH:mm:ss')}</small>
            <strong> {props.message.sender}: </strong>
            {props.message.message}
        </div>
    );
}