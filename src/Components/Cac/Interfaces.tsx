export interface ICity {
    level: number;
    workTimer: number;
    isWorking: boolean;
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
    socketId: string;
    name: string;
    coins: number;
    cps: number;
    isDead: boolean;
    isComputer: boolean;
    city: ICity;
    army: IArmy;
    citizens: ICitizens;
}
