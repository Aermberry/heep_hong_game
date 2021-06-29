import { Scene } from 'phaser'
import config from '../config/Config';
import Button from '../objects/Button';

export default class EndScene extends Scene {
  constructor () {
    super('End');
  }

  preload () {
    let self = this

    let background = self.add.image(config.width/2, config.height/2, 'endBg').setOrigin(.5, .5)
    background.setDisplaySize(config.width, config.height)

    self.add.image(config.width/2, config.height/2, 'endBoxBg').setOrigin(.5, .5)
    self.add.image(config.width/2, config.height/2 - 30, 'endPic1').setOrigin(.5, .5)

    self.replayButton = new Button(self, config.width/2 - 220, config.height/2 + 310, 'rplBtn')
    self.exitButton = new Button(self, config.width/2 + 220, config.height/2 + 310, 'extBtn')

  }

  create () {

  }
}