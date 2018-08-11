import * as React from 'react';
import { WesketchService } from './WesketchService';

interface IProps {
    wss: WesketchService;
}

interface IState {
    wordList: string;
    rounds: string;
    duration: string;
}

export class GameSettings extends React.Component<IProps, IState> {

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

        return (
            <div id="game-settings">
                <h1>Welcome to Wesketch <sup>2.0</sup></h1>
                <h4>Press the I'm ready button to start the game</h4>

                {/* <form onSubmit={this.onSubmit}>
                    <Select 
                        name="word-list" 
                        label="Select word list" 
                        options={options} 
                        onChange={this.onFieldValueChange} />
                    
                    <Input
                        name="rounds"
                        label="Rounds (per player)"
                        value={this.state.rounds}
                        onChange={this.onFieldValueChange} />
                    <Input
                        name="duration"
                        label="Duration (number of seconds you get to draw the word)"
                        value={this.state.duration}
                        onChange={this.onFieldValueChange} />
                </form> */}
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
    
}