import { Scene } from 'phaser'

import bootBg from '../assets/title.png'

export default class BootScene extends Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('bootBg', bootBg);
  }

  create () {
    this.scene.start('Preloader');
  }
}
