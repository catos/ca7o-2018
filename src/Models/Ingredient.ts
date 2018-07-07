export enum IngredientTypes {
    Vegetables = 0,
    Fruit = 1,
    Grain = 2,
    Meat = 3,
    Dairy = 4,
    Spice = 5,
    Sauce = 6,
}

export interface IIngredient {
    quantity: number;
    unit: string;
    name: string;
    type: IngredientTypes
}