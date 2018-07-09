import * as React from 'react';


import { IPlayer } from './IPlayer';
import { WesketchService, WesketchEventType, IWesketchEvent } from './WesketchService';
import { avatarUrl } from '../../Common/Utils';
import { ChatMessage } from './ChatMessage';

interface IProps {
    wss: WesketchService;
    players: IPlayer[];
}

interface IState {
    messageEvents: IWesketchEvent[];
    currentMessage: string;
}

export class Chat extends React.Component<IProps, IState> {
    private messageInputEl: any;
    private messagesEl: any;

    constructor(props: IProps) {
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

    public componentWillUnmount() {
        this.messageInputEl = null;
        this.messagesEl = null;
    }

    public render() {
        return (
            <div id="chat">
                <div className="players">
                    {this.props.players.map((player, idx) =>
                        <div
                            key={idx}
                            className={ 'player' + (player.isReady ? ' player-ready' : '')}
                            title={player.clientId + '' + player.userId}
                            onClick={() => this.togglePlayerReady(player)}>
                            
                            <img src={avatarUrl(player.name)} />

                            <div className="player-score">
                                {player.score}
                            </div>
                        </div>
                    )}
                </div>
                <div className="messages-and-form">
                    <div className="messages border" ref={el => { this.messagesEl = el }}>
                        {this.state.messageEvents.map((event, idx) =>
                            <ChatMessage key={idx} event={event} />
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
        );
    }

    private onSubmit = (event: any) => {
        event.preventDefault();

        if (this.state.currentMessage.length === 0) {
            return;
        }

        this.props.wss.emit(WesketchEventType.Message, { message: this.state.currentMessage });
    }

    private onEvent = (event: IWesketchEvent) => {
        if (event.type === WesketchEventType.Message ||
            event.type === WesketchEventType.SystemMessage) {

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
        if (this.messagesEl !== null) {
            this.messageInputEl.focus();
        }
    }

    private scrollDown() {
        if (this.messagesEl !== null) {
            this.messagesEl.scrollTop = this.messagesEl.scrollHeight - this.messagesEl.clientHeight;
        }
    }

    private togglePlayerReady(player: IPlayer) {
        this.props.wss.emit(WesketchEventType.PlayerReady, player);
    }
}