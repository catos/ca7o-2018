import * as React from 'react';
import { ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Form, FormGroup, Label, Input, FormFeedback, Button, FormText } from 'reactstrap';

import './Recipe.css';

import { api } from '../../Common/ApiService';
import { Link } from 'react-router-dom';
import { IIngredient, RecipeIngredientDetails } from './RecipeIngredientDetails';

export interface IRecipe {
    guid: string;
    created: number;
    name: string;
    tags: string[],
    thumbnail: string;
    description: string;
    time: number,
    ingredients: IIngredient[];
}

export enum IngredientTypes {
    Vegetables = 0,
    Fruit = 1,
    Grain = 2,
    Meat = 3,
    Dairy = 4,
    Spice = 5,
    Sauce = 6,
    Canned = 7,
}

interface IProps extends RouteComponentProps<any> { }

interface IState {
    recipe: IRecipe;
    redirect: boolean;
}

export class RecipeDetails extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            recipe: {
                guid: '',
                created: -1,
                name: '',
                tags: [],
                thumbnail: '',
                description: '',
                time: -1,
                ingredients: []
            },
            redirect: false
        };
    }

    public componentDidMount() {
        this.getRecipe();
    }

    public render() {
        const { recipe } = this.state;

        if (this.state.redirect) {
            return <Redirect to={'/recipes'} />
        }

        return (
            <div className="m-4 recipe-details">
                <h2>Edit recipe <small><Link to={'/recipes'}>Back to list</Link></small></h2>
                
                <Form className="needs-validation was-validated" noValidate={true}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Name"
                            value={recipe.name}
                            onChange={this.onFieldValueChange} />
                        <FormFeedback valid={false}>A name is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <label>Tags</label>
                        <div className="tags">
                            {recipe.tags.map((tag, tid) =>
                                <span key={tid} className="badge badge-dark mr-1"
                                    onClick={() => this.removeTag(tag)}>{tag}</span>
                            )}

                            <span className="badge badge-success ml-2">Add tag</span>
                        </div>
                        <FormText color="muted">
                            Click on a tag to remove it. Add new tags by typing in the input.
                        </FormText>
                        <Input type="text" name="new-tag" id="new-tag" placeholder="Enter new tag" onKeyUp={this.addTag} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="thumbnail">Thumbnail</Label>
                        <Input type="text" name="thumbnail" id="thumbnail" placeholder="Thumbnail"
                            value={recipe.thumbnail}
                            onChange={this.onFieldValueChange} />
                        <FormFeedback valid={false}>Thumbnail is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" placeholder="Description"
                            value={recipe.description}
                            onChange={this.onFieldValueChange} />
                        <FormFeedback valid={false}>Thumbnail is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="time">Time</Label>
                        <Input type="number" name="time" id="time" placeholder="Time"
                            value={recipe.time}
                            onChange={this.onFieldValueChange} />
                        <FormText color="muted">
                            Time to make (in minutes)
                        </FormText>
                        <FormFeedback valid={false}>Thumbnail is required</FormFeedback>
                    </FormGroup>

                    <div className="p-3 mb-3 bg-light">
                        <h4>Ingredients</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recipe.ingredients.map((ingredient, idx) =>
                                    <RecipeIngredientDetails key={idx} ingredient={ingredient}
                                        onChange={this.updateIngredient} />
                                )}
                            </tbody>
                        </table>
                    </div>

                    <FormGroup>
                        <Button className="btn btn-primary" label="Save" onClick={this.onSave}>
                            Save
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    private getRecipe = () => {
        api.get(`/api/recipes/${this.props.match.params.id}`)
            .then(result => {
                const recipe = result as IRecipe;
                console.log(recipe);

                this.setState({ recipe });
            })
            .catch(error => console.log(error));
    }

    private onFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextState = {
            ...this.state,
            recipe: {
                ...this.state.recipe,
                [event.target.name]: event.target.value
            }
        };
        this.setState(nextState);
    }

    private onSave = () => {
        api.put(`/api/recipes/${this.state.recipe.guid}`, this.state.recipe)
            .then(_ => {
                this.getRecipe();
            })
            .catch(error => console.log(error));
    }

    private updateIngredient = (ingredient: IIngredient) => {
        const newIngredients = this.state.recipe.ingredients
            .map(i => i._id === ingredient._id ? ingredient : i);

        const recipe = this.state.recipe;
        recipe.ingredients = newIngredients;

        this.setState({
            recipe
        });
    }

    private addTag = (event: any) => {
        if (event.which === 13) {
            const recipe = this.state.recipe;
            recipe.tags.push(event.target.value);
            this.setState({ recipe });

            event.target.value = '';
        }
    }

    private removeTag = (tag: string) => {
        const recipe = this.state.recipe;
        recipe.tags = recipe.tags.filter(p => p !== tag);
        this.setState({ recipe });
    }

}