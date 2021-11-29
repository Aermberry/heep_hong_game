import Phaser from 'phaser'
import { ClipTweenAnimationStatus } from './ClipTweenAnimationStatus';
export default class DownControllerButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y, step, clip) {

        super(scene, x, y);
        scene.add.existing(this);

        this.step = step;

        this.scene = scene;
        this.clipBox = null;
        this.tempContainer = scene.add.container(0, 0);
        this.texture = scene.add.sprite(0, 0, 'buttonMoveDownControl');

        this.setSize(this.texture.width, this.texture.height);

        this.add(this.texture);

        this.setInteractive({ useHandCursor: true }).on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                console.log("down")
                this.texture.setFrame(1);
                if (this.clipBox == null && ClipTweenAnimationStatus.IdleAnimationStatus == clip.currentAnimationState) {
                    this.onDownClicked(scene, clip);
                }
            }
        )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    console.log("up")
                    this.texture.setFrame(0);
                    this.onUpClicked();
                }
            );

        clip.addListener('onCollided', this.onCollideHandler, this);


    }

    onDownClicked(scene, clip) {
        clip.playTweenAnimation(ClipTweenAnimationStatus.FallingTweenAnimationStatus, scene, { target: clip, y: 150, duration: 1000 });

        scene.time.addEvent({
            delay: 1500,
            callback: () => {
                this.moveClip(scene, clip);
            }
        })
    }

    onUpClicked() {
        console.log("father on up")
    }

    onCollideHandler(gameObject) {
        this.clipBox = gameObject;

    }

    moveClip(scene, clip) {
        let target;
        let positionY;

        if (this.clipBox != null) {
            target = this.clipBox;
            positionY = -200;
        } else {
            target = clip;
            positionY = -250;
        }

        scene.add.tween({
            targets: target,
            y: positionY,
            duration: 1000,
            ease: 'Power2',
        })

        if (this.clipBox != null) {
            scene.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.clipBox.getAll().forEach(element => {

                        element.disableBody(this);

                        element.setY(element.y + positionY);
                        this.tempContainer.add(element);
                    });

                    this.clipBox.destroy();

                    if (this.tempContainer.count() > 0) {
                        this.toTargetPosition(scene, this.tempContainer)
                    }
                }
            })
        }
    }

    toTargetPosition(scene, clipBox) {
        // scene.physics.world.enableBody(clipBox);

        scene.playLayer.add(clipBox);

        let position = JSON.parse(localStorage.getItem('holeImagePosition'));
        let distanceX = position.x - clipBox.getByName('Clip').x;
        let distanceY = position.y - clipBox.getByName('Clip').y - 500;

        console.log({distanceX})
        console.log({distanceY})
        localStorage.setItem('targetPosition', JSON.stringify({ 'x': distanceX, 'y': distanceY }));


        scene.tweens.timeline(
            {
                targets: clipBox,
                ease: 'Power2',
                duration: 1000,
                tweens: [
                    {
                        x: distanceX,
                    },

                    {
                        y: distanceY,
                    }
                ],
                onComplete: function () {
                    clipBox.getByName('Clip').emit('onCompleteAnimation', clipBox);
                }
            });
    }
}