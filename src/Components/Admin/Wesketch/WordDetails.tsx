import * as React from 'react';
import * as moment from 'moment';
import { Form, FormGroup, Input, FormFeedback, Button } from 'reactstrap';

import { IWord, DifficultyTypes, LanguageTypes } from './WordsList';
import { api } from '../../../Common/ApiService';


interface IProps {
    word: IWord | null;
}

interface IState {
    word: IWord;
}

export class WordDetails extends React.Component<IProps, IState> {

    private newWord: IWord = {
        guid: '',
        created: moment.now(),
        word: '',
        description: '',
        language: 1,
        difficulty: 1
    }

    constructor(props: any) {
        super(props);

        this.state = {
            word: this.props.word || this.newWord
        };
    }

    public render() {
        const difficultyTypesKeys = Object.keys(DifficultyTypes)
            .filter(p => typeof DifficultyTypes[p as any] === "number");

        const languageTypesKeys = Object.keys(LanguageTypes)
            .filter(p => typeof LanguageTypes[p as any] === "number");

        return (
            <Form className="form-inline" noValidate={true}>
                <FormGroup>
                    <Input className="mr-2" type="text" name="word" id="word" placeholder="Word"
                        value={this.state.word.word}
                        onChange={this.onFieldValueChange} />
                    <FormFeedback valid={false}>WORD is required</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input className="mr-2" type="text" name="description" id="description" placeholder="Description"
                        value={this.state.word.description}
                        onChange={this.onFieldValueChange} />
                    <FormFeedback valid={false}>description is required</FormFeedback>
                </FormGroup>
                <Input className="mr-2" type="select" name="difficulty" id="difficulty" placeholder="Difficulty"
                    value={this.state.word.difficulty}
                    onChange={this.onFieldValueChange}>
                    {difficultyTypesKeys.map((key, idx) =>
                        <option key={idx} value={DifficultyTypes[key]}>{key}</option>
                    )}
                </Input>
                <Input type="select" name="language" id="language" placeholder="Language"
                    value={this.state.word.language}
                    onChange={this.onFieldValueChange}>
                    {languageTypesKeys.map((key, idx) =>
                        <option key={idx} value={LanguageTypes[key]}>{key}</option>
                    )}
                </Input>
                <Button className="btn btn-primary" label="Save" onClick={this.saveWord}>Save</Button>
            </Form>
        );
    }

    private onFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const word = { ...this.state.word };
        word[event.target.name] = event.target.value;
        this.setState({ word });
    }

    private saveWord = () => {
        const { word } = this.state;

        if (word.guid === null) {
            api.post('/api/wesketch/words/', word).catch(error => console.log(error));
        } else {
            api.put(`/api/wesketch/words/${word.guid}`, word)
                .then(result => this.setState({ word: result }))
                .catch(error => console.log(error));
        }
    }

}