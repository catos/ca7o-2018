import * as React from 'react';

import { api } from '../../../Common/ApiService';
import './Words.css';
import { WordDetails } from './WordDetails';

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
    q: string;
    difficulties: number[];
    languages: number[];
    currentWord: IWord | null;
    words: IWord[];
}

export class WordsList extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            q: '',
            difficulties: [],
            languages: [],
            currentWord: null,
            words: []
        };
    }

    public componentDidMount() {
        this.getWords();
    }

    public render() {
        const { currentWord } = this.state;

        return (
            <div id="word-list">
                <div className="filters">
                    <div className="filter-difficulties">
                        <span className={"badge badge-dark" + (this.state.difficulties.includes(1) ? ' selected' : '')} onClick={() => this.toggleDifficulty(1)}>Easy</span>
                        <span className={"badge badge-dark" + (this.state.difficulties.includes(2) ? ' selected' : '')} onClick={() => this.toggleDifficulty(2)}>Normal</span>
                        <span className={"badge badge-dark" + (this.state.difficulties.includes(3) ? ' selected' : '')} onClick={() => this.toggleDifficulty(3)}>Hard</span>
                    </div>

                    <div className="filter-languages">
                        <span className={"badge badge-dark" + (this.state.languages.includes(1) ? ' selected' : '')} onClick={() => this.toggleLanguage(1)}>English</span>
                        <span className={"badge badge-dark" + (this.state.languages.includes(2) ? ' selected' : '')} onClick={() => this.toggleLanguage(2)}>Norwegian</span>
                    </div>

                    <div className="form-group">
                        <input className="form-control" type="text" name="q" placeholder="Søk i oppskrifter"
                            value={this.state.q}
                            onChange={this.onFieldValueChange}
                            onKeyUp={this.onKeyUpSearch}
                        />
                    </div>
                </div>

                <WordDetails word={currentWord} />

                {/* <div>{currentWord.word}</div> */}

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

    private onFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextState = {
            ...this.state,
            [event.target.name]: event.target.value
        };
        this.setState(nextState);
    }

    private onKeyUpSearch = (event: React.KeyboardEvent<any>) => {
        event.preventDefault();
        if (event.which === 13 || this.state.q.length <= 0) {
            this.getWords();
        }
    }

    private toggleDifficulty = (difficulty: number) => {

        const difficulties = this.state.difficulties.includes(difficulty)
            ? this.state.difficulties.filter(p => p !== difficulty)
            : this.state.difficulties.concat(difficulty);

        this.setState({ difficulties }, () => this.getWords());
    }

    private toggleLanguage = (language: number) => {

        const languages = this.state.languages.includes(language)
            ? this.state.languages.filter(p => p !== language)
            : this.state.languages.concat(language);

        this.setState({ languages }, () => this.getWords());
    }

    private getWords = () => {
        api.get(`/api/wesketch/words?q=${this.state.q}&difficulties=${this.state.difficulties}&languages=${this.state.languages}`)
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