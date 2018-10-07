export interface IPlayer {
    id: number;
    name: string;
    coins: number;
    cps: number;
    soldiers: number;
    isDead: boolean;
    isComputer: boolean;

    update(dt: number): void;
    work(): void;
    attack(player: IPlayer, amount: number): void;

    cheatInCoins(amount: number) : void;
}