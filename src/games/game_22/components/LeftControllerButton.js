import Phaser from 'phaser'
import { ClipTweenAnimationStatus } from './ClipTweenAnimationStatus';
import TweenAnimation from './TweenAnimation';
export default class LeftControllerButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y, step, gameController, dolls) {

        super(scene, x, y);
        scene.add.existing(this);

        this.step = step;
        this.scene = scene;
        this.gameController = gameController;
        this.texture = scene.add.sprite(0, 0, 'buttonMoveLeftControl');

        this.setSize(this.texture.width, this.texture.height);

        this.add(this.texture);

        this.setInteractive({ useHandCursor: true }).on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                console.log("down")
                this.texture.setFrame(1);
                this.onDownClicked(scene, dolls);
            }
        )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    console.log("up")
                    this.texture.setFrame(0);
                    this.onUpClicked();
                }
            );

        this.gameController.addListener('onCollided', this.onCollideHandler, this);
    }

    onDownClicked(scene, dolls) {
        this.sound.play('buttonEffectSound');
        if (this.gameController.name != "onSandwiched" && ClipTweenAnimationStatus.IdleAnimationStatus == this.gameController.currentAnimationState) {

            this.gameController.currentAnimationState = ClipTweenAnimationStatus.MovingTweenAnimationStatus;

            let nextDollIndex = scene.currentDollIndex - 1;

            if (nextDollIndex >= 0) {
                
                TweenAnimation.playHorizontalDirectionTweenAnimation(scene, this.gameController, dolls[nextDollIndex].x, 1000, () => {
                    scene.currentDollIndex = nextDollIndex;
                    this.gameController.currentAnimationState = ClipTweenAnimationStatus.IdleAnimationStatus;
                });

            } else {
                scene.currentDollIndex = 0;
                this.gameController.currentAnimationState = ClipTweenAnimationStatus.IdleAnimationStatus;
            }

        }
    }

    onUpClicked() {
        console.log("father on up")
    }

    onCollideHandler(gameObject) {
        this.gameController = gameObject;

    }




}