import Phaser from 'phaser'

export default class ErrorRetryButton extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'rplLongBtn', 0);
        scene.add.existing(this);

        this.setInteractive({ useHandCursor: true }).on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                console.log("down")

                this.setFrame(1);

                this.onDownClicked(scene);
            }
        )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    console.log("up")
                    this.setFrame(0);
                    this.onUpClicked(scene);
                }
            );
    }


    onDownClicked() {

    }

    onUpClicked(scene) {
        scene.scene.start('Game')
    }
}