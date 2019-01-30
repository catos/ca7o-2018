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
}

export interface IArmy {
    level: IProperty;
    soldiers: IProperty;
    strengthBonus: number;
}

export interface ICitizens {
    level: number;
    efficiency: number;
    workers: IProperty;
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
    citizens: ICitizens;
}

export interface IGameState {
    timer: number;
    ticks: number;
    phase: string;
    gameOver: boolean;
    players: IPlayer[];
}