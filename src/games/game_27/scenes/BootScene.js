import { Scene } from 'phaser'

export default class BootScene extends Scene {
  
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('bg_title1', require('../assets/img/title_1.png'))
    this.load.image('bg_title2', require('../assets/img/title_2.png'))

  }

  create () {    
    this.scene.start('Preloader');
  }
}
