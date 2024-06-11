import soundOnPlayEvent from "../phaser3_framework/event/SoundOnPlayEvent";
import TweenAnimation from "../phaser3_framework/util/TweenAnimation";
import Egg from "./Egg";
import EggItemVoiceButton from "./EggItemVoiceButton";


export default class EggItem extends Egg {

    constructor(scene, point, texture, objectItem, voiceIndexObject, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.imageIndex);

        this.objectName = objectItem.object;
        this.index = voiceIndexObject.voiceIndex;
        
        this.setName("EggItem");
        this.create(isEnableDraggable);

        voiceIndexObject.itemVoiceIndex = objectItem.itemVoice;

        console.log({
            voiceIndexObject
        });

        // this.voiceButton = new VoiceButton(this.scene, -20, 120, "voice" + voiceIndexObject.voiceIndex);
        this.voiceButton = new EggItemVoiceButton(this.scene, -20, 120, voiceIndexObject);
        this.voiceButton.setScale(0.2);

        this.add(this.voiceButton);
    }



    setRemoveListener() {
        super.setDisableDraggableListener();
        this.voiceButton.cancelListener();
        this.off('pointerover');
        this.off('pointerout');
    }

    setEnableListener() {
        super.setEnableDraggable();
        this.voiceButton.enableListener();

        this.on('pointerover', function () {

            this.stopFLoatTweenAnimation()

        });

        this.on('pointerout', function () {

            this.playFLoatTweenAnimation()
        });
    }

    setOnPlayerListener() {
          soundOnPlayEvent.on('updatePlayerOnPlayStatus', (value) => {
              value ? this.setRemoveListener() : this.setEnableListener();

              console.log({
                  value
              })
          });
    }

    playFLoatTweenAnimation() {
        TweenAnimation.setTweenAnimation({
            targets: this,
            ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            loop: -1,
            tweens: [{
                duration: 500,
                yoyo: true,
                y: this.y + 10,
            }, {
                duration: 500,
                yoyo: true,
                y: this.y - 10,
            }]
        });
        this.FLoatTweenAnimation = TweenAnimation.play(this.scene)
    }

    stopFLoatTweenAnimation() {
        this.FLoatTweenAnimation.stop();
    }

}