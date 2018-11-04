import * as React from 'react';

import { PhaseTypes, WesketchEventTypes } from './Types';
import { IWesketchGameSettings, IWesketchGameState } from './Interfaces';

import { auth } from '../../Common/AuthService';
import { WesketchSocket } from './WesketchSocket';

interface IProps {
    gameSettings: IWesketchGameSettings;
    gameState: IWesketchGameState;
    wss: WesketchSocket;

    setLanguage: (language: number) => void;
    toggleDifficulty: (difficulty: number) => void;
}

export class Lobby extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
        this.onFieldValueChange = this.onFieldValueChange.bind(this);
    }

    public render() {
        const { gameSettings, gameState } = this.props;
        const me = gameState.players.find(p => p.userId === auth.currentUser().guid);
        const isReady = me !== undefined && me.isReady ? true : false;

        return (
            <div id="phase-lobby">
                <div className="welcome-text">
                    <h1>Welcome to Wesketch <sup>NT</sup></h1>
                    <p className="lead">Press I'm Ready to start the game</p>
                    <ul>
                        <li>Players draw three words each</li>
                        <li>First correct guess awards 10 points</li>
                        <li>Consecutive correct guesses awards 10 - [numberOfPlayersAlreadyGuessedCorrect] points</li>
                        <li>Drawing player also gets points when players guess correct. 10 for the first player, and 1 for the others</li>
                        <li>Drawing player may choose to give up to 3 hints. Each hints subtracts 3 points from the first guess reward (10, 7, 4, 1).</li>
                    </ul>

                    <div className="lobby-ready-check mx-auto">
                        <button className="btn btn-dark im-ready"
                            onClick={this.togglePlayerReady}>
                            {isReady ? <span className="fa fa-check-square" /> : <span className="fa fa-square" />}
                            <span className="ml-2">I'm ready!</span>
                        </button>
                    </div>

                </div>
                <div className="game-rules">
                    <h2>Game Settings</h2>

                    <div className="form-group">
                        <h4>Language</h4>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="rEnglish" name="rEnglish" className="custom-control-input"
                                checked={gameSettings.language === 1}
                                onClick={() => this.props.setLanguage(1)} />
                            <label className="custom-control-label" htmlFor="rEnglish">English</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" id="rNorwegian" name="rNorwegian" className="custom-control-input"
                                checked={gameSettings.language === 2}
                                onClick={() => this.props.setLanguage(2)} />
                            <label className="custom-control-label" htmlFor="rNorwegian">Norwegian</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <h4>Difficulty</h4>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" className="custom-control-input" id="cbEasy"
                                checked={gameSettings.difficulties.includes(1)}
                                onClick={() => this.props.toggleDifficulty(1)} />
                            <label className="custom-control-label" htmlFor="cbEasy">Easy</label>
                        </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" className="custom-control-input" id="cbNormal"
                                checked={gameSettings.difficulties.includes(2)}
                                onClick={() => this.props.toggleDifficulty(2)} />
                            <label className="custom-control-label" htmlFor="cbNormal">Normal</label>
                        </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" className="custom-control-input" id="cbHard"
                                checked={gameSettings.difficulties.includes(3)}
                                onClick={() => this.props.toggleDifficulty(3)} />
                            <label className="custom-control-label" htmlFor="cbHard">Hard</label>
                        </div>
                    </div>

                    <div>
                        <h4>Words: {gameSettings.wordCount}</h4>
                    </div>

                </div>
            </div>
        );
    }

    private onFieldValueChange(fieldName: string, value: string) {
        const nextState = {
            ...this.state,
            [fieldName]: value
        };
        this.setState(nextState);
    }

    private togglePlayerReady = () => {
        const { gameState } = this.props;
        const player = gameState.players.find(p => p.userId === auth.currentUser().guid);

        if (player !== undefined
            && gameState.phase === PhaseTypes.Lobby
            && !gameState.players.every(p => p.isReady)) {
            this.props.wss.emit(WesketchEventTypes.PlayerReady, player);
        }
    }
}