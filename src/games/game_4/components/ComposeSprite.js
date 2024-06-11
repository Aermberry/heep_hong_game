import Phaser
    from "phaser";
export default class ComposeSprite extends Phaser.GameObjects.Container {

    constructor(scene, x, y, backgroundTexture, objectTexture) {

        super(scene, x, y);

        this.setName("ComposeSprite");

        scene.add.existing(this);

        this.init(scene, backgroundTexture, objectTexture);

    }

    init(scene, backgroundTexture, objectTexture) {

        this.backgroundTexture = scene.add.image(0, 0, backgroundTexture).setName("background");
        this.backgroundTexture.setOrigin(0.5);
        this.backgroundTexture.setScale(0.5);

        this.objectTexture = scene.add.image(0, -this.backgroundTexture.displayHeight / 11, objectTexture).setName("objectTexture");
        this.objectTexture.setScale(0.4);

        this.setSize(this.backgroundTexture.displayWidth, this.backgroundTexture.displayHeight);
        this.add([this.backgroundTexture, this.objectTexture]);

    }

    showColorStatus() {
        this.backgroundTexture.setFrame(0);
        this.objectTexture.setFrame(0);

    }

    showMaskStatus() {
        this.backgroundTexture.setFrame(1);
        this.objectTexture.setFrame(1);
    }

}