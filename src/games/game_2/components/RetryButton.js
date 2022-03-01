import Phaser from 'phaser'

export default class RetryButton extends Phaser.GameObjects.Container {

    constructor(scene, x, y,targetScene) {

        super(scene, x, y);
        this.targetScene = targetScene;
        scene.add.existing(this);

        this.texture = scene.add.sprite(0, 0, 'retryButton');

        this.setSize(this.texture.width, this.texture.height);

        this.add(this.texture);

        this.setInteractive({ useHandCursor: true }).on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.texture.setFrame(1);
                this.onDownClicked();
            }
        )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    this.texture.setFrame(0);
                    this.onUpClicked();
                }
            )
    }

    onDownClicked() {
        this.scene.sound.play('buttonEffectSound');
        
    }

    onUpClicked() {
        this.scene.scene.start(this.targetScene)
    }
}