import 'isomorphic-fetch';
import * as React from "react";

import './Wesketch.css';
import { IPlayer } from "./IPlayer";
import { PhaseTypes } from "./PhaseTypes";

import { auth } from '../../Common/AuthService';
import { WesketchService, WesketchEventType, IWesketchEvent } from './WesketchService';

import { Chat } from './Chat';
import { Painter } from './Painter';
import { Debug } from "./Debug";
import { InfoBar } from './InfoBar';
// import { Timer } from './Timer';

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
    wss: WesketchService;
    events: IWesketchEvent[];
    gameState: IWesketchGameState;
}

export class Wesketch extends React.Component<{}, IState> {

    constructor(props: any, state: IState) {
        super(props, state);

        this.state = {
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
        console.log('mount');
        
        const user = auth.currentUser();
        const event = {
            client: this.state.wss.socketId,
            userId: user.guid,
            userName: user.name,
            timestamp: new Date()
        } as IWesketchEvent;
        this.state.wss.emit(WesketchEventType.PlayerJoined, event);
        console.log('WesketchEventType.PlayerJoined sent');
        

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
        const { gameState } = this.state;
        return (
            <div id="wesketch" className={this.state.gameState.debugMode ? 'debug-mode' : ''}>
                {/* <Timer phase={gameState.phase} timer={gameState.timer} /> */}
                <Painter gameState={gameState} wss={this.state.wss} />
                <InfoBar gameState={gameState} wss={this.state.wss} />
                <Chat gameState={gameState} wss={this.state.wss} />
                <Debug gameState={gameState} events={this.state.events} />
            </div>
        );
    }

    private onEvent = (event: IWesketchEvent) => {
        if (event.type === WesketchEventType.UpdateGameState) {
            this.setState({
                gameState: event.value
            });
        }

        const events = this.state.events;
        events.push(event);
        this.setState({
            events
        })
    }
}