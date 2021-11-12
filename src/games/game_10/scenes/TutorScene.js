import BasicScene from "./BasicScene"
import StartBtn from "../objects/StartBtn"
import ExitBtn from '../objects/ExitBtn'

export default class TutorSecene extends BasicScene {

    constructor() {
        super({
            key: "Tutor"
        })
    }

    preload() {
        this.anims.create({
            key: 'tut1',
            delay: 200,
            frames: this.anims.generateFrameNames('tut1', { prefix: 'tut1', start: 0, end: 110, zeroPad: 4 }),
        });
        // this.anims.create({
        //     key: 'tut2',
        //     delay: 200,
        //     frames: this.anims.generateFrameNames('tut1', { prefix: 'tut1', start: 56, end: 119, zeroPad: 4 }),
        // });
        this.anims.create({
            key: 'tut3',
            delay: 200,
            frames: this.anims.generateFrameNames('tut3', { prefix: 'tut3', start: 0, end: 119, zeroPad: 4 }),
        });

    }

    create() {
        super.create();
        this.buildBg('bg')
        this.sound.stopAll();
        let music = this.sound.add('loading');
        music.play();
        let tut1 = this.add.sprite(this.getColWidth(5), this.getRowHeight(5), 'tut1')
        let tut3 = this.add.sprite(this.getColWidth(9.8), this.getRowHeight(5), 'tut3')

        this._repeatAnimate({tut1, tut3})
        
        let exitBtn = new ExitBtn(this, 120, 135);
        let startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(10.5));
        this.add.existing(exitBtn);
        this.add.existing(startBtn);

    }

    /**
     * @returns Promise
     */
    _repeatAnimate({tut1, tut2, tut3}) {
        tut1.play('tut1').once("animationcomplete", () => {
                tut3.play('tut3').once("animationcomplete", () => {
                    this._repeatAnimate({tut1, tut2, tut3});
                })
        })

    }

}