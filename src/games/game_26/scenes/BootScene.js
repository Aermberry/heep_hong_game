import { Scene } from 'phaser'

export default class BootScene extends Scene {

  constructor() {
    super('Boot');
  }

  preload() {

    this.load.image('backgroundPreloadingScene', require('../assets/images/background_preloading_scene.png'))

    this.load.atlas('loadingTitleTexture',require('../assets/atlas/atlas_loading_title.png'),require('../assets/atlas/atlas_loading_title.json'))
  }

  create() {
    this.scene.start('Preloader');
  }
}
