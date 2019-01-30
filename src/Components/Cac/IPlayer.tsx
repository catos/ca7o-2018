export interface IProperty {
    value: number;
    cost: number;
    timeRemaining: number;
    timeToUpgrade: number;
    inProgress: boolean;
}

export interface ICityBonuses {
    work: number;
    buildCost: number;
    buildTime: number;
    defence: number;
}

export interface ICity {
    level: IProperty;
    work: IProperty;
    bonuses: ICityBonuses;
    workers: IProperty;
}

export interface IArmy {
    level: IProperty;
    soldiers: IProperty;
    strengthBonus: number;
}

export interface IPlayer {
    socketId: string;
    name: string;
    coins: number;
    cpt: number;
    isDead: boolean;
    isComputer: boolean;
    city: ICity;
    army: IArmy;
}