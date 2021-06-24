import { Scene } from 'phaser'
import config from '../config/Config';
import Button from '../objects/Button';

export default class GameScene extends Scene {
  constructor () {
    super('Game');
  }

  preload () {
    let self = this

    let stageBg = self.add.image(config.width/2, config.height/2, 'refBg').setOrigin(.5, .5)
    stageBg.setDisplaySize(config.width, config.height)

    this.exitTopButton = new Button(this, 120, 135, 'extSmBtn', 'extSmBtn')

    this.voicePlayButton = new Button(this, 120, 135, 'sndBtn', 'sndOnBtn')
    this.voicePlayButton = new Button(this, 120, 135, 'sndBtn', 'sndOnBtn')

  }

  create () {
  }
}
