import Phaser from 'phaser'

export default class ErrorRetryButton extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'showAnswerButton', 0);
        scene.add.existing(this);

        this.setInteractive({ useHandCursor: true }).on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                this.setFrame(1);

                this.onDownClicked(scene);
            }
        )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    this.setFrame(0);
                    this.onUpClicked(scene);
                }
            );
    }


    onDownClicked() {
        this.scene.sound.play('buttonEffectSound');
    }

    onUpClicked(scene) {

        scene.sound.stopByKey('gameSceneYouLose');
        scene.sound.stopByKey('dentistDrillEnvironmentSound');

        scene.scene.stop();
        scene.scene.run('Game');
    }
}