export interface IProperty {
    value: number;
    cost: number;
    time: number;
    inProgress: boolean;
}

export class City {
    public level: IProperty;
    public work: IProperty;

    constructor() {
        this.level = {
            value: 1,
            cost: 100,
            time: 10000,
            inProgress: false
        };
        this.work = {
            value: 1,
            cost: 0,
            time: 3000,
            inProgress: false
        };
    }
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
    city: City;
    army: IArmy;
    citizens: ICitizens;
}
