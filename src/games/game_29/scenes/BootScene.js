import { Scene } from 'phaser'

export default class BootScene extends Scene {
  
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('loading_1', require('../assets/img/loadbg_i.png'))
    this.load.image('loading_2', require('../assets/img/loadbg_ii.png'))

  }

  create () {    
    this.scene.start('Preloader');
  }
}
