import Phaser from 'phaser'
import Config from './config/Config';
import GameScene from './scenes/GameScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloaderScene';
import TutorScene from './scenes/TutorScene';
import EndScene from './scenes/EndScene';
import Model from './Model';


/**
 * 
 * @param {*} loader 
 * 
 * An override to fix game audio not playing in mobile device.
 * https://github.com/photonstorm/phaser/issues/5696
 * 
 */
Phaser.Scenes.SceneManager.prototype.loadComplete = function (loader) {
  const scene = loader.scene
  if (this.game.sound && this.game.sound.onBlurPausedSounds) {
    this.game.sound.unlock()
  }
  this.create(scene)
}

class Game extends Phaser.Game {
  constructor() {
    super(Config);
    let model = new Model()
    this.globals = {
      model,
      bgMusic: null
    }
    this.scene.add('Boot', BootScene)
    this.scene.add('Preloader', PreloaderScene)
    this.scene.add('Tutor', TutorScene)
    this.scene.add('Game', GameScene)
    this.scene.add('End', EndScene)
    this.scene.start('Boot')
  }
}


function launch() {
  let game = new Game()
  return game
}

export default launch
export { launch }
