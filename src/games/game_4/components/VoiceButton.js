import Button from "../phaser3_framework/ui/Button";
import SoundOnPlayEvent from "../phaser3_framework/event/SoundOnPlayEvent"


export default class VoiceButton extends Button {

    constructor(scene, x, y, voiceName) {

        super(scene, x, y, 'voiceButton', 2);
        this.voice = scene.sound.add(voiceName);

        this.init();
    }

    init() {
        this.addButtonStatusListener();

        SoundOnPlayEvent.on('updatePlayerOnPlayStatus', (value) => {
            console.log(value);
            console.log(this);
             value ? super.cancelListener() : super.enableListener(); 
            //  value ? this.cancelListener() : this.enableListener(); 
            });
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
            SoundOnPlayEvent.emit("updateEggItemOnPlayStatus", true);
            this.texture.setFrame(0);
            console.log('play')
        });
        this.voice.on('complete', () => {
            SoundOnPlayEvent.emit("updateEggItemOnPlayStatus", false);
            this.texture.setFrame(2);
            console.log('complete')
        });

    }
}