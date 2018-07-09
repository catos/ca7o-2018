import * as React from 'react';
import * as moment from 'moment';

import { api } from '../../Common/ApiService';
import { IRecipe } from '../../Models/Recipe';
import { IngredientTypes } from '../../Models/Ingredient';
import { snip } from '../../Common/Utils';

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
            <div className="mt-3">
                <table className="table table-sm table-bordered">
                    <tbody>
                        <tr>
                            <th>Guid</th>
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
                                <td>{recipe.guid}</td>
                                <td>{moment(recipe.created).format('YYYY-MM-DD')}</td>
                                <td>{recipe.name}</td>
                                <td>{recipe.tags.join(', ')}</td>
                                <td>{snip(recipe.thumbnail, 15)}</td>
                                <td>{recipe.description}</td>
                                <td>{recipe.time}</td>
                                <td>{recipe.ingredients.map(i => `${i.quantity} ${i.unit} ${i.name} (${IngredientTypes[i.type]})`).join(', ')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}