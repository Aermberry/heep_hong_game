import Phaser from 'phaser'
import ExistBigBtn  from './ExistBigBtn'
import RetryBtn from './RetryBtn'

export default class EndGameBroad extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        let endBox = scene.add.image( 0, 0, 'end_box')



        scene.anims.create({
            key: 'end_pic', 
            frames: scene.anims.generateFrameNames('end_pic', { prefix: 'end_pic', start: 0, end: 39, zeroPad: 4 }),
        });


        let animate = scene.add.sprite(0, 0, 'end_pic')

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