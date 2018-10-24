import * as React from 'react';

import { Form, FormGroup, Input, FormFeedback, Button } from 'reactstrap';
import { IWord, DifficultyTypes, LanguageTypes } from './WordsList';

interface IProps {
    word: IWord;
    onFieldValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    saveWord: () => void;
}

export class WordForm extends React.Component<IProps, {}> {

    // private newWord: IWord = {
    //     guid: '',
    //     created: moment.now(),
    //     word: '',
    //     description: '',
    //     language: 1,
    //     difficulty: 1
    // }

    constructor(props: any) {
        super(props);
    }

    public render() {
        const { word } = this.props;

        const difficultyTypesKeys = Object.keys(DifficultyTypes)
            .filter(p => typeof DifficultyTypes[p as any] === "number");

        const languageTypesKeys = Object.keys(LanguageTypes)
            .filter(p => typeof LanguageTypes[p as any] === "number");

        return (
            <Form className="form-inline" noValidate={true}>
                <FormGroup>
                    <Input className="mr-2" type="text" name="word" id="word" placeholder="Word"
                        value={word.word}
                        onChange={this.props.onFieldValueChange} />
                    <FormFeedback valid={false}>WORD is required</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Input className="mr-2" type="text" name="description" id="description" placeholder="Description"
                        value={word.description}
                        onChange={this.props.onFieldValueChange} />
                    <FormFeedback valid={false}>description is required</FormFeedback>
                </FormGroup>
                <Input className="mr-2" type="select" name="difficulty" id="difficulty" placeholder="Difficulty"
                    value={word.difficulty}
                    onChange={this.props.onFieldValueChange}>
                    {difficultyTypesKeys.map((key, idx) =>
                        <option key={idx} value={DifficultyTypes[key]}>{key}</option>
                    )}
                </Input>
                <Input type="select" name="language" id="language" placeholder="Language"
                    value={word.language}
                    onChange={this.props.onFieldValueChange}>
                    {languageTypesKeys.map((key, idx) =>
                        <option key={idx} value={LanguageTypes[key]}>{key}</option>
                    )}
                </Input>
                <Button className="btn btn-primary" label="Save" onClick={this.props.saveWord}>Save</Button>
            </Form>
        );
    }

}