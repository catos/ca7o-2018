import { IRecipe } from "../../Models/IRecipe";

export interface IDay {
    name: string;
    recipe: IRecipe | null;
    selected: boolean;
}