import Phaser from 'phaser'
import EndSceneExitButton from './EndSceneExitButton'
import RetryButton from './RetryButton'

export default class DialogTipBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {

        super(scene, x, y, children);

        scene.add.existing(this);

        let dialogTipBox = scene.add.image(0, 0, 'dialogTipBox');

        this.add([
            dialogTipBox,
            scene.add.image(0, 0, 'bgTipBox').setScale(0.7),
            new RetryButton(scene, - dialogTipBox.width * 0.22, dialogTipBox.height * 0.35,'Tutor'),
            new EndSceneExitButton(scene, dialogTipBox.width * 0.22, dialogTipBox.height * 0.35)
        ])

    }
}