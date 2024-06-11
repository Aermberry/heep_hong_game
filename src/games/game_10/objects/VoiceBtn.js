import Button from "../phaser3_framework/ui/Button";
export default class VoiceBtn extends Button {

    constructor(scene, x, y, voiceName) {
        super(scene, x, y, 'voiceBtn');
        this.scene = scene;
        this.voiceList = voiceName.map(element => {
            return scene.sound.add(element);
        });
        this.isPlay = false;
        this.addButtonStatusListener();
        this.playAudioList(0);
    }

    onDownClicked() {
        this.texture.setFrame(1);
    }

    onUpClicked() {
        this.texture.setFrame(0);
        if(this.isPlay) {
            this.voiceList .forEach(element => { 
                element.pause();
                this.texture.setTexture('offVoiceBtn');
                this.isPlay = false;
            })
        } else {
            this.playAudioList(0);
        }
    }

    playAudioList(i) {
        if(i < this.voiceList.length) {
            this.voiceList[i].play();
            this.voiceList[i].on('complete', () => {
                this.playAudioList(i+1)
            });
        } 
    }

    addButtonStatusListener() {
        this.voiceList.forEach((element) => {
            element.on('play', () => {
                this.texture.setTexture('voiceBtn');
                this.isPlay = true;
            });
            element.on('complete', () => {
                this.texture.setTexture('offVoiceBtn');
                this.isPlay = false;
            });
        })



    }
}