import { Scene } from 'phaser'

export default class BootScene extends Scene {
  
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('bg_title', require('../assets/images/Game_bg.png'))
    this.load.spritesheet('hintBtn', require('../assets/images/buttons/btn_target.png'), { frameWidth: 173, frameHeight: 187})
    this.load.spritesheet('backBtn', require('../assets/images/buttons/btn_out.png'), { frameWidth: 175, frameHeight: 187})
  }

  create () {
    this.dataModel = this.sys.game.globals.model;
    if(this.dataModel.sectionId && /[1-6]/.test(this.dataModel.sectionId)) {
        this.scene.start('Section_' + this.dataModel.sectionId)
    }else {
        this.scene.start('Preloader');
    }

  }
}