import 'isomorphic-fetch';
import * as React from "react";

import './Wesketch.css';
import { IPlayer } from "./IPlayer";
import { PhaseTypes } from "./PhaseTypes";

import { WesketchService, WesketchEventType, IWesketchEvent } from './WesketchService';

import { Chat } from './Chat';
import { Painter } from './Painter';
import { Debug } from "./Debug";
import { InfoBar } from './InfoBar';

export interface IWesketchGameState {
    phase: PhaseTypes;
    players: IPlayer[];
}

interface IWesketchState {
    wss: WesketchService;
    events: IWesketchEvent[];
    gameState: IWesketchGameState;
}

export class Wesketch extends React.Component<{}, IWesketchState> {

    constructor(props: any, state: IWesketchState) {
        super(props, state);

        this.state = {
            wss: new WesketchService(),
            events: [],
            gameState: {
                phase: PhaseTypes.Lobby,
                players: []
            }
        };
    }

    public componentDidMount() {
        this.state.wss.on('event', this.onEvent)
    }

    public componentWillUnmount() {
        this.state.wss.emit(WesketchEventType.PlayerLeft, {});
    }

    public render() {
        const { gameState } = this.state;
        return (
            <div id="wesketch">
                <div className="container">
                    <InfoBar gameState={gameState} />
                </div>
                <div className="container">
                    <Chat players={gameState.players} wss={this.state.wss} />
                    <Painter wss={this.state.wss} />
                </div>

                <div className="container">
                    <Debug gameState={gameState} events={this.state.events} />
                </div>
            </div>
        );
    }

    private onEvent = (event: IWesketchEvent) => {
        if (event.type === WesketchEventType.UpdateGameState) {
            this.setState({
                gameState: event.value
            })
        }

        const events = this.state.events;
        events.push(event);
        this.setState({
            events
        })
    }
}