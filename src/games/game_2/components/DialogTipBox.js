import Phaser from 'phaser'
import EndSceneExitButton from './EndSceneExitButton'
import RetryButton from './RetryButton'

import GameSprite from '../components/GameSprite';

export default class DialogTipBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {

        super(scene, x, y, children);
        scene.add.existing(this);

        let dialogTipBox = scene.add.image(0, 0, 'gameEndDialogBox');

        this.setSize(dialogTipBox.width, dialogTipBox.height);



        // let endAnimation = new GameSprite(scene, 0, -40, 'endTexture').setScale(1.4);
        // endAnimation.play('endAnimation');

        let endAnimation = new GameSprite(scene, 0, -40, 'gameEndDialogBoxTexture')
        
        this.add([
            dialogTipBox,
            endAnimation,
            new RetryButton(scene, - dialogTipBox.width * 0.22, dialogTipBox.height * 0.35, 'Tutor'),
            new EndSceneExitButton(scene, dialogTipBox.width * 0.22, dialogTipBox.height * 0.35)
        ])

    }
}