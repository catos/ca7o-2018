import 'isomorphic-fetch';
import * as React from "react";

import './Wesketch.css';
import { IPlayer } from "./IPlayer";
import { PhaseTypes } from "./PhaseTypes";

import { auth } from '../../Common/AuthService';
import { WesketchService, WesketchEventType, IWesketchEvent } from './WesketchService';
import { WesketchSoundManager } from './WesketchSoundManager';

import { Chat } from './Chat';
import { Lobby } from './Lobby';
import { Painter } from './Painter';
import { Debug } from "./Debug";
import { InfoBar } from './InfoBar';

export interface ITimer {
    remaining: number;
    duration: number;
}

export interface IWesketchGameState {
    debugMode: boolean;
    phase: PhaseTypes;
    players: IPlayer[];

    stop: boolean;
    round: number;
    timer: ITimer;
    currentWord: string;
    hintsGiven: number;

    primaryColor: string;
    secondaryColor: string;
    brushSize: number;
}

interface IState {
    wsm: WesketchSoundManager;
    wss: WesketchService;
    events: IWesketchEvent[];
    gameState: IWesketchGameState;
}

export class Wesketch extends React.Component<{}, IState> {

    constructor(props: any, state: IState) {
        super(props, state);

        this.state = {
            wsm: new WesketchSoundManager(),
            wss: new WesketchService(),
            events: [],
            gameState: {
                debugMode: false,
                phase: PhaseTypes.Lobby,
                players: [],
                stop: false,
                round: 1,
                timer: {
                    remaining: 0,
                    duration: 0
                },
                currentWord: '',
                hintsGiven: 0,
                primaryColor: '#000000',
                secondaryColor: '#ffffff',
                brushSize: 3
            }
        };
    }

    public componentDidMount() {
        const user = auth.currentUser();
        const event = {
            client: this.state.wss.socketId,
            userId: user.guid,
            userName: user.name,
            timestamp: new Date()
        } as IWesketchEvent;
        this.state.wss.emit(WesketchEventType.PlayerJoined, event);
        console.log('WesketchEventType.PlayerJoined sent');

        // Watch events
        this.state.wss.on('event', this.onEvent);
    }

    public componentWillUnmount() {
        console.log('unmount');

        const user = auth.currentUser();
        const event = {
            client: this.state.wss.socketId,
            userId: user.guid,
            userName: user.name,
            timestamp: new Date()
        } as IWesketchEvent;
        this.state.wss.emit(WesketchEventType.PlayerLeft, event);
        this.state.wss.disconnect();
    }

    public render() {
        const { events, gameState, wss } = this.state;
        return (
            <div id="wesketch" className={gameState.debugMode ? 'debug-mode' : ''}>

                {gameState.phase === PhaseTypes.Lobby
                    ? <Lobby gameState={gameState} wss={wss} />
                    : <Painter gameState={gameState} wss={wss} />}

                <InfoBar gameState={gameState} wss={wss} />
                <Chat gameState={gameState} wss={wss} />
                <Debug gameState={gameState} events={events} />
            </div>
        );
    }

    private onEvent = (event: IWesketchEvent) => {
        const { wsm } = this.state;

        if (event.type === WesketchEventType.UpdateGameState) {
            this.setState({
                gameState: event.value
            });
        }

        if (event.type === WesketchEventType.PlaySound) {
            const volume = !event.value.global &&
                event.value.userId === auth.currentUser().guid && event.value
                ? -1
                : 0.25;
            wsm.play(event.value.name, volume);
        }

        if (event.type === WesketchEventType.StopSound) {
            wsm.fade();
        }

        const events = this.state.events;
        events.push(event);
        this.setState({
            events
        });
    }
}