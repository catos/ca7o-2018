import * as React from 'react';

import './Mdk.css';
import { RECIPES, IRecipe } from './RecipesDb';

interface IDay {
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
    }

    public componentDidMount() {
        const recipes = RECIPES.sort(() => .5 - Math.random()).slice(0, 5);
        const days = [
            { name: 'Mandag', recipe: recipes[0], selected: true },
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
                        <div key={idx}
                            className={"card w-20 week-menu-item " + (day.selected ? 'selected' : '')}
                            onClick={() => this.selectDay(day)}
                        >
                            <h1 className="day">{day.name}</h1>
                            <div className="card-img-top center-cropped week-thumbnail" style={{ backgroundImage: 'url(' + day.recipe.thumbnail + ')' }} />
                            <div className="card-body">
                                <h5 className="card-title">{day.recipe.name}</h5>
                                <div><small>{day.recipe.time} <i className="far fa-clock" /></small></div>
                                <p className="card-text">{day.recipe.description}</p>
                            </div>
                        </div>
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
                </div>

                <div className="search-result">

                    {this.state.recipes.map((recipe, idx) =>
                        <div key={idx} className="w-10"
                            onClick={() => this.replaceRecipe(recipe)}>
                            <h1>{recipe.name}</h1>
                            <div className="card-img-top center-cropped search-thumbnail" style={{ backgroundImage: 'url(' + recipe.thumbnail + ')' }} />
                        </div>
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

    private replaceRecipe(recipe: IRecipe) {
        const days = this.state.days.map(day => {
            if (day.selected) {
                day.recipe = recipe;
            }
            return day;
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