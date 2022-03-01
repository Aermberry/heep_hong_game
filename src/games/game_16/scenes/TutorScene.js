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
            frames: this.anims.generateFrameNames('tut1', { prefix: 'tut1', start: 0, end: 29, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'tut2',
            delay: 200,
            frames: this.anims.generateFrameNames('tut2', { prefix: 'tut2', start: 0, end: 38, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'tut3',
            delay: 200,
            frames: this.anims.generateFrameNames('tut3', { prefix: 'tut3', start: 0, end: 29, zeroPad: 4 }),
        });

    }

    create() {
        super.create();

        this.buildBg('bg_tutor')
        this.sound.stopAll();
        //Stop all sound, because game will return to this scene on retry.
        // this.sound.stopAll();

        let tut1 = this.add.sprite(this.getColWidth(3.5), this.getRowHeight(4.5), 'tut1')
        let tut2 = this.add.sprite(this.getColWidth(6.4), this.getRowHeight(5), 'tut2')
        let tut3 = this.add.sprite(this.getColWidth(9.5), this.getRowHeight(4), 'tut3')

        this._repeatAnimate({ tut1, tut2, tut3 })

        let exitBtn = new ExitBtn(this, 120, 135);
        let startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(10.5));
        this.add.existing(exitBtn);
        this.add.existing(startBtn);

    }

    /**
     * @returns Promise
     */
    _repeatAnimate({ tut1, tut2, tut3 }) {
        tut1.play('tut1').once("animationcomplete", () => {
            tut2.play('tut2').once("animationcomplete", () => {
                tut3.play('tut3').once("animationcomplete", () => {
                    this._repeatAnimate({ tut1, tut2, tut3 });
                })
            })
        })

    }

}