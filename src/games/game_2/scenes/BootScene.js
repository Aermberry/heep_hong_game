import { Scene } from 'phaser'

export default class BootScene extends Scene {

  constructor() {
    super('Boot');
  }

  preload() {

    this.load.image('backgroundPreloadingScene', require('../assets/images/background_preloading_scene.png'))
  }

  create() {
    this.scene.start('Preloader');
  }
}
