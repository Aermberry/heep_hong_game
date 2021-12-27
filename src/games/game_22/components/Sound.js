export default class Sound {

    constructor(soundName, audioClip, volume) {

        this.soundName = soundName;
        this.audioClip = audioClip;
        this.volume = volume;
        this.scene = null;
    }

    setSource(scene) {
        this.scene = scene;
    }

    play() {

    }


}