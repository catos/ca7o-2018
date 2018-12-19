import * as React from 'react';
import * as moment from 'moment';
import { ChangeEvent } from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { Form, FormGroup, Label, Input, FormFeedback, Button, FormText } from 'reactstrap';

import './Recipe.css';

import { api } from '../../../Common/ApiService';
import { Link } from 'react-router-dom';
import { RecipeIngredientDetails } from './RecipeIngredientDetails';
import { IRecipe } from '../../../Models/IRecipe';
import { IIngredient } from '../../../Models/IIngredient';
import { AddRecipeIngredient } from './AddRecipeIngredient';

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
                guid: null,
                created: moment.now(),
                name: '',
                tags: [],
                thumbnail: '',
                url: '',
                description: '',
                time: 20,
                ingredients: []
            },
            redirect: false
        };
    }

    public componentDidMount() {
        const id = this.props.match.params.id;
        if (id !== -1) {
            this.getRecipe(id);
        }
    }

    public render() {
        const { recipe } = this.state;

        if (this.state.redirect) {
            return <Redirect to={'/recipes'} />
        }

        return (
            <div className="m-4 recipe-details">

                <div className="recipe-meta">
                    <div>
                        <Link className="btn btn-info" to={'/recipes'}>Back to list</Link>
                        <Button className="btn btn-danger float-right" onClick={this.deleteRecipe}>Delete</Button>
                    </div>
                    <hr/>
                    <Form className="needs-validation was-validated" noValidate={true}>
                        <FormGroup>
                            <Label for="created">Created</Label>
                            <Input type="text" readOnly={true} className="form-control-plaintext" id="created" value={moment(recipe.created).format('YYYY-MM-DD')} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Name"
                                value={recipe.name}
                                onChange={this.onFieldValueChange} />
                            <FormFeedback valid={false}>A name is required</FormFeedback>
                        </FormGroup>
                        <FormGroup className="thumbnail">
                            <div className="thumbnail-input">
                                <Label for="thumbnail">Thumbnail</Label>
                                <Input type="text" name="thumbnail" id="thumbnail" placeholder="Thumbnail"
                                    value={recipe.thumbnail}
                                    onChange={this.onFieldValueChange} />
                                <FormFeedback valid={false}>Thumbnail is required</FormFeedback>
                            </div>
                            <div className="thumbnail-preview">
                                {recipe.thumbnail.length
                                    ? <img src={recipe.thumbnail} alt={recipe.thumbnail} />
                                    : ''
                                }
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <label>Tags</label>
                            <div className="tags mb-3">
                                {recipe.tags.map((tag, tid) =>
                                    <span key={tid} className="badge badge-dark mr-1"
                                        onClick={() => this.removeTag(tag)}>{tag}</span>
                                )}

                                <span className="badge badge-success ml-2">Add tag</span>
                            </div>
                            <Input type="text" name="new-tag" id="new-tag" placeholder="Enter new tag" onKeyUp={this.addTag} />
                            <FormText color="muted">
                                Click on a tag to remove it. Add new tags by typing in the input.
                        </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description" placeholder="Description"
                                value={recipe.description}
                                onChange={this.onFieldValueChange} />
                            <FormText color="muted">Short description of recipe</FormText>
                            <FormFeedback valid={false}>Description is required</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="url">Url</Label>
                            <Input type="text" name="url" id="url" placeholder="url"
                                value={recipe.url}
                                onChange={this.onFieldValueChange} />
                            <FormText color="muted">External url to recipe</FormText>
                            <FormFeedback valid={false}>url is required</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="time">Time</Label>
                            <Input type="number" name="time" id="time" placeholder="Time"
                                value={recipe.time}
                                onChange={this.onFieldValueChange} />
                            <FormText color="muted">Time to make (in minutes)</FormText>
                            <FormFeedback valid={false}>Thumbnail is required</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Button className="btn btn-primary" label="Save" onClick={this.saveRecipe}>Save</Button>
                        </FormGroup>
                    </Form>
                </div>

                <div className="recipe-ingredients">

                    <h4>Ingredients</h4>
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>...</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recipe.ingredients.map((ingredient, idx) =>
                                <RecipeIngredientDetails key={idx} ingredient={ingredient}
                                    onChange={this.updateIngredient}
                                    onDelete={this.deleteIngredient} />
                            )}
                        </tbody>
                    </table>
                    <hr />
                    <AddRecipeIngredient onAdd={this.addIngredient} />
                </div>

            </div >
        );
    }

    private getRecipe = (id: number) => {
        api.get(`/api/recipes/${id}`)
            .then(result => {
                const recipe = result as IRecipe;
                console.log(recipe);
                if (recipe !== null) {
                    this.setState({ recipe });
                }
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

    private saveRecipe = () => {
        const { recipe } = this.state;

        if (recipe.guid === null) {
            api.post('/api/recipes/', recipe)
                // .then(_ => {
                //     this.setState({ redirect: true });
                // })
                .catch(error => console.log(error));
        } else {
            api.put(`/api/recipes/${recipe.guid}`, recipe)
                .then(result => {
                    // this.setState({ redirect: true });
                    console.log('result: ', result);

                    this.setState({ recipe: result });
                })
                .catch(error => console.log(error));
        }
    }

    private deleteRecipe = async () => {
        const { recipe } = this.state;
        const result = await api.delete(`/api/recipes/${recipe.guid}`);
        if (result.errors && result.errors.length) {
            console.log('error!: ', result);
        }
        console.log('error!: ', result);
    }

    private updateIngredient = (ingredient: IIngredient) => {
        console.log('updateIngredient');

        const newIngredients = this.state.recipe.ingredients
            .map(i => i._id === ingredient._id ? ingredient : i);

        const recipe = this.state.recipe;
        recipe.ingredients = newIngredients;

        this.setState({ recipe });
    }

    private addIngredient = (ingredient: IIngredient) => {
        delete ingredient._id;

        const recipe = { ...this.state.recipe };
        recipe.ingredients.push(ingredient);
        this.setState({ recipe }, () => this.saveRecipe());
    }

    private deleteIngredient = (ingredient: IIngredient) => {
        const recipe = { ...this.state.recipe };
        recipe.ingredients = recipe.ingredients.filter(p => p._id !== ingredient._id);
        this.setState({ recipe }, () => this.saveRecipe());
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