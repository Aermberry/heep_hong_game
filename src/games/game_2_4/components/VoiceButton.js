import Button from "../phaser3_framework/dddd/Button";


export default class VoiceButton extends Button {

    constructor(scene, x, y, voiceName) {

        super(scene, x, y, 'voiceButton', 2);
        this.voice = scene.sound.add(voiceName);

        this.addButtonStatusListener();
    }

    onDownClicked() {
        this.texture.setFrame(this.voice.isPlay ? 1 : 3);
    }

    onUpClicked() {
        this.texture.setFrame(2);
        this.voice.play();
    }

    addButtonStatusListener() {

        this.voice.on('play', () => {
            this.texture.setFrame(0);
            console.log('play')
        });
        this.voice.on('complete', () => {
            this.texture.setFrame(2);
            console.log('complete')
        });

    }
}