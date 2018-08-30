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
import { GameEnd } from './GameEnd';

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

        const mainWindow = {
            Lobby: <Lobby gameState={gameState} wss={wss} />,
            Drawing: <Painter gameState={gameState} wss={wss} />,
            RoundEnd: <Painter gameState={gameState} wss={wss} />,
            GameEnd: <GameEnd gameState={gameState} wss={wss} />
        };

        return (
            <div id="wesketch" className={gameState.debugMode ? 'debug-mode' : ''}>

                {/* {gameState.phase === PhaseTypes.Lobby
                    ? <Lobby gameState={gameState} wss={wss} />
                    : <Painter gameState={gameState} wss={wss} />} */}
                {mainWindow[PhaseTypes[gameState.phase]]}

                <InfoBar gameState={gameState} wss={wss} toggleGameEnd={this.toggleGameEnd} />
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

    private toggleGameEnd = () => {
        const players: IPlayer[] = [
            { clientId: '9c1ea836-1f8c-4774-aab3-7a770d6a58ec', userId: '1', name: 'Test Testerson', isReady: false, score: 56, drawCount: 3, isDrawing: false, guessedWord: false },
            { clientId: 'f0cc3457-1e00-416b-a785-a8bd921c25a6', userId: '2', name: 'Cato Skogholt', isReady: false, score: 73, drawCount: 3, isDrawing: false, guessedWord: false },
            { clientId: 'f0cc3457-1e00-416b-a785-a8bd921c25a5', userId: '3', name: 'Turd Furgeson', isReady: false, score: 51, drawCount: 3, isDrawing: false, guessedWord: false },
            { clientId: 'f0cc3457-1e00-416b-a785-a8bd921c25a4', userId: '4', name: 'Jack Daniels', isReady: false, score: 85, drawCount: 3, isDrawing: false, guessedWord: false },
            { clientId: 'f0cc3457-1e00-416b-a785-a8bd921c25a3', userId: '5', name: 'Niels Armstrogn', isReady: false, score: 116, drawCount: 3, isDrawing: false, guessedWord: false },
            { clientId: 'f0cc3457-1e00-416b-a785-a8bd921c25a1', userId: '6', name: 'Bjarte Tjøstheim', isReady: false, score: 19, drawCount: 3, isDrawing: false, guessedWord: false }
        ];

        const gameState: IWesketchGameState = {
            debugMode: false,
            phase: PhaseTypes.GameEnd,
            players,
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
        };

        this.setState({
            gameState
        });

        this.state.wss.emit(WesketchEventType.UpdateGameState, gameState);

        console.log('toggleGameEnd');        
    }
}