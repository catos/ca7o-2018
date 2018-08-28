import { IDay } from './IDay';

import * as React from 'react';

import './Mdk.css';

import { MdkDay } from './MdkDay';
import { SearchResult } from './SearchResult';
import { IIngredient } from '../../Models/IIngredient';
import { IRecipe } from '../../Models/IRecipe';
import { api } from '../../Common/ApiService';

interface IState {
    days: IDay[];
    shoppingList: IIngredient[];
    showShoppingList: boolean;
}

export class Mdk extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            days: [
                { name: 'Mandag', recipe: null, selected: false },
                { name: 'Tirsdag', recipe: null, selected: false },
                { name: 'Onsdag', recipe: null, selected: false },
                { name: 'Torsdag', recipe: null, selected: false },
                { name: 'Fredag', recipe: null, selected: false },
            ],
            shoppingList: [],
            showShoppingList: true
        }

        this.onDropReplaceRecipe = this.onDropReplaceRecipe.bind(this);
        this.onClickReplaceRecipe = this.onClickReplaceRecipe.bind(this);
    }

    public componentDidMount() {
        this.randomWeek();
    }

    public render() {
        const shoppingList = !this.state.showShoppingList
            ? ''
            :
            <div>
                <div className="shopping-list">
                    <ul>
                        {this.state.shoppingList.sort().map((item, idx) =>
                            <li key={idx}>{item.quantity} {item.unit} - {item.name}</li>
                        )}
                    </ul>
                </div>
                <hr />
            </div>;

        return (
            <div id="mdk" className="m-4">

                <h1>Ukesmeny</h1>

                <div className="options">
                    <span className="mr-1 badge badge-danger" onClick={this.randomWeek}>Random</span>
                    <span className="mr-1 badge badge-danger" onClick={this.randomWeek}>Random</span>
                    <span className="mr-1 badge badge-danger" onClick={this.randomWeek}>Random</span>
                    <span className="mr-1 badge badge-danger" onClick={this.randomWeek}>Random</span>
                </div>

                <div className="week-menu">
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

        const ingredients = this.getIngredients(days);
        this.setState({
            days,
            shoppingList: ingredients
        });
    }

    private getIngredients(days: IDay[]): IIngredient[] {
        let ingredients: IIngredient[] = [];
        days.map(day => {
            if (day.recipe !== null) {
                ingredients = ingredients.concat(day.recipe.ingredients)
            }
        });

        return ingredients;
    }

    private randomWeek = () => {
        api.get(`/api/recipes/random-week`)
            .then(response => {
                const recipes = response as IRecipe[];
                const days = this.state.days.map((day, i) => {
                    day.recipe = recipes[i];
                    return day;
                });

                const shoppingList = this.getIngredients(days);
                this.setState({ days, shoppingList });
            })
            .catch(error => console.log(error));
    }
}