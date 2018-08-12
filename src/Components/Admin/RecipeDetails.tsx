import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { api } from '../../Common/ApiService';

export interface IRecipe {
    guid: string;
    created: number;
    name: string;
    tags: string[],
    thumbnail: string;
    description: string;
    time: number,
    ingredients: IIngredient[];
}

export interface IIngredient {
    quantity: number;
    unit: string;
    name: string;
    type: IngredientTypes;
}

export enum IngredientTypes {
    Vegetables = 0,
    Fruit = 1,
    Grain = 2,
    Meat = 3,
    Dairy = 4,
    Spice = 5,
    Sauce = 6,
    Canned = 7,
}

interface IProps extends RouteComponentProps<any> { }

interface IState {
    recipe: IRecipe;
}

export class RecipeDetails extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            recipe: {
                guid: '',
                created: -1,
                name: '',
                tags: [],
                thumbnail: '',
                description: '',
                time: -1,
                ingredients: []
            }
        };
    }

    public componentDidMount() {
        api.get(`/api/recipes/${this.props.match.params.id}`)
            .then(result => {
                const recipe = result as IRecipe;
                this.setState({ recipe });
            })
            .catch(error => console.log(error));
    }

    public render() {
        const { recipe } = this.state;

        return (
            <div>
                <h1>{recipe.name}...</h1>
            </div>
        );
    }
}