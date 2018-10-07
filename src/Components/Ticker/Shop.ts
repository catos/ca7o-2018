export interface IItem {
    id: number;
    name: string;
    cost: number;
    craftingTime: number;
}

export const SHOP: IItem[] = [
    { id: 1, name: 'Train Soldier', cost: 10, craftingTime: 1500 }
];