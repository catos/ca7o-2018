import { IPlayer } from "./Player";

export class Ai {
    public update = (player: IPlayer, dt: number) => {
        player.update(dt);

        if (player.isDead) {
            return;
        }

        // Work
        if (player.coins < 10) {
            player.work();
        }

        // Recruit soldiers
        if (player.coins >= 10) {
            player.buy(1, 1);
        }
    }
}