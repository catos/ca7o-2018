export interface ICity {
    level: number;
}

export interface IArmy {
    level: number;
    strength: number;
    soldiers: number;
}

export interface ICitizens {
    level: number;
    efficiency: number;
    workers: number;
}

export interface IPlayer {
    id: number;
    name: string;
    coins: number;
    cps: number;
    isDead: boolean;
    isComputer: boolean;

    city: ICity;
    army: IArmy;
    citizens: ICitizens;

    update(dt: number): void;
    work(): void;
    attack(player: IPlayer, amount: number): void;

    cheatInCoins(amount: number) : void;
}