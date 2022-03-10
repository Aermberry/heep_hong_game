import Phaser from 'phaser'
import ExistBigBtn from './ExistBigBtn'
import RetryBtn from './RetryBtn'

export default class EndGameBroad extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        let bj = scene.add.rectangle(0, 0, 1920, 1280, 0xfffffff, 0.8)
        let endBox = scene.add.image(0, 0, 'end_box')

        scene.anims.create({
            key: 'end_pic',
            frames: scene.anims.generateFrameNames('end_pic', { prefix: 'end_pic', start: 0, end: 3, zeroPad: 4 }),
        });


        let animate = scene.add.sprite(26, -40, 'end_pic')

        let retryBtn = new RetryBtn(scene, - endBox.width * 0.22, endBox.height * 0.35)
        let existBtn = new ExistBigBtn(scene, endBox.width * 0.22, endBox.height * 0.35)

        animate.play('end_pic')
        let music = scene.sound.add('end_pic')
        music.setLoop(false)
        music.play()
        this.add([
            bj,
            endBox,
            animate,
            retryBtn,
            existBtn
        ])

    }



}