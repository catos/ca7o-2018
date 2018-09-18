import { IDay } from './IDay';

import * as React from 'react';
import * as moment from 'moment';

import './Mdk.css';

import { MdkDay } from './MdkDay';
import { SearchResult } from './SearchResult';
import { IIngredient } from '../../Models/IIngredient';
import { IRecipe } from '../../Models/IRecipe';
import { api } from '../../Common/ApiService';
import { groupBy } from '../../Common/Utils';

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
                { name: 'Onsdag', recipe: null, selected: true },
                { name: 'Torsdag', recipe: null, selected: false },
                { name: 'Fredag', recipe: null, selected: false },
            ],
            shoppingList: [],
            showShoppingList: false
        }

        this.onDropReplaceRecipe = this.onDropReplaceRecipe.bind(this);
        this.onClickReplaceRecipe = this.onClickReplaceRecipe.bind(this);
    }

    public componentDidMount() {
        this.randomWeek();
    }

    public render() {
        const groupedShoppingList = this.state.shoppingList.length
            // ? [...groupBy<IIngredient>(this.state.shoppingList, 'type')[0]]
            ? this.state.shoppingList
            : [];

        const shoppingList = !this.state.showShoppingList
            ? ''
            : <div className="shopping-list">
                <h2>Handleliste:</h2>
                <div className="list">
                    {groupedShoppingList.map((type, idx) =>
                        <div key={idx}>
                            {type}
                        </div>
                        // <div key={idx}>{item.quantity} {item.unit} - {item.name}</div>
                    )}
                </div>
            </div>;

        return (
            <div id="mdk" className="m-4">

                <div className="header">
                    <span className="title mr-3">Meny - uke {moment().week()}</span>
                    <span className="fa fa-sync-alt mr-2" onClick={this.randomWeek} />
                    <span className="fa fa-shopping-cart" onClick={() => this.toggleShoppingList()} />
                </div>

                {shoppingList}

                <div className="week-menu">
                    {this.state.days.map((day, idx) =>
                        <MdkDay key={idx}
                            day={day}
                            onClick={() => this.selectDay(day)}
                            onDrop={this.onDropReplaceRecipe} />
                    )}
                </div>

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
            d.selected = false;
            if (d.name === day.name) {
                d.recipe = recipe;
                d.selected = true;
            }
            return d;
        });

        const ingredients = this.getShoppingList(days);
        this.setState({
            days,
            shoppingList: ingredients
        });
    }

    private getShoppingList(days: IDay[]): IIngredient[] {
        let ingredients: IIngredient[] = [];
        days.map(day => {
            if (day.recipe !== null) {
                ingredients = ingredients.concat(day.recipe.ingredients)
            }
        });

        // TODO: cleanup
        const ingredientsSumed = this.sumIngredients(ingredients, 'name');
        console.log('grouped by name and sum quantity: ', ingredientsSumed);

        const ingredientsGrouped = groupBy<IIngredient>(ingredientsSumed, 'type');
        for (const key in ingredientsGrouped) {
            if (ingredientsGrouped.hasOwnProperty(key)) {
                console.log(key, ingredientsGrouped[key]);
            }
        }
        // console.log('groupBy', ingredientsGrouped);

        return ingredientsSumed;
    }

    private sumIngredients = (ingredients: IIngredient[], prop: string): IIngredient[] => {
        const sums = ingredients.reduce(
            (map, item) => {
                const key = item[prop];
                const prev = map.get(key) as IIngredient;

                if (prev) {
                    prev.quantity += item.quantity;
                } else {
                    map.set(key, Object.assign({}, item));
                }

                return map;
            },
            new Map()
        );

        const result = [...sums.values()];
        // console.log(result);

        return result;
    }

    private randomWeek = () => {
        api.get(`/api/recipes/random-week`)
            .then(response => {
                const recipes = response as IRecipe[];
                const days = this.state.days.map((day, i) => {
                    day.recipe = recipes[i];
                    return day;
                });

                const shoppingList = this.getShoppingList(days);
                this.setState({ days, shoppingList });
            })
            .catch(error => console.log(error));
    }
}