import Phaser from 'phaser'
import ExistBigBtn  from './ExistBigBtn'
import RetryBtn from './RetryBtn'

export default class EndGameBroad extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        let endBox = scene.add.image( 0, 0, 'end_box').setScale(0.7)
        endBox.width = endBox.displayWidth
        endBox.height = endBox.displayHeight

        scene.anims.create({
            key: 'end_pic', 
            delay: 1000,
            repeat: 0,
            frames: scene.anims.generateFrameNames('end_pic', { prefix: 'Symbol 1', start: 0, end: 34, zeroPad: 4 }),
        });


        let animate = scene.add.sprite(0, 0, 'end_pic').setScale(1.1);

        let retryBtn = new RetryBtn(scene, - endBox.width * 0.22, endBox.height * 0.35)
        let existBtn = new ExistBigBtn(scene, endBox.width * 0.22, endBox.height * 0.35)
        animate.play('end_pic')

        this.add([
            endBox,
            animate,
            retryBtn,
            existBtn
        ])

    }



}