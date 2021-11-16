import Phaser from 'phaser'
import RetryBtn from './buttons/RetryBtn';
import ExistBigBtn from './buttons/ExistBigBtn';
export default class EndGameBroad extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        let endBox = scene.add.image( 0, 0, 'end_box')

        scene.anims.create({
            key: 'end_game_anime', 
            frames: scene.anims.generateFrameNames('end_pic', { prefix: 'end_pic', start: 0, end: 29, zeroPad: 4 }),
        });


        let animate = scene.add.sprite(0, 0, 'end_cat')
        // let bg = scene.add.image(0,0, 'end_pic_bg')
        // let fg = scene.add.image(0, bg.height *0.25 , 'end_pic_fg')

        // let retryBtn = new RetryBtn(scene, - endBox.width * 0.22, endBox.height * 0.35)
        // let existBtn = new ExistBigBtn(scene, endBox.width * 0.22, endBox.height * 0.35)

        
        let retryBtn = new RetryBtn(scene, - endBox.width * 0.22, endBox.height * 0.35)
        let existBtn = new ExistBigBtn(scene, endBox.width * 0.22, endBox.height * 0.35)

        animate.play('end_game_anime')

        this.add([
            endBox,
            // bg,
            animate,
            // fg,
            retryBtn,
            existBtn
        ])

    }



}