import Phaser from 'phaser'


export default class ResetButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y, answerArea) {

        super(scene, x, y);

        scene.add.existing(this);

        this.texture = scene.add.sprite(0, 0, 'resetButton').setScale(0.5);
        this.answerArea = answerArea;

        this.setSize(this.texture.width, this.texture.height);

        this.setName("ResetButton");

        this.add(this.texture);

        this.setInteractive({ useHandCursor: true }).on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                console.log("down")
                this.texture.setFrame(1);
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

        this.input.enabled = false;

    }

    onDownClicked() {
        this.scene.sound.play('buttonEffectSound');
    }

    onUpClicked() {
        // this.scene.scene.restart();
        this.answerArea.emit('onResetClickedEvent', "dsadsadsadsa");
    }
}