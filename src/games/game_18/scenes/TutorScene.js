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
            frames: this.anims.generateFrameNames('tut_1', { prefix: 'tut1', start: 0, end: 64, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'tut2',
            delay: 200,
            frames: this.anims.generateFrameNames('tut_2', { prefix: 'tut2', start: 0, end: 27, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'tut3',
            delay: 200,
            frames: this.anims.generateFrameNames('tut_3', { prefix: 'tut3', start: 0, end: 19, zeroPad: 4 }),
        });

        this.anims.create({
            key: 'tut4',
            delay: 200,
            frames: this.anims.generateFrameNames('tut_4', { prefix: 'tut4', start: 0, end: 32, zeroPad: 4 }),
        });

    }

    create() {
        super.create();

        this.buildBg('tutor_bg')
        //Stop all sound, because game will return to this scene on retry.
        // this.sound.stopAll();

        let tut1 = this.add.sprite(this.getColWidth(2), this.getRowHeight(6), 'tut_1')
        let tut2 = this.add.sprite(this.getColWidth(4.7), this.getRowHeight(4), 'tut_2')
        let tut3 = this.add.sprite(this.getColWidth(7.2), this.getRowHeight(6), 'tut_3')
        let tut4 = this.add.sprite(this.getColWidth(9.7), this.getRowHeight(4), 'tut_4')
        tut1.setDisplaySize(400,400);
        tut2.setDisplaySize(400,400);
        tut3.setDisplaySize(400,400);
        tut4.setDisplaySize(400,400);
        this._repeatAnimate({ tut1, tut2, tut3, tut4 });

        let exitBtn = new ExitBtn(this, 120, 135);
        let startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(10.5));
        this.add.existing(exitBtn);
        this.add.existing(startBtn);

    }

    /**
     * @returns Promise
     */
    _repeatAnimate({ tut1, tut2, tut3, tut4 }) {

        tut1.play('tut1').once("animationcomplete", () => {
            tut2.play('tut2').once("animationcomplete", () => {
                tut3.play('tut3').once("animationcomplete", () => {
                    tut4.play('tut4').once("animationcomplete", () => {
                        this._repeatAnimate({ tut1, tut2, tut3, tut4 });
                    })

                })
            })
        })

    }

}