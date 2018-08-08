import { Howl } from "howler";

// interface IWesketchSounds {
//     playerJoined: Howl;
//     playerReady: Howl;
//     playerRightAnswers: Howl;
//     endRoundNoCorrect: Howl;
//     timerTension: Howl;
//     endGame: Howl;
// }
interface ISound {
    name: string;
    sfx: Howl;
}

export class WesketchSoundManager {
    public sounds: ISound[];
    // public sounds: IWesketchSounds;

    constructor() {
        this.sounds = [];
    }

    public init = () => {
        this.sounds.push(
            {
                name: 'PlayerJoined',
                sfx: this.addSfx('SUCCESS TUNE Happy Sticks Short 01.wav')
            },
            {
                name: 'PlayerReady',
                sfx: this.addSfx('TECH INTERFACE Computer Beeps 08.wav')
            },
            {
                name: 'PlayerGuessedTheWord',
                sfx: this.addSfx('SUCCESS PICKUP Collect Beep 03.wav')
            },
            {
                name: 'YouGuessedTheWord',
                sfx: this.addSfx('SUCCESS PICKUP Collect Beep 02.wav')
            },
            {
                name: 'PlayerGuessIsClose',
                sfx: this.addSfx('SUCCESS PICKUP Collect Beep 01.wav')
            },
            {
                // TODO: remove ?
                name: 'EndRoundNoCorrect',
                sfx: this.addSfx('SUCCESS TUNE Win Ending 09.wav')
            },
            {
                name: 'TimerTension',
                sfx: this.addSfx('Time Strain.wav')
            },
            {
                // TODO: remove / replace sound ?
                name: 'EndGame',
                sfx: this.addSfx('SUCCESS TUNE Win Complete 07.wav')
            },
        );
    }

    public play = (name: string) => {
        const sound = this.sounds.find(p => p.name === name);
        if (sound !== undefined) {
            sound.sfx.play();
        }
    }

    private addSfx = (name: string) => {
        return new Howl({
            src: ['/sounds/' + name],
            volume: 0.5
        });
    }
}

// const wesketchSoundManager = new WesketchSoundManager();
// export default wesketchSoundManager;