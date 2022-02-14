import Egg from "./Egg";
import VoiceButton from "./VoiceButton";
import TweenAnimation from "../phaser3_framework/util/TweenAnimation"

export default class EggItem extends Egg {

    constructor(scene, point, texture, objectItem, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.index);

        this.objectName = objectItem.objectName;
        this.index = objectItem.index;
        this.point = point;
        this.FLoatTweenAnimation = null;


        this.setName("EggItem");
        this.create(isEnableDraggable);

        this.voiceButton = new VoiceButton(this.scene, -20, 120, "voiceItemObject" + objectItem.index);
        this.voiceButton.setScale(0.2);

        this.add(this.voiceButton);
    }

    setRemoveListener() {
        super.setRemoveListener();
        this.voiceButton.cancelListener();
    }

    setEnableListener() {
        super.setEnableDraggable()
        this.voiceButton.enableListener();
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
                    y: this.point.y + 10,
                }, {
                    duration: 500,
                    yoyo: true,
                    y: this.point.y - 10,
                }]
        });
        this.FLoatTweenAnimation = TweenAnimation.play(this.scene)
    }

    StopFLoatTweenAnimation() {
        this.FLoatTweenAnimation.stop();
    }

}