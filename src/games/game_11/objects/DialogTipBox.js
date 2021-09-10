import Phaser from 'phaser'
import EndSceneExitBtn  from './EndSceneExitBtn'
import RetryBtn from './RetryBtn'

export default class DialogTipBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        let dialogTipBox = scene.add.image( 0, 0, 'dialogTipBox')

        let bgTipBox= scene.add.image(0,0, 'bgTipBox')
        bgTipBox.setScale(0.7)
    

        let retryBtn = new RetryBtn(scene, - dialogTipBox.width * 0.22, dialogTipBox.height * 0.35)
        let existBtn = new EndSceneExitBtn(scene, dialogTipBox.width * 0.22, dialogTipBox.height * 0.35)

        this.add([
            dialogTipBox,
            bgTipBox,
            retryBtn,
            existBtn
        ])

    }



}