import * as React from 'react';

import { api } from '../../Common/ApiService';
import { IRecipe } from './RecipesDb';
import { SearchResultItem } from './SearchResultItem';
import { ChangeEvent } from 'react';

interface IProps {
    onClick: ((recipe: IRecipe) => void);
}

interface IState {
    recipes: IRecipe[];
    q: string;
    time: number;
}

export class SearchResult extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            recipes: [],
            q: '',
            time: 30
        };
    }

    public componentDidMount() {
        this.getRecipes();
    }

    public render() {
        return (
            <div>
                <div className="search-filters">
                    <a href="#" className="m-1 p-2 badge badge-primary">Sunn</a>
                    <a href="#" className="m-1 p-2 badge badge-secondary">Kjapp</a>
                    <a href="#" className="m-1 p-2 badge badge-success">Billig</a>
                    <a href="#" className="m-1 p-2 badge badge-danger">Kos</a>

                    <input className="form-input" type="text" name="q" placeholder="Søk i oppskrifter"
                        value={this.state.q}
                        onChange={this.onFieldValueChange} />

                    <label htmlFor="range">Time: </label>
                    <input type="range" id="time" name="time" min="0" max="120" step="10" 
                        value={this.state.time} 
                        onChange={this.onFieldValueChange} />
                        
                    <datalist id="time">
                        <option value="0" label="0%" />
                        <option value="10" />
                        <option value="20" />
                        <option value="30" />
                        <option value="40" />
                        <option value="50" label="50%" />
                        <option value="60" />
                        <option value="70" />
                        <option value="80" />
                        <option value="90" />
                        <option value="100" />
                        <option value="110" />
                        <option value="120" label="120%" />
                    </datalist>


                </div>
                <div className="search-result">
                    {this.state.recipes.map((recipe, idx) =>
                        <SearchResultItem key={idx} recipe={recipe} onClick={() => this.props.onClick(recipe)} />
                    )}
                </div>
            </div>
        );
    }

    private onFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.value);
        
        const nextState = {
            ...this.state,
            [event.target.name]: event.target.value
        };
        this.setState(nextState, () => this.getRecipes());
    }

    private getRecipes = () => {
        api.get(`/api/recipes?q=${this.state.q}&time=${this.state.time}`)
            .then(response => {
                this.setState({
                    recipes: response as IRecipe[]
                })
            })
            .catch(error => console.log(error));
    }
}