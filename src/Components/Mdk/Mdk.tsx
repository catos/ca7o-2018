import * as React from 'react';

import './Mdk.css';
import { RECIPES, IRecipe } from './RecipesDb';

import { MdkDay } from './MdkDay';
import { SearchResultItem } from './SearchResultItem';

export interface IDay {
    name: string;
    recipe: IRecipe;
    selected: boolean;
}

interface IState {
    recipes: IRecipe[];
    days: IDay[];
    shoppingList: string[];
    showShoppingList: boolean;
}

export class Mdk extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            recipes: [],
            days: [],
            shoppingList: [],
            showShoppingList: false
        }

        this.onDropReplaceRecipe = this.onDropReplaceRecipe.bind(this);
    }

    public componentDidMount() {
        const recipes = RECIPES.sort(() => .5 - Math.random()).slice(0, 5);
        const days = [
            { name: 'Mandag', recipe: recipes[0], selected: false },
            { name: 'Tirsdag', recipe: recipes[1], selected: false },
            { name: 'Onsdag', recipe: recipes[2], selected: false },
            { name: 'Torsdag', recipe: recipes[3], selected: false },
            { name: 'Fredag', recipe: recipes[4], selected: false },
        ];
        this.setState({
            recipes: RECIPES,
            days,
            shoppingList: this.getIngredients(days)
        })
    }

    public render() {
        const shoppingList = !this.state.showShoppingList
            ? ''
            :
            <div>
                <div className="shopping-list">
                    <ul>
                        {this.state.shoppingList.sort().map((item, idx) =>
                            <li key={idx}>{item}</li>
                        )}
                    </ul>
                </div>
                <hr />
            </div>;

        return (
            <div id="mdk">
                <h1>Ukesmeny</h1>
                <div className="card-group week-menu">
                    {this.state.days.map((day, idx) =>
                        <MdkDay key={idx}
                            day={day}
                            onClick={() => this.selectDay(day)}
                            onDrop={this.onDropReplaceRecipe} />
                    )}
                </div>

                <div className="mt-3">
                    <button className="btn btn-sm btn-dark"
                        onClick={() => this.toggleShoppingList()}>
                        Vis handleliste
                    </button>
                </div>

                <hr />

                {shoppingList}

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
                        <SearchResultItem key={idx} recipe={recipe} onClick={() => this.onClickReplaceRecipe(recipe)} />
                    )}
                </div>
            </div>
        );
    }

    private toggleShoppingList() {
        this.setState({
            showShoppingList: !this.state.showShoppingList
        })
    }

    private selectDay(day: IDay) {
        const days = this.state.days.map(d => {
            d.selected = d.name === day.name && !d.selected;
            return d;
        });

        this.setState({
            days
        });
    }

    private onDropReplaceRecipe(day: IDay, recipe: IRecipe) {
        this.replaceRecipe(day, recipe);
    }

    private onClickReplaceRecipe(recipe: IRecipe) {
        const selectedDay = this.state.days.find(p => p.selected) as IDay;
        if (selectedDay !== undefined) {
            this.replaceRecipe(selectedDay, recipe);
        }
    }

    private replaceRecipe(day: IDay, recipe: IRecipe) {
        const days = this.state.days.map(d => {
            if (d.name === day.name) {
                d.recipe = recipe;
            }
            return d;
        });

        this.setState({
            days,
            shoppingList: this.getIngredients(days)
        });
    }

    private getIngredients(days: IDay[]): string[] {
        let ingredients: string[] = [];
        days.map(day => {
            ingredients = ingredients.concat(day.recipe.ingredients)
        });

        return ingredients;
    }
}