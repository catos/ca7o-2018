import * as React from 'react';

import { api } from '../../Common/ApiService';
import { SearchResultItem } from './SearchResultItem';
import { IRecipe } from '../../Models/IRecipe';

interface IProps {
    onClick: ((recipe: IRecipe) => void);
}

interface IState {
    recipes: IRecipe[];
    prevPage: number;
    page: number;
    nextPage: number;
    tags: string[],
    q: string;
    time: number;
    showAdvancedFilters: boolean;
}

export class SearchResult extends React.Component<IProps, IState> {
    private readonly defaultState = {
        recipes: [],
        prevPage: 0,
        page: 1,
        nextPage: 1,
        tags: [],
        q: '',
        time: 30,
        showAdvancedFilters: false
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
                        <span className={"badge badge-dark" + (tags.includes('lol') ? ' selected' : '')} onClick={this.toggleTag}>Lol</span>
                        <span className={"badge badge-dark" + (tags.includes('sunn') ? ' selected' : '')} onClick={this.toggleTag}>Sunn</span>
                        <span className={"badge badge-dark" + (tags.includes('rask') ? ' selected' : '')} onClick={this.toggleTag}>Rask</span>
                        <span className={"badge badge-dark" + (tags.includes('kos') ? ' selected' : '')} onClick={this.toggleTag}>Kos</span>

                    </div>

                    <div className="filter-tags">
                        <span className={"badge badge-dark" + (tags.includes('fisk') ? ' selected' : '')} onClick={this.toggleTag}>Fisk</span>
                        <span className={"badge badge-dark" + (tags.includes('fugl') ? ' selected' : '')} onClick={this.toggleTag}>Fugl</span>
                        <span className={"badge badge-dark" + (tags.includes('kjøtt') ? ' selected' : '')} onClick={this.toggleTag}>Kjøtt</span>
                        <span className={"badge badge-dark" + (tags.includes('vegetar') ? ' selected' : '')} onClick={this.toggleTag}>Vegetar</span>
                    </div>

                    <div className="filter-search">
                        <input className="form-input" type="text" name="q" placeholder="Søk i oppskrifter"
                            value={this.state.q}
                            onChange={this.onFieldValueChange}
                            onKeyUp={this.onKeyUpSearch} />

                        <div className="paging">
                            <a href="#" onClick={() => this.gotoPage(this.state.prevPage)}><i className="fas fa-angle-left" /></a>
                            <a href="#" onClick={() => this.gotoPage(this.state.nextPage)}><i className="fas fa-angle-right" /></a>
                        </div>

                        <div className="filter-options">
                            <a href="#" onClick={this.resetFilters}><i className="fas fa-sync-alt" /></a>
                            <a className="ml-3" href="#" onClick={this.toggleAdvancedFilters}>{this.state.showAdvancedFilters ? <i className="fas fa-caret-square-up" /> : <i className="fas fa-caret-square-down" />}</a>
                        </div>
                    </div>

                </div>




                {this.state.showAdvancedFilters
                    ? <div className="advanced-filters">
                        <h1>Advanced filters</h1>
                        <div className="filter-time">
                            <span className="mr-2">Time: </span>
                            <input type="range" id="time" name="time" min="0" max="120" step="10"
                                value={this.state.time}
                                onChange={this.onFieldValueChange}
                                onMouseUp={this.getRecipes} />
                            <span className="ml-2">{this.state.time}m</span>
                        </div>
                    </div>
                    : ''}

                <div className="result">
                    {this.state.recipes.map((recipe, idx) =>
                        <SearchResultItem key={idx} recipe={recipe} onClick={() => this.props.onClick(recipe)} />
                    )}
                </div>
            </div>
        );
    }

    private onFieldValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextState = {
            ...this.state,
            [event.target.name]: event.target.value
        };
        this.setState(nextState);
    }

    private onKeyUpSearch = (event: React.KeyboardEvent<any>) => {
        if (event.which === 13) {
            // this.onSubmit(event);
            this.getRecipes();
        }
    }

    private toggleAdvancedFilters = () => {
        this.setState({ showAdvancedFilters: !this.state.showAdvancedFilters });
    }

    private gotoPage = (page: number) => {
        this.setState({ page }, () => this.getRecipes());
    }

    private toggleTag = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
        api.get(`/api/recipes?q=${this.state.q}&time=${this.state.time}&tags=${this.state.tags}&page=${this.state.page}`)
            .then(response => {
                const prevPage = this.state.page > 1 ? this.state.page - 1 : 1;
                const nextPage = this.state.page + 1;
                this.setState({
                    recipes: response as IRecipe[],
                    prevPage,
                    nextPage
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