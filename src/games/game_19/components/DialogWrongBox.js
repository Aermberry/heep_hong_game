import Phaser from 'phaser'
import ErrorRetryButton from './ErrorRetryButton';

export default class DialogWrongBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x, y);

        scene.add.existing(this);
        this.scene = scene;
        this.boxTexture = scene.add.image(0, 0, 'dialogWrongBox').setScale(0.5);
        this.setDepth(1);

        let errorRetryButton = new ErrorRetryButton(scene, 0, 230);

        this.add([this.boxTexture, errorRetryButton]);
    }

    setAlignCenter() {
        this.setPosition(this.errorBackground.displayWidth / 2, this.errorBackground.displayHeight / 2);
    }
}