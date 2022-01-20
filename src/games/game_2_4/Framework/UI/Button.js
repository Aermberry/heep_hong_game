import Phaser from 'phaser'

export default class Button extends Phaser.GameObjects.Container {

    constructor(scene, x, y, texture, frameIndex) {

        super(scene, x, y);
        scene.add.existing(this);
        this.setDepth(100);
        this.texture = scene.add.sprite(0, 0, texture, frameIndex);

        this.setSize(this.texture.displayWidth, this.texture.displayHeight);

        this.add(this.texture);

        this.enableListener();
    }

    onDownClicked() {

    }

    onUpClicked() {

    }

    setScale(scale) {
        this.texture.setScale(scale);
        this.setSize(this.texture.width, this.texture.height);
    }

    cancelListener() {
        this.texture.disableInteractive();
        this.texture.off(Phaser.Input.Events.GAMEOBJECT_POINTER_UP);
        this.texture.off(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN);
    }

    enableListener() {
        this.texture.setInteractive({ useHandCursor: true });


        this.texture.on(
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
}