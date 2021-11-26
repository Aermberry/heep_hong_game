import Phaser from 'phaser'
import ExistBigBtn from './ExistBigBtn'
import RetryBtn from './RetryBtn'

export default class EndGameBroad extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {
        super(scene, x, y, children);

        // let bj = scene.add.rectangle(0, 0, 1920, 1280, 0xfffffff, 0.8)
        let endBox = scene.add.image(0, 0, 'end_box');
        endBox.setDisplaySize(900, 900);

        let retryBtn = new RetryBtn(scene, - endBox.width * 0.15, endBox.height * 0.21);
        let existBtn = new ExistBigBtn(scene, endBox.width * 0.15, endBox.height * 0.21);

        this.add([
            endBox,
            retryBtn,
            existBtn
        ])

    }



}