import { IPlayer } from "./IPlayer";

export interface IGameState {
    timer: number;
    ticks: number;
    phase: string;
    gameOver: boolean;
    players: IPlayer[];
}