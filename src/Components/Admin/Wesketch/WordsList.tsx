import * as React from 'react';

import { api } from '../../../Common/ApiService';
import { WordFilters } from './WordFilters';
import { WordForm } from './WordForm';

import './Words.css';
import { Toast } from 'src/Components/Shared/Toast';

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

export interface IWordFilters {
    q: string;
    difficulties: number[];
    languages: number[];
    page: number;
}

interface IState {
    filters: IWordFilters;
    showForm: boolean;
    currentWord?: IWord;
    result: IWordResult
    showErrorMessage: boolean;
    errorMessage: string;
}

export class WordsList extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            filters: {
                q: '',
                difficulties: [],
                languages: [],
                page: 1
            },
            showForm: false,
            result: {
                count: 0,
                totalPages: 0,
                currentPage: 1,
                take: 0,
                words: []
            },
            showErrorMessage: false,
            errorMessage: 'lorem ipsum'
        };
    }

    public componentDidMount() {
        this.getWords();
    }

    public render() {
        const { result } = this.state;

        return (
            <div id="word-list">
                <WordFilters
                    filters={this.state.filters} 
                    totalPages={result.totalPages}
                    onChange={this.onFiltersChange}
                    addWord={this.addWord} />

                {this.state.showForm && <WordForm
                    word={this.state.currentWord}
                    onSave={this.onSaveWord}
                    onDelete={this.onDeleteWord}
                    onCancel={this.onCancelWord} />}

                <div className="meta">
                    <span><b>{result.count}</b> words found - Page <b>{result.currentPage}</b> of <b>{result.totalPages}</b></span>
                </div>

                <div className="result">
                    {result.words.map((word, idx) =>
                        <div key={idx} className={this.wordClasses(word)} title={word.word + ': ' + word.description}
                            onClick={() => this.editWord(word)}>
                            {word.word}
                        </div>
                    )}
                </div>

                <button className="btn btn-warning" onClick={() => this.setState({ errorMessage: 'Bare en test', showErrorMessage: true })}>Toast!</button>
                <Toast
                    message={this.state.errorMessage}
                    visible={this.state.showErrorMessage}
                    level="danger"
                    onHide={() => this.setState({ showErrorMessage: false })} />
            </div>
        );
    }

    private onSaveWord = async (word: IWord) => {
        if (word.guid !== undefined) {
            const result = await api.put(`/api/wesketch/words/${word.guid}`, word);
            if (result.errors && result.errors.length) {
                this.setState({ errorMessage: result.errors[0], showErrorMessage: true });
            }
            this.setState({ currentWord: undefined, showForm: false }, () => this.getWords());
        } else {
            const result = await api.post(`/api/wesketch/words`, word);
            if (result.errors && result.errors.length) {
                this.setState({ errorMessage: result.errors[0], showErrorMessage: true });
            }
            this.setState({ currentWord: undefined, showForm: false }, () => this.getWords());
        }
    }

    private onDeleteWord = async (word: IWord) => {
        const result = await api.delete(`/api/wesketch/words/${word.guid}`);
        if (result.errors && result.errors.length) {
            this.setState({ errorMessage: result.errors[0], showErrorMessage: true });
        }
        this.setState({ currentWord: undefined, showForm: false }, () => this.getWords());
    }

    private onCancelWord = () => {
        this.setState({ currentWord: undefined, showForm: false });
    }

    private addWord = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        this.setState({ currentWord: undefined, showForm: true });
    }

    private editWord = (word: IWord) => {
        this.setState({ currentWord: word, showForm: true });
    }

    private onFiltersChange = (filters: IWordFilters) => {
        this.setState({ filters }, () => this.getWords());
    }

    private getWords = async () => {
        const filters = `?q=${this.state.filters.q}&difficulties=${this.state.filters.difficulties}&languages=${this.state.filters.languages}&page=${this.state.filters.page}`;
        const result = await api.get(`/api/wesketch/words${filters}`);
        this.setState({ result });
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