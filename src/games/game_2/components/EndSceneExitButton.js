import Phaser from 'phaser'

export default class EndSceneExitButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x, y);
        scene.add.existing(this);

        this.texture = scene.add.sprite(0, 0, 'gameEndExitButton');

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
                    this.onUpClicked();
                }
            )
    }

    onDownClicked() {
        this.scene.sound.play('buttonEffectSound');
        
    }

    onUpClicked() {
        window.history.back();
    }
}