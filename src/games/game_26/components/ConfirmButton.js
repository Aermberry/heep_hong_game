import Phaser from 'phaser'

export default class ConfirmButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y, correctAnswer, labelText) {

        super(scene, x, y);
        scene.add.existing(this);

        this.texture = scene.add.sprite(0, 0, 'confirmButton').setScale(0.5);

        this.setSize(this.texture.width, this.texture.height);

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
                    this.onUpClicked(correctAnswer, labelText);
                }
            )
    }

    onDownClicked() {

    }

    onUpClicked(correctAnswer, labelText) {
        console.log(this.checkAnswer(correctAnswer, labelText))
        this.emit('OnConfirmedEvent',this.checkAnswer(correctAnswer, labelText));
    }

    showLight() {
        this.texture.setFrame(2);
    }


    checkAnswer(correctAnswer, labelText) {
        return correctAnswer == labelText.text;
    }



}