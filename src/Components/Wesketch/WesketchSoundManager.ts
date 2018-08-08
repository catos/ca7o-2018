import { Howl } from "howler";

interface ISound {
    name: string;
    sfx: Howl | null;
}

export class WesketchSoundManager {
    public sounds: ISound[];
    private sfx: any;

    constructor() {
        this.sounds = [];
    }

    public init = () => {
        this.sfx = {
            playerJoined: this.addSfx('SUCCESS TUNE Happy Sticks Short 01.wav'),
            playerReady: this.addSfx('TECH INTERFACE Computer Beeps 08.wav'),
            playerGuessedTheWord: this.addSfx('SUCCESS PICKUP Collect Beep 02.wav'),
            playerIsClose: this.addSfx('SUCCESS PICKUP Collect Beep 01.wav'),
            timerTension: this.addSfx('Time Strain.wav'),
        };

        this.sounds.push(
            { name: 'PlayerJoined', sfx: this.sfx.playerJoined },
            { name: 'PlayerReady', sfx: this.sfx.playerReady },
            { name: 'PlayerGuessedTheWord', sfx: this.sfx.playerGuessedTheWord },
            { name: 'PlayerIsClose', sfx: this.sfx.playerIsClose },
            { name: 'TimerTension', sfx: this.sfx.timerTension },

            // {
            //     // TODO: remove ?
            //     name: 'EndRoundNoCorrect',
            //     sfx: this.addSfx('SUCCESS TUNE Win Ending 09.wav')
            // },           
            // {
            //     // TODO: remove / replace sound ?
            //     name: 'EndGame',
            //     sfx: this.addSfx('SUCCESS TUNE Win Complete 07.wav')
            // },
        );



    }

    public play = (name: string, volume: number = 0.5) => {
        const sound = this.sounds.find(p => p.name === name);
        if (sound !== undefined) {
            if (sound.sfx !== null) {
                sound.sfx.volume(volume);
                sound.sfx.play();
            }
        } else {
            console.error(`Could not find sfx with name: ${name}`);            
        }
    }

    private addSfx = (name: string) => {
        return new Howl({
            src: ['/sounds/' + name],
            volume: 0.5
        });
    }
}