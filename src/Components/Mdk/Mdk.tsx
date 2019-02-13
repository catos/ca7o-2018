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
import { IngredientTypes } from '../../Models/IngredientTypes';

interface IIngredientsGroup {
    type: string;
    ingredients: IIngredient[];
}

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
        const shoppingListOutput = !this.state.showShoppingList
            ? ''
            : <div className="shopping-list">
                <h1>Handleliste</h1>
                <div className="list">
                    {this.getGroupedShoppingList().map((group, idx) =>
                        <div key={idx} className="list-group">
                            <h1>{group.type}</h1>
                            {group.ingredients.map((ingredient, iidx) =>
                                <div key={iidx}>
                                    {ingredient.quantity} {ingredient.unit}. <a href={`https://meny.no/Sok/?query=${ingredient.name}&expanded=products`}>{ingredient.name}</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>;

        return (
            <div id="mdk" className="m-4">

                <div className="header">
                    <span className="title mr-3">Meny - Uke {moment().week()}</span>
                    <div className="header-options">
                        <a href="#" onClick={this.randomWeek}><i className="fas fa-sync-alt" /></a>
                        <a href="#" className="ml-3" onClick={() => this.toggleShoppingList()}><i className="fas fa-shopping-cart" /> {this.state.shoppingList.length}</a>
                    </div>
                </div>


                {shoppingListOutput}

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

        return this.sumIngredients(ingredients, 'name');
    }

    private getGroupedShoppingList = (): IIngredientsGroup[] => {
        const result: IIngredientsGroup[] = [];
        const ingredientsGrouped = groupBy<IIngredient>(this.state.shoppingList, 'type');
        for (const key in ingredientsGrouped) {
            if (ingredientsGrouped.hasOwnProperty(key)) {
                result.push({
                    type: IngredientTypes[key] || 'Unknown',
                    ingredients: ingredientsGrouped[key]
                })
                // console.log(IngredientTypes[key], ingredientsGrouped[key]);
            }
        }

        return result;
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

                if (recipes.length < this.state.days.length) {
                    return;
                }

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