import { IIngredient } from "./IIngredient";

export interface IRecipe {
    guid: string | null;
    created: number;
    name: string;
    tags: string[];
    thumbnail: string;
    url: string;
    description: string;
    time: number;
    ingredients: IIngredient[];
}