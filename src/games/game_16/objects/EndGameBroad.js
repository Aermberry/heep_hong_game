import Phaser from 'phaser'
import ExistBigBtn  from './ExistBigBtn'
import RetryBtn from './RetryBtn'

export default class EndGameBroad extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        let endBox = scene.add.image( 0, 0, 'end_box')

        scene.anims.create({
            key: 'end_pic', 
            delay: 1000,
            repeat: 0,
            frames: scene.anims.generateFrameNames('end_pic', { prefix: 'Symbol 1', start: 0, end: 14, zeroPad: 4 }),
        });


        let animate = scene.add.sprite(0, 0, 'end_pic').setScale(0.8)
        // let bg = scene.add.image(0,0, 'end_pic_bg')
        // let fg = scene.add.image(0, bg.height *0.25 , 'end_pic_fg')

        let retryBtn = new RetryBtn(scene, - endBox.width * 0.20, endBox.height * 0.35)
        let existBtn = new ExistBigBtn(scene, endBox.width * 0.20, endBox.height * 0.35)

        // animate.displayWidth = 1000
        // animate.displayHeight = 1000

        animate.play('end_pic')

        this.add([
            endBox,
            // bg,
            // fg,
            animate,
            retryBtn,
            existBtn
        ])

    }



}