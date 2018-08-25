import { IngredientTypes } from "./IngredientTypes";

export interface IIngredient {
    _id: string;
    quantity: number;
    unit: string;
    name: string;
    type: IngredientTypes
}