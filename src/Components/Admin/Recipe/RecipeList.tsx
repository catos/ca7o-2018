import * as React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';

import { snip } from '../../../Common/Utils';
import { api } from '../../../Common/ApiService';
import { IRecipe } from '../../../Models/IRecipe';

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
                <h2>Recipes <small><Link to={'/recipes/-1'}>Add recipe</Link></small></h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.recipes.map((recipe, idx) =>
                            <tr key={idx}>
                                <td>
                                    <Link to={`/recipes/${recipe.guid}`}>
                                        <span className="mr-2">{recipe.name}</span>
                                        <span className="badge badge-info mr-2">{recipe.time} m</span>
                                        {recipe.tags.map((tag, tid) =>
                                            <span key={tid} className="badge badge-dark mr-1">{tag}</span>
                                        )}
                                    </Link>
                                </td>
                                <td>{snip(recipe.description, 60)}</td>
                                <td className="no-wrap">{moment(recipe.created).format('YYYY-MM-DD')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}