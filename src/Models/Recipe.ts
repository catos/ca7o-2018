import { IIngredient } from "./Ingredient";

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