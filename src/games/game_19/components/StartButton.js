import Phaser from 'phaser'

export default class StartButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x, y);
        scene.add.existing(this);

        this.texture = scene.add.sprite(0, 0, 'startButton');

        this.setSize(this.texture.displayWidth, this.texture.displayHeight);

        this.add(this.texture);

        this.setInteractive({
                useHandCursor: true
            }).on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                    this.texture.setFrame(1);
                    this.onDownClicked();
                }
            )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    this.texture.setFrame(0);
                    // this._setFullScreen(scene);
                    this.onUpClicked();
                }
            )
    }

    onDownClicked() {
        this.scene.sound.play('buttonEffectSound');
    }

    onUpClicked() {
        this.scene.scene.start('GameUI');
    }

    _setFullScreen() {
        const fullscreenConfig = {
            navigationUI: 'hide'
        }

        const elem = document.querySelector('#game-container canvas');
        if (elem.requestFullscreen) {
            elem.requestFullscreen(fullscreenConfig);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen(fullscreenConfig);
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen(fullscreenConfig);
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen(fullscreenConfig);
        }
    }
}