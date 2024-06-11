import Phaser from 'phaser'

export default class RetryButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y,targetScene) {

        super(scene, x, y);
        this.targetScene = targetScene;
        scene.add.existing(this);

        this.texture = scene.add.sprite(0, 0, 'retryButton');

        this.setSize(this.texture.displayWidth, this.texture.displayHeight);

        this.add(this.texture);

        this.setInteractive({ useHandCursor: true }).on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                console.log("down")
                this.texture.setFrame(1);
                this.scene.sound.play('buttonEffectSound');
                this.onDownClicked();
            }
        )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    console.log("up")
                    this.texture.setFrame(0);
                    this.onUpClicked();
                }
            )
    }

    onDownClicked() {
        this.scene.scene.start(this.targetScene).stop('Game');
    }

    onUpClicked() {

    }
}