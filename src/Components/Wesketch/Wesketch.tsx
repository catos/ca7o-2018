import 'isomorphic-fetch';
import * as React from "react";

import './Wesketch.css';
import { PhaseTypes, WesketchEventTypes } from './Types';
import { IWesketchGameSettings, IWesketchGameState, IWesketchEvent } from './Interfaces';

import { auth } from '../../Common/AuthService';
import { WesketchSocket } from './WesketchSocket';
import { WesketchSoundManager } from './WesketchSoundManager';

import { Chat } from './Chat';
import { Lobby } from './Lobby';
import { Painter } from './Painter/Painter';
import { Debug } from "./Debug";
import { InfoBar } from './InfoBar';
import { Drawings } from './Drawings';

// TODO: GameEnd
// import { GameEnd } from './GameEnd';

interface IState {
    wsm: WesketchSoundManager;
    wss: WesketchSocket;
    gameSettings: IWesketchGameSettings;
    gameState: IWesketchGameState;
}

export class Wesketch extends React.Component<{}, IState> {

    constructor(props: any, state: IState) {
        super(props, state);

        this.state = {
            wsm: new WesketchSoundManager(),
            wss: new WesketchSocket(),
            gameSettings: {
                language: 1,
                difficulties: [2],
                wordCount: 0
            },
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

        // Player joined
        const user = auth.currentUser();
        const event = {
            clientId: wss.socketId,
            userId: user.guid,
            userName: user.name,
            timestamp: new Date()
        } as IWesketchEvent;
        wss.emit(WesketchEventTypes.PlayerJoined, event);

        // Send gamesettings
        wss.emit(WesketchEventTypes.UpdateGameSettings, this.state.gameSettings)

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
        wss.emit(WesketchEventTypes.PlayerLeft, event);
        wss.disconnect();
    }

    public render() {
        const { gameSettings, gameState, wss } = this.state;

        const mainWindow = {
            Lobby: <Lobby
                gameSettings={gameSettings}
                gameState={gameState}
                wss={wss}
                setLanguage={this.setLanguage}
                toggleDifficulty={this.toggleDifficulty} />,
            Drawing: <Painter gameState={gameState} wss={wss} />,
            RoundEnd: <Painter gameState={gameState} wss={wss} />,
            GameEnd: <Drawings wss={wss} />
        };

        return (
            <div id="wesketch" className={'no-select' + (gameState.debugMode ? 'debug-mode' : '')}>
                {mainWindow[PhaseTypes[gameState.phase]]}
                <InfoBar gameState={gameState} wss={wss} />
                <Chat gameState={gameState} wss={wss} />
                <Debug gameSettings={gameSettings} gameState={gameState} events={wss.events} />
            </div>
        );
    }

    // private setLanguage = (language: number) => {
    //     const gameSettings = { ...this.state.gameSettings };
    //     gameSettings.language = language;
    //     this.setState(
    //         { gameSettings },
    //         () => this.state.wss.emit(WesketchEventTypes.UpdateGameSettings, gameSettings));
    // }

    private setLanguage = (event: React.FormEvent<HTMLInputElement>) => {
        const gameSettings = { ...this.state.gameSettings };
        gameSettings.language = +event.currentTarget.value;
        this.setState(
            { gameSettings },
            () => this.state.wss.emit(WesketchEventTypes.UpdateGameSettings, gameSettings));
    }

    // private toggleDifficulty = (difficulty: number) => {
    private toggleDifficulty = (event: React.ChangeEvent<HTMLInputElement>) => {
        const difficulty = +event.currentTarget.value;
        console.log(`difficulty: ${difficulty}`);
        
        const gameSettings = { ...this.state.gameSettings };

        gameSettings.difficulties = gameSettings.difficulties.includes(difficulty)
            ? gameSettings.difficulties.filter(p => p !== difficulty)
            : gameSettings.difficulties.concat(difficulty);

        this.setState(
            { gameSettings },
            () => this.state.wss.emit(WesketchEventTypes.UpdateGameSettings, gameSettings));
    }

    private onEvent = (event: IWesketchEvent) => {
        const { wsm } = this.state;
        const muteSounds = true;

        if (event.type === WesketchEventTypes.UpdateGameSettings) {
            this.setState({
                gameSettings: event.value
            });
        }

        if (event.type === WesketchEventTypes.UpdateGameState) {
            this.setState({
                gameState: event.value
            });
        }

        if (event.type === WesketchEventTypes.PlaySound && !muteSounds) {
            const volume = !event.value.global &&
                event.value.userId === auth.currentUser().guid && event.value
                ? -1
                : 0.25;
            wsm.play(event.value.name, volume);
        }

        if (event.type === WesketchEventTypes.StopSound) {
            wsm.fade();
        }
    }
}