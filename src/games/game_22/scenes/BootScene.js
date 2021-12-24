import { Scene } from 'phaser'

export default class BootScene extends Scene {
  
  constructor () {
    super('Boot');
  }

  preload () {

    this.load.image('bgLoadingGame', require('../assets/images/bg_loading_game.png'))
  }

  create () {    
    this.scene.start('Preloader');
  }
}
