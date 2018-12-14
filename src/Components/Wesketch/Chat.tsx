import * as React from 'react';

import { PhaseTypes, WesketchEventTypes } from './Types';
import { IWesketchEvent, IWesketchGameState, IWesketchPlayer } from './Interfaces';

import { snip } from '../../Common/Utils';
import { auth } from '../../Common/AuthService';
import { WesketchSocket } from './WesketchSocket';
import { ChatMessage } from './ChatMessage';

interface IProps {
    wss: WesketchSocket;
    gameState: IWesketchGameState;
}

interface IState {
    messageEvents: IWesketchEvent[];
    previousMessage: string;
    currentMessage: string;
}

export class Chat extends React.Component<IProps, IState> {
    private messageInputEl: any;
    private messagesEl: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            messageEvents: [],
            previousMessage: '',
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
        const { players } = this.props.gameState;
        const sortedPlayers = players.sort((a: IWesketchPlayer, b: IWesketchPlayer) => {
            return a.score > b.score ? -1 : b.score > a.score ? 1 : 0;
        });

        return (
            <div id="chat">
                <div className="players-wrapper">
                    <div className="players">
                        {sortedPlayers.map((player, idx) =>
                            <div
                                key={idx}
                                className={'player' +
                                    (player.isReady ? ' player-ready' : '') +
                                    (player.guessedWord ? ' player-guessed-word' : '') +
                                    (player.isDrawing ? ' player-is-drawing' : '')
                                }
                                title={player.clientId + '' + player.userId}>

                                <div>{snip(player.name, 20)}</div>

                                <div className="player-score">
                                    {player.score}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="messages-wrapper">
                    <div className="messages border" ref={el => { this.messagesEl = el }}>
                        {this.state.messageEvents.map((event, idx) =>
                            <ChatMessage key={idx} event={event} />
                        )}
                    </div>
                    <form onSubmit={this.onSubmit} autoComplete="off">
                        <div className="input-group">
                            <input className="form-control" type="text"
                                name="current-message"
                                placeholder="Type your message here..."
                                ref={(el) => { this.messageInputEl = el }}
                                disabled={this.inputDisabled()}
                                value={this.state.currentMessage}
                                onChange={this.onChange}
                                onKeyDown={this.onKeyDown} />
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

        this.setState((prevState) => ({
            previousMessage: prevState.currentMessage,
            currentMessage: ''
        }));
        this.props.wss.emit(WesketchEventTypes.Message, { message: this.state.currentMessage });
    }

    private onEvent = (event: IWesketchEvent) => {
        if (event.type === WesketchEventTypes.Message ||
            event.type === WesketchEventTypes.SystemMessage) {

            const messageEvents = this.state.messageEvents;
            messageEvents.push(event);
            this.setState({ messageEvents });

            this.scrollDown();

            console.log(event.value.message);
            if (event.value.message.indexOf('started!') > -1) {
                this.focusField();
            }
        }
    }

    private onChange = (event: any) => {
        this.setState({
            currentMessage: event.target.value
        });
    }

    private onKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode === 38) {
            this.setState({
                currentMessage: this.state.previousMessage
            });
        }
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

    private inputDisabled = (): boolean => {
        const { gameState } = this.props;

        const me = gameState.players.find(p => p.userId === auth.currentUser().guid);
        if (me && gameState.phase === PhaseTypes.Drawing) {
            return me.isDrawing || me.guessedWord;
        }

        return false;
    }
}