import * as React from 'react';

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
    showForm: boolean;
    currentWord?: IWord;
    result: IWordResult
}

export class WordsList extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            filters: '',
            showForm: false,
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

        return (
            <div id="word-list">
                <WordFilters totalPages={result.totalPages} onChange={this.getWords} />

                {this.state.showForm && <WordForm
                    word={this.state.currentWord}
                    onSave={this.onSaveWord}
                    onCancel={this.onCancelWord} />}

                <button className="btn btn-primary" onClick={this.addWord}>Add word</button>

                <div className="meta"><b>{result.count}</b> words found - Page <b>{result.currentPage}</b> of <b>{result.totalPages}</b></div>
                <div className="result">
                    {result.words.map((word, idx) =>
                        <div key={idx} className={this.wordClasses(word)} title={word.word + ': ' + word.description}
                            onClick={() => this.editWord(word)}>
                            {word.word}

                            <span className="language">{LanguageTypes[word.language].substring(0, 2)}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    private onSaveWord = async(word: IWord) => {
        if (word.guid !== undefined) {
            const result = await api.put(`/api/wesketch/words/${word.guid}`, word);
            // TODO: check if error (result.errors.length) and display to user (TOAST)
            console.log('result', result);            
            this.setState({ currentWord: undefined, showForm: false }, () => this.getWords());
        } else {
            const result = await api.post(`/api/wesketch/words`, word);
            // TODO: check if error (result.errors.length) and display to user
            console.log('result', result);
            this.setState({ currentWord: undefined, showForm: false }, () => this.getWords());
        }
    }

    private onCancelWord = () => {
        this.setState({ currentWord: undefined, showForm: false });
    }

    private getWords = async(filters?: string) => {
        const url = filters !== undefined
            ? `/api/wesketch/words${filters}`
            : '/api/wesketch/words';

        const result = await api.get(url);
        this.setState({ result });
    }

    private addWord = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ currentWord: undefined, showForm: true });
    }

    private editWord = (word: IWord) => {
        this.setState({ currentWord: word, showForm: true });
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