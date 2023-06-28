import Phaser from 'phaser'
import {
    ButtonStatus
} from './ButtonStatus';
import {
    ClipTweenAnimationStatus
} from './ClipTweenAnimationStatus';
import TweenAnimation from './TweenAnimation';
export default class RightControllerButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y, step, gameController, dolls) {

        super(scene, x, y);
        scene.add.existing(this);

        this.step = step
        this.dolls = dolls;
        this.gameController = gameController;
        this.texture = scene.add.sprite(0, 0, 'buttonMoveRightControl');
        this.buttonStatus = ButtonStatus.up;

        this.setSize(this.texture.width, this.texture.height);

        this.add(this.texture);

        this.setInteractive({
                useHandCursor: true
            }).on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    console.log("down")

                    this.onDownClicked(scene, dolls);
                }
            )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    console.log("up")
                    
                    this.onUpClicked();
                }
            )

        this.gameController.addListener('onCollided', this.onCollideHandler, this);
    }

    onDownClicked() {

        this.texture.setFrame(1);

        if (this.buttonStatus == ButtonStatus.up) {
            this.scene.sound.play('buttonEffectSound');
            this.buttonStatus = ButtonStatus.down;
        }

        if (this.gameController.name != "onSandwiched" && ClipTweenAnimationStatus.IdleAnimationStatus == this.gameController.currentAnimationState) {

            this.gameController.currentAnimationState = ClipTweenAnimationStatus.MovingTweenAnimationStatus;
            const clipMovementEffectSound = this.scene.sound.add('clipMovementEffectSound');

            let nextDollIndex = this.scene.currentDollIndex + 1;

            if (nextDollIndex <= 2) {

                TweenAnimation.playHorizontalDirectionTweenAnimation(this.scene, this.gameController, this.dolls[nextDollIndex].x, 1000, () => this.onHorizontalDirectionTweenAnimationStartEventCallback(clipMovementEffectSound),
                    () => this.onHorizontalDirectionTweenAnimationCompleteEventCallback(this.scene, nextDollIndex, this.gameController, clipMovementEffectSound));



            } else {
                this.scene.currentDollIndex = 2;
                this.gameController.currentAnimationState = ClipTweenAnimationStatus.IdleAnimationStatus;
            }


        }
    }

    onHorizontalDirectionTweenAnimationStartEventCallback(sound) {
        sound.play();
    }

    onHorizontalDirectionTweenAnimationCompleteEventCallback(scene, nextDollIndex, gameController, sound) {
        scene.currentDollIndex = nextDollIndex;
        gameController.currentAnimationState = ClipTweenAnimationStatus.IdleAnimationStatus;
        sound.stop();
    }

    onUpClicked() {
         this.texture.setFrame(0);
         this.buttonStatus = ButtonStatus.up;
    }

    onCollideHandler(gameObject) {
        this.gameController = gameObject;

    }


}