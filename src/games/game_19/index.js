import Phaser from 'phaser'
import config from './config'

// import Model from './Model'
import BootScene from './scenes/BootScene'
import PreloaderScene from './scenes/PreloaderScene'
import TutorScene from './scenes/TutorScene'
import GameScene from './scenes/GameScene'
import EndScene from './scenes/EndScene'

const gameConfig = Object.assign(config, {
    scene: [BootScene, PreloaderScene,TutorScene, GameScene,EndScene]
});

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

class Game19 extends Phaser.Game {

    // private globals: { model: Model }

    constructor(config, urlParams) {
        super(config);
        console.log(urlParams)
        // let model = new Model()
        this.globals = {
            bgMusic: null
        }

        // this.globals.model.gameStage = urlParams.sid;
    }
}


function launch(urlParams) {

    let game = new Game19(gameConfig, urlParams)

    return game
}


export default launch
export { launch }
