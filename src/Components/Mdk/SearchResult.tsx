import * as React from 'react';
import { ChangeEvent, KeyboardEvent, MouseEvent } from 'react';

import { api } from '../../Common/ApiService';
import { SearchResultItem } from './SearchResultItem';
import { IRecipe } from '../../Models/IRecipe';

interface IProps {
    onClick: ((recipe: IRecipe) => void);
}

interface IState {
    recipes: IRecipe[];
    tags: string[],
    q: string;
    time: number;
}

export class SearchResult extends React.Component<IProps, IState> {
    private readonly defaultState = {
        recipes: [],
        tags: [],
        q: '',
        time: 30
    };

    constructor(props: IProps) {
        super(props);

        this.state = this.defaultState;
    }

    public componentDidMount() {
        this.getRecipes();
    }

    public render() {
        const { tags } = this.state;

        return (
            <div className="search">
                <div className="filters">

                    <div className="filter-tags">
                        <a onClick={this.resetFilters}><span className="fa fa-power-off" /></a>
                        <span className={"badge badge-dark" + (tags.includes('sunn') ? ' selected' : '')} onClick={this.toggleTag}>Sunn</span>
                        <span className={"badge badge-dark" + (tags.includes('rask') ? ' selected' : '')} onClick={this.toggleTag}>Rask</span>
                        <span className={"badge badge-dark" + (tags.includes('kos') ? ' selected' : '')} onClick={this.toggleTag}>Kos</span>
                        <span className={"badge badge-primary" + (tags.includes('fisk') ? ' selected' : '')} onClick={this.toggleTag}>Fisk</span>
                    </div>

                    <div className="filter-search">
                        <input className="form-input" type="text" name="q" placeholder="Søk i oppskrifter"
                            value={this.state.q}
                            onChange={this.onFieldValueChange}
                            onKeyUp={this.onKeyUpSearch} />
                    </div>

                    <div className="filter-time">
                        <span className="mr-2">Time: </span>
                        <input type="range" id="time" name="time" min="0" max="120" step="10"
                            value={this.state.time}
                            onChange={this.onFieldValueChange}
                            onMouseUp={this.getRecipes} />
                        <span className="ml-2">{this.state.time}m</span>
                    </div>

                </div>
                <div className="result">
                    {this.state.recipes.map((recipe, idx) =>
                        <SearchResultItem key={idx} recipe={recipe} onClick={() => this.props.onClick(recipe)} />
                    )}
                </div>
            </div>
        );
    }

    private onFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const nextState = {
            ...this.state,
            [event.target.name]: event.target.value
        };
        this.setState(nextState);
    }

    // private onSubmit = (event: any) => {
    //     event.preventDefault();
    //     console.log('submit!', this.state);
    //     this.getRecipes();
    // }

    private onKeyUpSearch = (event: KeyboardEvent<any>) => {
        if (event.which === 13) {
            // this.onSubmit(event);
            this.getRecipes();

        }
    }

    private toggleTag = (event: MouseEvent<HTMLAnchorElement>) => {
        const elm = event.target as HTMLElement;
        if (elm.textContent !== null) {

            const tag = elm.textContent.toLowerCase();
            const tags = this.state.tags.includes(tag)
                ? this.state.tags.filter(p => p !== tag)
                : this.state.tags.concat(tag);

            this.setState({ tags }, () => this.getRecipes());


        }
    }

    private getRecipes = () => {
        api.get(`/api/recipes?q=${this.state.q}&time=${this.state.time}&tags=${this.state.tags}`)
            .then(response => {
                this.setState({
                    recipes: response as IRecipe[]
                })
            })
            .catch(error => console.log(error));
    }

    private resetFilters = () => {
        this.setState(
            this.defaultState,
            () => this.getRecipes());
    }
}