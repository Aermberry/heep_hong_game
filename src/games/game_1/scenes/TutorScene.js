import { Scene } from 'phaser'
import config from '../config/Config';
import ExitBtn from '../objects/ExitBtn';
import StartBtn from '../objects/StartBtn';

export default class TutorScene extends Scene {
  constructor () {
    super('Tutor');
  }

  init () {
    this.model = this.sys.game.globals.model;
  }

  preload () {
    let self = this

    let background = self.add.image(config.width/2, config.height/2, 'tutorBg').setOrigin(.5, .5)
    background.setDisplaySize(config.width, config.height)

    this.anims.create({
        key: 'tut1',
        frames: this.anims.generateFrameNames('tut1', { prefix: 'tut1', start: 0, end: 23, zeroPad: 4 }),
    });
    this.anims.create({
        key: 'tut2',
        frames: this.anims.generateFrameNames('tut2', { prefix: 'tut2', start: 0, end: 23, zeroPad: 4 }),
        duration: 2000
    });
    this.anims.create({
        key: 'tut3',
        frames: this.anims.generateFrameNames('tut3', { prefix: 'tut3', start: 0, end: 23, zeroPad: 4 }),
        duration: 1500
    });
    this.anims.create({
        key: 'tut4',
        frames: this.anims.generateFrameNames('tut4', { prefix: 'tut4', start: 0, end: 23, zeroPad: 4 }),
        duration: 2000
    });


  }

  create () {
    let self = this

    let tut1 = self.add.sprite(278, 430, 'tut1')
    let tut2 = self.add.sprite(760, 520, 'tut2')
    let tut4 = self.add.sprite(1600, 390, 'tut4')
    let tut3 = self.add.sprite(1190, 350, 'tut3')

    tut1.play('tut1').on("animationcomplete", function(){
      tut2.play('tut2').on("animationcomplete", function(){
        tut3.play('tut3').on("animationcomplete", function(){
          tut4.play('tut4')
        })
      })
    })

    let exitBtn = new ExitBtn(this, 120, 135);
    let startBtn = new StartBtn(this, config.width/2, config.height * 0.87);
    self.add.existing(exitBtn);
    self.add.existing(startBtn);
  }
}