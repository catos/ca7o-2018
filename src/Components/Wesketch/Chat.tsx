import * as React from 'react';


import { auth } from 'src/Services/AuthService';
import { WesketchService, WesketchEventType, IWesketchEvent } from './WesketchService';
import { ChatMessage } from './ChatMessage';
import { IPlayer } from './IPlayer';

interface IChatProps {
    wss: WesketchService;
    players: IPlayer[];
}

interface IChatState {
    messageEvents: IWesketchEvent[];
    currentMessage: string;
}

export class Chat extends React.Component<IChatProps, IChatState> {
    private messageInputEl: any;
    private messagesEl: any;

    constructor(props: IChatProps) {
        super(props);

        this.state = {
            messageEvents: [],
            currentMessage: ''
        }
    }

    public componentDidMount() {
        this.focusField();
        this.props.wss.on('event', this.onEvent);
    }

    public render() {
        return (
            <div id="chat">
                <div className="row">
                    <div className="col-4">
                        <h3>Players: </h3>
                        {this.props.players.map((player, idx) =>
                            <div key={idx} title={`${player.clientId} - ${player.userId}`}>{player.name}</div>
                        )}
                    </div>
                    <div className="col-8">
                        <div className="messages border" ref={el => { this.messagesEl = el }}>
                            {this.state.messageEvents.map((event, idx) =>
                                <ChatMessage key={idx} event={event}/>
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

        this.props.wss.emit(WesketchEventType.Message, {
            sender: auth.currentUser().name,
            message: this.state.currentMessage
        });
    }

    private onEvent = (event: IWesketchEvent) => {
        if (event.type === WesketchEventType.Message ||
            event.type === WesketchEventType.SystemMessage) {

            // const from = event.value.sender || 'system'
            // const messageText = event.value.message
            //     || WesketchEventType[event.type]
            //     || '';

            // const message = {
            //     sender: from,
            //     message: messageText
            // } as IMessage

            const messageEvents = this.state.messageEvents;
            messageEvents.push(event);
            this.setState({
                messageEvents,
                currentMessage: ''
            });
            
            this.scrollDown();
        }
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