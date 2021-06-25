import { Scene } from 'phaser'
import config from '../config/Config';
import Button from '../objects/Button';

export default class GameScene extends Scene {
  constructor () {
    super('Game');
  }

  preload () {
    let self = this

    let stageBg = self.add.image(config.width/2, config.height/2, 'stageBg').setOrigin(.5, .5)
    stageBg.setDisplaySize(config.width, config.height)

  }

  create () {
    let self = this
    let pnlBg = self.add.image(-330, config.height/2, 'pnlBg')
    let ph1Bg = self.add.image(-150, config.height/2 - 125, 'ph1Bg')


    self.add.image(115, 175, 'ltpBg')
    self.tweens.add({
      targets: [pnlBg,ph1Bg],
      x: 585,
      ease: 'Power0',
      duration: 1000,
      onStart: function () { console.log('onStart'); console.log(arguments); },
      onComplete: function () { console.log('onComplete'); console.log(arguments); },
    })


    self.exitTopButton = new Button(this, 120, 135, 'extSmBtn')

    self.voiceBg = self.add.image(config.width -385, config.height -195, 'sndBg')
    self.voiceButton = new Button(this, config.width -260, config.height -190, 'sndBtn')

  }
}
