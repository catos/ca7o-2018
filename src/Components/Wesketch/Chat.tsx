import * as React from 'react';
// import * as moment from 'moment';

import './Wesketch.css';

import { auth } from 'src/Services/AuthService';
import { wss, WesketchEventType, IWesketchEvent } from 'src/Services/WebsocketService';
import { ChatMessage } from './ChatMessage';

export interface IMessage {
    senderId: string;
    sender: string;
    message: string;
    date: Date;
}

interface IChatProps {
    players: string[];
}

interface IChatState {
    messages: IMessage[];
    currentMessage: string;
}

export class Chat extends React.Component<IChatProps, IChatState> {
    private messageInputEl: any;
    private messagesEl: any;

    constructor(props: IChatProps) {
        super(props);

        this.state = {
            messages: [],
            currentMessage: ''
        }
    }

    public componentDidMount() {
        this.focusField();
        wss.on('event', this.onEvent);
    }

    public render() {
        return (
            <div id="chat">
                <div className="row">
                    <div className="col-4">
                        <h3>Players: </h3>
                        {this.props.players.map((player, idx) =>
                            <div key={idx}>{player}</div>
                        )}
                    </div>
                    <div className="col-8">
                        <div className="messages border" ref={el => { this.messagesEl = el }}>
                            {this.state.messages.map((message, idx) =>
                                <ChatMessage key={idx} message={message}/>
                            )}
                        </div>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className="input-group">
                                <input className="form-control" type="text" name="asdf" placeholder="Type your message here..."
                                    ref={(el) => { this.messageInputEl = el }}
                                    value={this.state.currentMessage}
                                    onChange={this.handleMessageChange} />
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-dark">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    private onSubmit = (event: any) => {
        event.preventDefault();

        if (this.state.currentMessage.length === 0) {
            return;
        }

        const msg = {
            senderId: auth.currentUser().guid,
            sender: auth.currentUser().name,
            message: this.state.currentMessage
        } as IMessage;

        wss.emit(WesketchEventType.Message, msg);
    }

    private onEvent = (event: IWesketchEvent) => {
        if (event.type === WesketchEventType.Message ||
            event.type === WesketchEventType.SystemMessage) {

            const from = event.value.sender || 'system'
            const messageText = event.value.message
                || WesketchEventType[event.type]
                || '';

            const message = {
                senderId: event.client,
                sender: from,
                message: messageText,
                date: event.timestamp
            } as IMessage

            const messages = this.state.messages;
            messages.push(message);
            this.setState({
                messages,
                currentMessage: ''
            });
            this.scrollDown();
        }

        console.log('Chat:', event);
    }

    private handleMessageChange = (event: any) => {
        this.setState({
            currentMessage: event.target.value
        })
    }

    private focusField() {
        this.messageInputEl.focus();
    }

    private scrollDown() {
        this.messagesEl.scrollTop = this.messagesEl.scrollHeight - this.messagesEl.clientHeight;
    }
}