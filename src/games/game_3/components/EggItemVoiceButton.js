import Button from "../phaser3_framework/ui/Button";
import SoundOnPlayEvent from "../phaser3_framework/event/SoundOnPlayEvent"


export default class EggItemVoiceButton extends Button {

    constructor(scene, x, y, voiceIndexObject) {

        super(scene, x, y, 'voiceButton', 2);

        this.keywordVoice = scene.sound.add('voice' + voiceIndexObject.voiceIndex);
        this.voiceOver0 = scene.sound.add('voiceOver0');
        this.itemVoice = scene.sound.add('conclusionPhraseVoice' + voiceIndexObject.itemVoiceIndex);

        console.log({
            "keywordVoice": this.keywordVoice,
            "voiceOver0": this.voiceOver0,
            "conclusionPhraseVoice": this.itemVoice,
        })

        this.init();
    }

    init() {
        this.addButtonStatusListener();

        // SoundOnPlayEvent.on('updatePlayerOnPlayStatus', (value) => {
        //     value ? this.cancelListener() : this.enableListener();

        //     console.log({value})
        // });
    }

    onDownClicked() {
        this.texture.setFrame(this.keywordVoice.isPlay||this.voiceOver0.isPlay||this.itemVoice.isPlay ? 1 : 3);
    }

    onUpClicked() {
        this.texture.setFrame(2);
        // this.voice.play();

        this.itemVoice.once('complete', () => {
            this.voiceOver0.play();
        });

        this.voiceOver0.once('complete', () => {
            this.keywordVoice.play();
        })

        this.itemVoice.play();
    }

    addButtonStatusListener() {
        this.itemVoice.on('play', () => {
            SoundOnPlayEvent.emit("updateEggItemOnPlayStatus", true);
            this.texture.setFrame(0);
            console.log('play')
        });

        this.keywordVoice.on('complete', () => {
            SoundOnPlayEvent.emit("updateEggItemOnPlayStatus", false);
            this.texture.setFrame(2);
            console.log('complete')
        });
    }
}