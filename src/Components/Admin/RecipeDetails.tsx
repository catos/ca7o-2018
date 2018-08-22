import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';

import { api } from '../../Common/ApiService';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import { ChangeEvent } from 'react';
import { IIngredient } from './RecipeIngredientDetails';

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
        api.get(`/api/recipes/${this.props.match.params.id}`)
            .then(result => {
                const recipe = result as IRecipe;
                this.setState({ recipe });
            })
            .catch(error => console.log(error));
    }

    public render() {
        const { recipe } = this.state;
        const ingredientTypesKeys = Object.keys(IngredientTypes)
            .filter(p => typeof IngredientTypes[p as any] === "number");

        if (this.state.redirect) {
            return <Redirect to={'/recipes'} />
        }

        return (
            <div className="m-4">
                <h2>Edit details for: {recipe.name}</h2>
                <Link className="mb-4" to={'/recipes'}>Back to list</Link>
                <Form className="needs-validation was-validated" noValidate={true}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="Name"
                            value={recipe.name}
                            onChange={this.onFieldValueChange} />
                        <FormFeedback valid={false}>A name is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="tags">Tags</Label>
                        <Input type="text" name="tags" id="tags" placeholder="Tags"
                            value={recipe.tags}
                            onChange={this.onFieldValueChange} />
                        <FormFeedback valid={false}>Tags are required</FormFeedback>
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
                        <FormFeedback valid={false}>Thumbnail is required</FormFeedback>
                    </FormGroup>

                    {/* <div className="p-3 bg-light">
                        <h4>Ingredients</h4>
                        {recipe.ingredients.map((ingredient, idx) =>
                            <RecipeIngredientDetails key={idx} ingredient={ingredient} onChange={this.updateIngredient} />
                        )}
                    </div> */}
                    {recipe.ingredients.map((ingredient, iidx) =>
                        <div key={iidx}>
                            <FormGroup>
                                <Input type="text" name="quantity" id="quantity" placeholder="Quantity"
                                    value={ingredient.quantity}
                                    onChange={this.onFieldValueChange} />
                                <FormFeedback valid={false}>A quantity is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="unit" id="unit" placeholder="Unit"
                                    value={ingredient.unit}
                                    onChange={this.onFieldValueChange} />
                                <FormFeedback valid={false}>A unit is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input type="text" name="name" id="name" placeholder="Name"
                                    value={ingredient.name}
                                    onChange={this.onFieldValueChange} />
                                <FormFeedback valid={false}>A name is required</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" name="type" id="type" placeholder="Type"
                                    value={ingredient.type}
                                    onChange={this.onFieldValueChange}>
                                    {ingredientTypesKeys.map((key, idx) =>
                                        <option key={idx} value={IngredientTypes[key]}>{key}</option>
                                    )}
                                </Input>
                                <FormFeedback valid={false}>A name is required</FormFeedback>
                            </FormGroup>
                        </div>
                    )}

                    <FormGroup>
                        <Button className="btn btn-primary" label="Save" onClick={this.onSave}>
                            Save
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        );
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
        const recipe = this.state.recipe;
        const updatedRecipe = {
            name: recipe.name,
            tags: recipe.tags
        };

        api.put(`/api/recipes/${this.state.recipe.guid}`, updatedRecipe)
            .then(result => {
                this.setState({
                    redirect: true
                });
            })
            .catch(error => console.log(error));
    }

    // private updateIngredient = (ingredient: IIngredient) => {
    //     // console.log(this.state.recipe.ingredients.map(i => {
    //     //     if (i.name === ingredient.name) {

    //     //     }
    //     // }));

    //     console.log(ingredient);
    // }

}