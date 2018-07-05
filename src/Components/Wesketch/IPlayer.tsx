export interface IPlayer {
    clientId: string;
    userId: string;
    name: string;
    isReady: boolean;
    drawCount: number;
    isDrawing: boolean;
    guessedWord: boolean;
}