import { Scene } from 'phaser'

export default class BootScene extends Scene {
  
  constructor () {
    super('Boot');
  }

  preload () {

    this.dataModal = this.sys.game.globals.model;

    const bgTitleArr = {
      5: require('../assets/game5/Title.png'),
      6: require('../assets/game6/Title.png'),
      7: require('../assets/game7/Title.png'),
      8: require('../assets/game8/Title.png'),
      9: require('../assets/game9/Title.png'),
      21: require('../assets/game21/Title.png')
    }

    this.load.image('bg_title', bgTitleArr[this.dataModal.gameStage])

  }

  create () {    
    this.scene.start('Preloader');
  }
}
