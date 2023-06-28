import { Scene } from 'phaser'

export default class BootScene extends Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('bootBg', require('../assets/title.png'));
  }

  create () {
    this.scene.start('Preloader');
  }
}
