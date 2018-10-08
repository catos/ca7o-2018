export interface IPlayer {
    id: number;
    name: string;
    coins: number;
    cps: number;
    isDead: boolean;
    isComputer: boolean;

    soldiers: number;
    workers: number;

    update(dt: number): void;
    work(): void;
    attack(player: IPlayer, amount: number): void;

    cheatInCoins(amount: number) : void;
}