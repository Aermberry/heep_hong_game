import TweenAnimation from "../phaser3_framework/util/TweenAnimation";
import Egg from "./Egg";
import VoiceButton from "./VoiceButton";

export default class EggItem extends Egg {

    constructor(scene, point, texture, objectItem, voiceIndex, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.imageIndex);

        this.objectName = objectItem.object;
        this.index = voiceIndex;


        this.setName("EggItem");
        this.create(isEnableDraggable);

        this.voiceButton = new VoiceButton(this.scene, -20, 120, "voice" + voiceIndex);
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

    playFLoatTweenAnimation() {
        TweenAnimation.setTweenAnimation({
            targets: this,
            ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            loop: -1,
            tweens: [
                {
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