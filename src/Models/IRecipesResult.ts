import { IRecipe } from "./IRecipe";

export interface IRecipesResult {
    count: number;
    totalPages: number;
    currentPage: number;
    take: number;
    recipes: IRecipe[];
}
