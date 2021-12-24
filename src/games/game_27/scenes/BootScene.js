import { Scene } from 'phaser'

export default class BootScene extends Scene {
  
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('bg_title', require('../assets/img/title_1.png'))

  }

  create () {    
    this.scene.start('Preloader');
  }
}