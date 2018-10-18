import * as React from 'react';

import { api } from '../../../Common/ApiService';
import './Words.css';

export interface IWesketchWord {
    guid: string;
    created: number;
    word: string;
    description: string;
    difficulty: DifficultyTypes;
    language: LanguageTypes;
}

export enum DifficultyTypes {
    NotSet = 0,
    Easy = 1,
    Normal = 2,
    Hard = 3
}

export enum LanguageTypes {
    NotSet = 0,
    English = 1,
    Norwegian = 2
}

interface IState {
    words: IWesketchWord[];
}

export class WordsList extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            words: []
        };
    }

    public componentDidMount() {
        api.get('/api/wesketch/words')
            .then(response => {
                this.setState({
                    words: response as IWesketchWord[]
                })
            })
            .catch(error => console.log(error));
    }

    public render() {
        return (
            <div className="word-list">
                {this.state.words.map((word, idx) =>
                    <div key={idx} className="word" title={word.word + ': ' + word.description}>
                        {word.word}
                    </div>
                )}
            </div>
        );
    }
}