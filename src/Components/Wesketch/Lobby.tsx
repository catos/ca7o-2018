import * as React from 'react';
import { WesketchService, WesketchEventType } from './WesketchService';
import { IWesketchGameState } from './Wesketch';
import { PhaseTypes } from './PhaseTypes';
import { auth } from '../../Common/AuthService';

interface IProps {
    gameState: IWesketchGameState;
    wss: WesketchService;
}

interface IState {
    wordList: string;
    rounds: string;
    duration: string;
}

export class Lobby extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            wordList: '',
            rounds: '3',
            duration: '90'
        };

        this.onFieldValueChange = this.onFieldValueChange.bind(this);
    }

    public render() {
        // const options: IOptions[] = [
        //     { text: 'Hard english is hard', value: '1', selected: false },
        //     { text: 'Intermediate english', value: '2', selected: false },
        //     { text: 'English for children and drunks!', value: '3', selected: false }
        // ];
        const { gameState } = this.props;
        const me = gameState.players.find(p => p.userId === auth.currentUser().guid);
        const isReady = me !== undefined && me.isReady ? true : false;

        return (
            <div id="phase-lobby">
                <h1>Welcome to Wesketch <sup>NT</sup></h1>
                <p className="lead">Press I'm Ready to start the game</p>
                <ul>
                    <li>Players draw three words each</li>
                    <li>First correct guess awards 10 points</li>
                    <li>Consecutive correct guesses awards 10 - [numberOfPlayersAlreadyGuessedCorrect] points</li>
                    <li>Drawing player also gets points when players guess correct. 10 for the first player, and 1 for the others</li>
                    <li>Drawing player may choose to give up to 3 hints. Each hints subtracts 3 points from the first guess reward (10, 7, 4, 1).</li>
                </ul>
                <div className="lobby-ready-check">
                    <button className="btn btn-dark im-ready"
                        onClick={this.togglePlayerReady}>
                        {isReady ? <span className="fa fa-check-square" /> : <span className="fa fa-square" />}
                        <span className="ml-2">I'm ready!</span>
                    </button>
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
            this.props.wss.emit(WesketchEventType.PlayerReady, player);
        }
    }

}