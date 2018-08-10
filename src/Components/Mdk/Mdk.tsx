import * as React from 'react';

import './Mdk.css';
import { IRecipe } from './RecipesDb';

import { MdkDay } from './MdkDay';
import { SearchResult } from './SearchResult';

export interface IDay {
    name: string;
    recipe: IRecipe | null;
    selected: boolean;
}

interface IState {
    days: IDay[];
    shoppingList: string[];
    showShoppingList: boolean;
}

export class Mdk extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            // recipes: [],
            days: [],
            shoppingList: [],
            showShoppingList: false
        }

        this.onDropReplaceRecipe = this.onDropReplaceRecipe.bind(this);
        this.onClickReplaceRecipe = this.onClickReplaceRecipe.bind(this);
    }

    public componentDidMount() {
        // const recipes = RECIPES.sort(() => .5 - Math.random()).slice(0, 5);
        const days = [
            { name: 'Mandag', recipe: null, selected: false },
            { name: 'Tirsdag', recipe: null, selected: false },
            { name: 'Onsdag', recipe: null, selected: false },
            { name: 'Torsdag', recipe: null, selected: false },
            { name: 'Fredag', recipe: null, selected: false },
        ];
        this.setState({
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
            <div id="mdk" className="m-4">
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

                <SearchResult onClick={this.onClickReplaceRecipe} />
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
            if (day.recipe !== null) {
                ingredients = ingredients.concat(day.recipe.ingredients)
            }
        });

        return ingredients;
    }
}