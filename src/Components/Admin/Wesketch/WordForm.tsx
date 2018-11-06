import * as React from 'react';
import * as moment from 'moment';

import { Form, FormGroup, Input, FormFeedback, Button, Modal, ModalBody, ModalHeader, Label, ModalFooter } from 'reactstrap';
import { IWord, DifficultyTypes, LanguageTypes } from './WordsList';

interface IProps {
    word?: IWord;
    onSave: (word: IWord) => void;
    onDelete: (word: IWord) => void;
    onCancel: () => void;
}

interface IState {
    word: IWord,
}

export class WordForm extends React.Component<IProps, IState> {

    private newWord: IWord = {
        guid: undefined,
        created: moment.now(),
        word: '',
        description: '',
        language: 1,
        difficulty: 2
    }

    constructor(props: IProps) {
        super(props);

        this.state = {
            word: props.word ? { ...props.word } : this.newWord
        }
    }

    public componentWillReceiveProps() {
        this.setState({ word: this.props.word ? { ...this.props.word } : this.newWord });
    }

    public render() {
        const { word } = this.state;

        const difficultyTypesKeys = Object.keys(DifficultyTypes)
            .filter(p => typeof DifficultyTypes[p as any] === "number");

        const languageTypesKeys = Object.keys(LanguageTypes)
            .filter(p => typeof LanguageTypes[p as any] === "number");

        return (
            <Modal isOpen={true} toggle={this.props.onCancel}>
                <ModalHeader>
                    {word.guid === undefined ? 'Add word' : 'Edit word'}
                </ModalHeader>
                <ModalBody>
                    <Form noValidate={true}>
                        <FormGroup>
                            <Label>Word</Label>
                            <Input className="mr-2" type="text" name="word" id="word" placeholder="Word"
                                value={word.word}
                                onChange={this.onFieldValueChange} />
                            <FormFeedback valid={false}>WORD is required</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>Description</Label>
                            <Input className="mr-2" type="text" name="description" id="description" placeholder="Description"
                                value={word.description}
                                onChange={this.onFieldValueChange} />
                            <FormFeedback valid={false}>description is required</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>Difficulty</Label>
                            <Input className="mr-2" type="select" name="difficulty" id="difficulty" placeholder="Difficulty"
                                value={word.difficulty}
                                onChange={this.onFieldValueChange}>
                                {difficultyTypesKeys.map((key, idx) =>
                                    <option key={idx} value={DifficultyTypes[key]}>{key}</option>
                                )}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Language</Label>
                            <Input className="mr-2" type="select" name="language" id="language" placeholder="Language"
                                value={word.language}
                                onChange={this.onFieldValueChange}>
                                {languageTypesKeys.map((key, idx) =>
                                    <option key={idx} value={LanguageTypes[key]}>{key}</option>
                                )}
                            </Input>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-danger delete" label="Delete" onClick={this.deleteWord}>Delete</Button>
                    <Button className="btn btn-light" label="Cancel" onClick={this.props.onCancel}>Cancel</Button>
                    <Button className="btn btn-primary save" label="Save" onClick={this.saveWord}>Save</Button>
                </ModalFooter>
            </Modal>
        );
    }

    private onFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const word = { ...this.state.word } as IWord;
        word[event.target.name] = event.target.value;
        this.setState({ word });
    }

    private saveWord = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.props.onSave(this.state.word);
    }

    private deleteWord = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        this.props.onDelete(this.state.word);
    }
}