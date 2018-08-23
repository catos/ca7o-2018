import * as React from 'react';

import { api } from '../../Common/ApiService';
import { IRecipe } from './RecipesDb';
import { SearchResultItem } from './SearchResultItem';

interface IProps {
    onClick: ((recipe: IRecipe) => void);
}

interface IState {
    recipes: IRecipe[];
}

export class SearchResult extends React.Component<IProps, IState> {

    constructor(props: IProps) {
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
        // this.setState({
        //     recipes: RECIPES
        // });
    }

    public render() {
        return (
            <div>
                <div className="search-filters">
                    <a href="#" className="m-1 p-2 badge badge-primary">Sunn</a>
                    <a href="#" className="m-1 p-2 badge badge-secondary">Kjapp</a>
                    <a href="#" className="m-1 p-2 badge badge-success">Billig</a>
                    <a href="#" className="m-1 p-2 badge badge-danger">Kos</a>

                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="search-result">
                    {this.state.recipes.map((recipe, idx) =>
                        <SearchResultItem key={idx} recipe={recipe} onClick={() => this.props.onClick(recipe)} />
                    )}
                </div>
            </div>
        );
    }
}