export interface IItem {
    id: number;
    name: string;
    cost: number;
    craftingTime: number;
    color: string;
    icon: string;
}

export const SHOP: IItem[] = [
    { id: 1, name: 'Train Soldier', cost: 10, craftingTime: 3000, color: 'btn-success', icon: 'fa fa-chess-knight' },
    { id: 2, name: 'Train Worker', cost: 5, craftingTime: 1000, color: 'btn-info', icon: 'fa fa-chess-pawn' }
];