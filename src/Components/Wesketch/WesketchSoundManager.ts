import { Howl } from "howler";

export class WesketchSoundManager {
    public volume: number;
    private sounds: Howl;

    constructor() {
        this.volume = 0.5;
        this.sounds = new Howl({
            preload: true,
            src: ['/sounds/sounds.mp3'],
            sprite: {
                playerGuessedTheWord: [0, 554],
                playerIsClose: [2000, 613],
                playerJoined: [3000, 283],
                playerReady: [10000, 791],
                timerTension: [11000, 30790]

            },
            volume: this.volume
        });

        this.sounds.on('fade', () => {
            this.sounds.stop();
            this.sounds.volume(this.volume);
        });
    }

    public play = (name: string, volume: number = -1) => {
        const v = volume === -1 ? this.volume : volume;
        const id = this.sounds.play(name);
        this.sounds.volume(v, id);
    }

    public fade = () => {
        this.sounds.fade(this.volume, 0, 3000);
    }
}