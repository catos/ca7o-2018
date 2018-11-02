import 'isomorphic-fetch';
import * as React from "react";

import './Wesketch.css';
import { IPlayer } from "./IPlayer";
import { PhaseTypes } from "./PhaseTypes";

import { auth } from '../../Common/AuthService';
import { WesketchSocket, WesketchEventType, IWesketchEvent } from './WesketchSocket';
import { WesketchSoundManager } from './WesketchSoundManager';

import { Chat } from './Chat';
import { Lobby } from './Lobby';
import { Painter } from './Painter';
import { Debug } from "./Debug";
import { InfoBar } from './InfoBar';
// TODO: GameEnd
// import { GameEnd } from './GameEnd';
import { Drawings } from './Drawings';

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
    wss: WesketchSocket;
    gameState: IWesketchGameState;
}

export class Wesketch extends React.Component<{}, IState> {

    constructor(props: any, state: IState) {
        super(props, state);

        this.state = {
            wsm: new WesketchSoundManager(),
            wss: new WesketchSocket(),
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
        const { wss } = this.state;

        const user = auth.currentUser();
        const event = {
            clientId: wss.socketId,
            userId: user.guid,
            userName: user.name,
            timestamp: new Date()
        } as IWesketchEvent;
        wss.emit(WesketchEventType.PlayerJoined, event);

        // Watch events
        wss.on('event', this.onEvent);
    }

    public componentWillUnmount() {
        const { wss } = this.state;

        const user = auth.currentUser();
        const event = {
            clientId: wss.socketId,
            userId: user.guid,
            userName: user.name,
            timestamp: new Date()
        } as IWesketchEvent;
        wss.emit(WesketchEventType.PlayerLeft, event);
        wss.disconnect();
    }

    public render() {
        const { gameState, wss } = this.state;

        const mainWindow = {                
            Lobby: <Lobby gameState={gameState} wss={wss} />,
            Drawing: <Painter gameState={gameState} wss={wss} />,
            RoundEnd: <Painter gameState={gameState} wss={wss} />,
            GameEnd: <Drawings wss={wss} />
        };

        return (
            <div id="wesketch" className={ 'no-select' + (gameState.debugMode ? 'debug-mode' : '')}>
                {mainWindow[PhaseTypes[gameState.phase]]}                
                <InfoBar gameState={gameState} wss={wss} />
                <Chat gameState={gameState} wss={wss} />
                <Debug gameState={gameState} events={wss.events} />
            </div>
        );
    }

    private onEvent = (event: IWesketchEvent) => {        
        const { wsm } = this.state;
        const muteSounds = true;

        if (event.type === WesketchEventType.UpdateGameState) {
            this.setState({
                gameState: event.value
            });
        }

        if (event.type === WesketchEventType.PlaySound && !muteSounds) {
            const volume = !event.value.global &&
                event.value.userId === auth.currentUser().guid && event.value
                ? -1
                : 0.25;
            wsm.play(event.value.name, volume);
        }

        if (event.type === WesketchEventType.StopSound) {
            wsm.fade();
        }
    }
}