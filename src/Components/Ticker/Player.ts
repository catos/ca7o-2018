import { IPlayer, ICity, ICitizens, IArmy } from "./IPlayer";

export class Player implements IPlayer {
    public id: number;
    public name: string;
    public coins: number = 100;
    public cps: number = 1;
    public isDead: boolean = false;
    public isComputer: boolean;

    public city: ICity = {
        level: 1
    };
    public army: IArmy = { 
        level: 1,
        strength: 100,
        soldiers: 10,
    };
    public citizens: ICitizens = {
        level: 1,
        efficiency: 100,
        workers: 10,
    };

    constructor(id: number, name: string, isComputer: boolean = false) {
        this.id = id;
        this.name = name;
        this.isComputer = isComputer;
    }

    public update(dt: number): void {
        // Check if dead
        if (this.army.soldiers <= 0 && !this.isDead) {
            console.log(`${this.name} died!`);
            this.isDead = true;
        }

        // Update cps and coins
        this.cps = Math.floor(this.citizens.workers / 10);
        this.coins += this.cps;

        // console.log(`update called on player with id = ${this.id}`);
    }

    public work = () => {
        this.coins += 1;
    }

    public attack = (player: IPlayer, amount: number) => {

        if (player.isDead) {
            console.log(`${player.name} is already dead!`);
            return;
        }

        if (this.army.soldiers <= amount) {
            console.log(`${this.name} is unable to attack with ${amount} soldiers, he only has ${this.army.soldiers}`);
            return;
        }
        
        amount = amount > player.army.soldiers ? player.army.soldiers : amount;
        player.army.soldiers -= amount;
        console.log(`${this.name} attacks ${player.name} with ${amount} soldiers`);

        this.army.soldiers -= amount
        console.log(`${this.name} lost ${amount} soldiers during battle`);
    }

    public cheatInCoins = (amount: number) => {
        this.coins += amount;
    }
}
