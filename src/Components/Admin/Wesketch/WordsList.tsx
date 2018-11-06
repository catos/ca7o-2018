import * as React from 'react';
import * as moment from 'moment';

import { api } from '../../../Common/ApiService';
import { WordFilters } from './WordFilters';
import { WordForm } from './WordForm';

import './Words.css';

export interface IWord {
    guid?: string;
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

export interface IWordResult {
    count: number;
    totalPages: number;
    currentPage: number;
    take: number;
    words: IWord[];
}

interface IState {
    filters: string;
    currentWord: IWord | null;
    addWord: boolean;
    result: IWordResult
}

export class WordsList extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            filters: '',
            currentWord: null,
            addWord: false,
            result: {
                count: 0,
                totalPages: 0,
                currentPage: 1,
                take: 0,
                words: []
            }
        };
    }

    public componentDidMount() {
        this.getWords();
    }

    public render() {
        const { result } = this.state;

        const newWord: IWord = {
            created: moment.now(),
            word: '',
            description: '',
            language: 1,
            difficulty: 1
        }


        return (
            <div id="word-list">
                <WordFilters totalPages={result.totalPages} onChange={this.getWords} />

                {this.state.currentWord !== null && <WordForm
                    word={this.state.currentWord}
                    onFieldValueChange={this.onFieldValueChange}
                    saveWord={this.saveWord} />}

                {this.state.addWord && <WordForm
                    word={newWord}
                    onFieldValueChange={this.onFieldValueChange}
                    saveWord={this.saveWord} />}

                <button className="btn btn-primary" onClick={this.addWord}>Add word</button>

                <div className="meta"> <small>addWord: {this.state.addWord.toString()}</small> <b>{result.count}</b> words found - Page <b>{result.currentPage}</b> of <b>{result.totalPages}</b></div>
                <div className="result">
                    {result.words.map((word, idx) =>
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

    private onFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentWord = { ...this.state.currentWord } as IWord;
        currentWord[event.target.name] = event.target.value;
        this.setState({ currentWord });
    }

    private addWord = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ addWord: !this.state.addWord });
    }

    private saveWord = () => {
        // if (word.guid === null) {
        //     api.post('/api/wesketch/words/', word).catch(error => console.log(error));
        // } else {
        const { currentWord } = this.state;
        if (currentWord !== null) {
            api.put(`/api/wesketch/words/${currentWord.guid}`, currentWord)
                .then(() => {
                    this.setState({ currentWord: null }, () => this.getWords());
                })
                .catch(error => console.log(error));
        }
    }

    private getWords = (filters?: string) => {
        console.log(`filters: ${filters}`);

        const url = filters !== undefined
            ? `/api/wesketch/words${filters}`
            : '/api/wesketch/words';

        api.get(url)
            .then(result => this.setState({ result }))
            .catch(error => console.log(error));
    }

    private selectWord = (word: IWord) => {
        this.setState({ currentWord: word });
    }

    private wordClasses = (word: IWord) => {
        let result = 'word border';

        switch (word.difficulty) {
            case DifficultyTypes.Easy: result += ' text-success'; break;
            case DifficultyTypes.Normal: result += ' text-dark'; break;
            case DifficultyTypes.Hard: result += ' text-warning'; break;
            default: result += ' text-danger'; break;
        }

        return result;
    }
}