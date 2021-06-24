import { Scene } from 'phaser'
import config from '../config/Config';
import Button from '../objects/Button';

export default class TitleScene extends Scene {
  constructor () {
    super('Title');
  }

  preload () {
    let self = this

    let background = self.add.image(config.width/2, config.height/2, 'tutorBg').setOrigin(.5, .5)
    background.setDisplaySize(config.width, config.height)

    this.startButton = new Button(this, config.width/2, config.height * 0.87, 'strBtn', '', 'Game')

    this.exitTopButton = new Button(this, 120, 135, 'extSmBtn')

  }

  create () {
  }
}