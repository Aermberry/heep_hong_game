import Phaser from 'phaser'

export default class Egg extends Phaser.GameObjects.Container {

    constructor(scene, x, y, texture) {

        super(scene, x, y);

        this.image = texture;
        this.originPoint = { originPointX: x, originPointY: y }

        scene.add.existing(this);
    }

    create(isEnableDraggable) {

        this.texture = this.scene.add.image(0, 0, this.image).setScale(0.5);
        this.sprite = this.scene.add.sprite(0, 0, this.image).setScale(0.5);

        this.scene.physics.add.existing(this);
        // Phaser.Display.Align.In.Center(this.labelText, this.texture);
        this.add(
            [this.texture, this.sprite]
        )

        this.setSize(this.texture.displayWidth, this.texture.displayHeight);

        this.setInteractive();

        this.scene.input.setDraggable(this, isEnableDraggable);

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            gameObject.x = dragX;
            gameObject.y = dragY;

            console.log("dragX:%o;dragY:%o", dragX, dragY);
        });
    }


}