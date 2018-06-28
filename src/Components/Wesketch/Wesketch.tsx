import { PhaseTypes } from "./PhaseTypes";

import { IPlayer } from "./IPlayer";

import 'isomorphic-fetch';
import * as React from "react";

import { wss, WesketchEventType, IWesketchEvent } from 'src/Services/WebsocketService';

import { Chat } from './Chat';
import { Painter } from './Painter';


interface IWesketchState {
    phase: PhaseTypes,
    players: IPlayer[],
}

export class Wesketch extends React.Component<{}, IWesketchState> {

    constructor(props: any, state: IWesketchState) {
        super(props, state);

        this.state = {
            phase: PhaseTypes.Lobby,
            players: []
        };
    }

    public componentDidMount() {
        wss.on('event', this.onEvent);
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
        if (event.type === WesketchEventType.UpdateGameState) {            
            this.setState({
                phase: event.value.phase,
                players: event.value.players
            })
        }
        console.log('Wesketch:', event);
    }
}