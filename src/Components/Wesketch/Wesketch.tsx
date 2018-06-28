import 'isomorphic-fetch';
import * as React from "react";

import { auth } from 'src/Services/AuthService';
import { wss, WesketchEventType, IWesketchEvent } from 'src/Services/WebsocketService';

import { Chat } from './Chat';
import { Painter } from './Painter';

interface IWesketchState {
    players: string[];
}

export class Wesketch extends React.Component<{}, IWesketchState> {

    constructor(props: any, state: IWesketchState) {
        super(props, state);

        this.state = {
            players: []
        };
    }

    public componentDidMount() {
        wss.on('event', this.onEvent);
        
        wss.emit(WesketchEventType.PlayerJoined, {
            player: auth.currentUser().name
        });
    }

    public render() {
        return (
            <div>
                <h1>Wesketch!</h1>

                <Chat players={this.state.players} />
                <Painter />
            </div>
        );
    }

    private onEvent = (event: IWesketchEvent) => {
        if (event.type === WesketchEventType.PlayerJoined) {
            const players = this.state.players;
            players.push(event.value.player)
            this.setState({
                players
            })
        }
        console.log('Wesketch:', event);
    }
}