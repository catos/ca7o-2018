import * as React from 'react';

import { api } from '../../../Common/ApiService';
import { WordFilters } from './WordFilters';

import './Words.css';

export interface IWord {
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
    filters: string;
    currentWord: IWord | null;
    words: IWord[];
}

export class WordsList extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            filters: '',
            currentWord: null,
            words: []
        };
    }

    public componentDidMount() {
        this.getWords();
    }

    public render() {
        return (
            <div id="word-list">
                <WordFilters onChange={this.getWords} />

                {/* <WordDetails word={currentWord} /> */}

                {/* <div>{currentWord.word}</div> */}

                <div>Words: {this.state.words.length}</div>
                <div className="result">
                    {this.state.words.map((word, idx) =>
                        <div key={idx} className={this.wordClasses(word)} title={word.word + ': ' + word.description}
                            onClick={() => this.selectWord(word)}>
                            {word.word}

                            <span className="language">{LanguageTypes[word.language].substring(0, 2)}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    private getWords = (filters?: string) => {
        // api.get(`/api/wesketch/words?q=${this.state.q}&difficulties=${this.state.difficulties}&languages=${this.state.languages}`)
        const url = filters !== undefined
            ? `/api/wesketch/words${filters}`
            : '/api/wesketch/words';

        console.log('url: ' + url);


        api.get(url)
            .then(response => {
                this.setState({
                    words: response as IWord[]
                })
            })
            .catch(error => console.log(error));
    }

    private selectWord = (word: IWord) => {
        console.log('selectWord: ', word);

        this.setState({ currentWord: word });
    }

    private wordClasses = (word: IWord) => {
        let result = 'word border';

        switch (word.difficulty) {
            case DifficultyTypes.Easy: result += ' border-success'; break;
            case DifficultyTypes.Normal: result += ' border-dark'; break;
            case DifficultyTypes.Hard: result += ' border-warning'; break;
            default: result += ' border-danger'; break;
        }

        return result;
    }
}