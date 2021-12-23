import Phaser from 'phaser'
import EndSceneExitButton from './EndSceneExitButton'
import RetryButton from './RetryButton'
// import { createVictoryAnimations } from '../assets/animations/VictoryAnimation';
import GameSprite from '../components/GameSprite';

export default class DialogTipBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {

        super(scene, x, y, children);
        scene.add.existing(this);

        let dialogTipBox = scene.add.image(0, 0, 'gameEndDialogBox');

        this.setSize(dialogTipBox.width, dialogTipBox.height);

        // createVictoryAnimations(scene.anims);

        let victoryAnimation= new GameSprite(scene, 25, -20, 'questionPicture2').setScale(0.3);
        // victoryAnimation.play('victoryAnimation');
        this.add([
            dialogTipBox,
            victoryAnimation,
            new RetryButton(scene, - dialogTipBox.width * 0.22, dialogTipBox.height * 0.35, 'Tutor'),
            new EndSceneExitButton(scene, dialogTipBox.width * 0.22, dialogTipBox.height * 0.35)
        ])

    }
}