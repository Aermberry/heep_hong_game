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
            frames: this.anims.generateFrameNames('tut1', { prefix: 'tutbx1', start: 0, end: 39, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'tut2',
            delay: 200,
            frames: this.anims.generateFrameNames('tut2', { prefix: 'tutbx2', start: 0, end: 39, zeroPad: 4 }),
        });

        this.anims.create({
            key: 'tut1_lv3',
            delay: 200,
            frames: this.anims.generateFrameNames('tut1_lv3', { prefix: 'bx1', start: 0, end: 39, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'tut2_lv3',
            delay: 200,
            frames: this.anims.generateFrameNames('tut2_lv3', { prefix: 'bx2', start: 0, end: 39, zeroPad: 4 }),
        });
    }

    create() {
        super.create();

        this.buildBg('bg_tutor')
        this.sound.stopAll();
        //Stop all sound, because game will return to this scene on retry.
        // this.sound.stopAll();
        this.gameNum = this.sys.game.globals.model.game;
        let tut2 = this.add.sprite(this.getColWidth(8), this.getRowHeight(5), `tut2${this.gameNum == 30 ? '_lv3' : ''}`)
        let tut1 = this.add.sprite(this.gameNum == 30 ? this.getColWidth(6.2) : this.getColWidth(5),this.gameNum == 30 ? this.getRowHeight(3.5) : this.getRowHeight(4.5), `tut1${this.gameNum == 30 ? '_lv3' : ''}`)

        this._repeatAnimate({ tut1, tut2 })

        let exitBtn = new ExitBtn(this, 120, 135);
        let startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(10.5));
        this.add.existing(exitBtn);
        this.add.existing(startBtn);

    }

    /**
     * @returns Promise
     */
    _repeatAnimate({ tut1, tut2 }) {
        tut1.play(`tut1${this.gameNum == 30 ? '_lv3' : ''}`).once("animationcomplete", () => {
            tut2.play(`tut2${this.gameNum == 30 ? '_lv3' : ''}`).once("animationcomplete", () => {
                this._repeatAnimate({ tut1, tut2 });
            })
        })

    }

}