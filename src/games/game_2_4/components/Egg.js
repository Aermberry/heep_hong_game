import Phaser from 'phaser'

export default class Egg extends Phaser.GameObjects.Container {

    constructor(scene, point, texture, objectTexture) {

        super(scene, point.x, point.y);

        this.image = texture;
        this.objectTexture = objectTexture;

        this.originPoint = { originPointX: point.x, originPointY: point.y }

        this.setName("Egg");

        scene.add.existing(this);
    }

    create(isEnableDraggable) {
        const background = this.scene.add.image(0, 0, this.image, 0).setScale(0.5).setName("background");
        const objectTexture = this.scene.add.sprite(0, 0, this.objectTexture).setScale(0.48).setName("texture");

        Phaser.Display.Align.In.Center(objectTexture, background, -10);

        this.scene.physics.add.existing(this);

        this.add(
            [background, objectTexture]
        )

        this.setSize(background.displayWidth, background.displayHeight);

        this.setInteractive();

        this.scene.input.setDraggable(this, isEnableDraggable);

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            gameObject.x = dragX;
            gameObject.y = dragY;

            console.log("dragX:%o;dragY:%o", dragX, dragY);
        });
    }


}