import { PhaseTypes } from "../Types/PhaseTypes";
import { IWesketchPlayer } from "./IWesketchPlayer";
import { IWesketchTimer } from "./IWesketchTimer";

export interface IWesketchGameState {
    debugMode: boolean;
    phase: PhaseTypes;
    players: IWesketchPlayer[];

    stop: boolean;
    round: number;
    timer: IWesketchTimer;
    currentWord: string;
    hintsGiven: number;

    primaryColor: string;
    secondaryColor: string;
    brushSize: number;
}