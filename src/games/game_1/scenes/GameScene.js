import { Scene } from 'phaser'
import config from '../config/Config';
//import Button from '../objects/Button';
import ExitBtn from '../objects/ExitBtn';
import VoiceBtn from '../objects/VoiceBtn';

export default class GameScene extends Scene {
  constructor () {
    super('Game');
  }

  preload () {
    let self = this

    let stageBg = self.add.image(config.width/2, config.height/2, 'stageBg').setOrigin(.5, .5)
    stageBg.setDisplaySize(config.width, config.height)

    this.anims.create({
      key: 'char_create',
      frames: this.anims.generateFrameNames('char_leo', { prefix: 'frame', start: 0, end: 56 }),
      repeat: -1
    });

  }

  create () {
    let self = this
    self.add.image(115, 175, 'ltpBg')

    // let pnlBg = self.add.image(-330, config.height/2, 'pnlBg')
    // let ph1Bg = self.add.image(-150, config.height/2 - 125, 'ph1Bg')

    // self.tweens.add({
    //   targets: [pnlBg,ph1Bg],
    //   x: 585,
    //   ease: 'Power0',
    //   duration: 1000,
    //   onStart: function () { console.log('onStart'); console.log(arguments); },
    //   onComplete: function () { console.log('onComplete'); console.log(arguments); },
    // })


    let char = self.add.sprite(config.width/2 + 565, config.height/2 - 160, 'Char')
    char.play('char_create')

    let exitBtn = new ExitBtn(this, 120, 135);
    this.add.existing(exitBtn);

    let voiceBtn = new VoiceBtn(this, config.width -385, config.height -195);
    this.add.existing(voiceBtn);

  }
}
