import { Scene } from 'phaser'

export default class BootScene extends Scene {
  
  constructor () {
    super('Boot');
  }

  preload () {

    this.load.image('loading', require('../assets/img/loading.png'))

  }

  create () {    
    this.scene.start('Preloader');
  }
}
