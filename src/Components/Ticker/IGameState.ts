import { IPlayer } from "./IPlayer";

export interface IGameState {
    stopGame: boolean;
    now: number;
    dt: number;
    dtAcc: number;
    last: number;
    step: number;
    ticks: number;
    players: IPlayer[],
    log: string[]
}
