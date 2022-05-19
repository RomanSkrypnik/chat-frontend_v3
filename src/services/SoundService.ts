import {Howl} from "howler";

export const soundUrl = process.env.PUBLIC_URL + '/sounds/mixkit-bell-notification-933.wav'

export class SoundService {

    static playSound() {
        const sound = new Howl({src: soundUrl});
        sound.play();
    }

}