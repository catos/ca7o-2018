import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { snip } from '../../Common/Utils';
import { api } from '../../Common/ApiService';
import { IRecipe } from '../../Models/Recipe';

interface IState {
    recipes: IRecipe[]
}

export class RecipeList extends React.Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            recipes: []
        };
    }

    public componentDidMount() {
        api.get('/api/recipes')
            .then(response => {
                this.setState({
                    recipes: response as IRecipe[]
                })
            })
            .catch(error => console.log(error));
    }

    public render() {
        return (
            <div className="m-4">
                <h2>Recipes</h2>
                <table className="table table-sm table-bordered">
                    <tbody>
                        <tr>
                            <th>Created</th>
                            <th>Name</th>
                            <th>Tags</th>
                            <th>Thumbnail</th>
                            <th>Description</th>
                            <th>Time</th>
                            <th>Ingredients</th>
                        </tr>
                        {this.state.recipes.map((recipe, idx) =>
                            <tr key={idx}>
                                <td>{moment(recipe.created).format('YYYY-MM-DD')}</td>
                                <td><Link to={`/recipes/${recipe.guid}`}>{recipe.name}</Link></td>
                                <td>{recipe.tags.join(', ')}</td>
                                <td>{snip(recipe.thumbnail, 15)}</td>
                                <td>{recipe.description}</td>
                                <td>{recipe.time}</td>
                                <td>{recipe.ingredients.length}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}