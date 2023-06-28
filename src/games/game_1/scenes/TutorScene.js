import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn';
import StartBtn from '../objects/StartBtn';

export default class TutorScene extends BasicScene {
  constructor() {
      super({
          key: "Tutor"
      })
  }

  preload () {

    this.anims.create({
        key: 'tut1',
        delay: 200,
        frames: this.anims.generateFrameNames('tut1', { prefix: 'tut1', start: 0, end: 23, zeroPad: 4 }),
    });
    this.anims.create({
        key: 'tut2',
        delay: 200,
        frames: this.anims.generateFrameNames('tut2', { prefix: 'tut2', start: 0, end: 23, zeroPad: 4 }),
        duration: 2000
    });
    this.anims.create({
        key: 'tut3',
        delay: 200,
        frames: this.anims.generateFrameNames('tut3', { prefix: 'tut3', start: 0, end: 23, zeroPad: 4 }),
        duration: 1500
    });
    this.anims.create({
        key: 'tut4',
        delay: 200,
        frames: this.anims.generateFrameNames('tut4', { prefix: 'tut4', start: 0, end: 23, zeroPad: 4 }),
        duration: 2000
    });


  }

  create () {
    super.create();

    this.buildBg('tutorBg')

    //Stop all sound, because game will return to this scene on retry.
    this.sound.stopAll();

    let tut1 = this.add.sprite(278, 430, 'tut1')
    let tut2 = this.add.sprite(760, 520, 'tut2')
    let tut4 = this.add.sprite(1600, 390, 'tut4')
    let tut3 = this.add.sprite(1190, 350, 'tut3')

    this._repeatAnimate({tut1, tut2, tut3, tut4})

    let exitBtn = new ExitBtn(this, 100, 120);
    let startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(10.5));
    this.add.existing(exitBtn);
    this.add.existing(startBtn);
  }

  /**
   * @returns Promise
   */
  _repeatAnimate({tut1, tut2, tut3, tut4}) {

    tut1.play('tut1').once("animationcomplete", () => {
      tut2.play('tut2').once("animationcomplete", () => {
        tut3.play('tut3').once("animationcomplete", () => {
          tut4.play('tut4').once("animationcomplete", () => {
            this._repeatAnimate({tut1, tut2, tut3, tut4})
          })
        })
      })
    })

  }
}