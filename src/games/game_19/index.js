import Phaser from 'phaser'
import config from './config'

// import Model from './Model'
import BootScene from './scenes/BootScene'
import PreloaderScene from './scenes/PreloaderScene'
import TutorScene from './scenes/TutorScene'
import GameScene from './scenes/GameScene'
import EndScene from './scenes/EndScene'
import RetryScene from './scenes/RetryScene'

const gameConfig = Object.assign(config, {
    scene: [BootScene, PreloaderScene,TutorScene, GameScene,EndScene,RetryScene]
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

    constructor(config, urlParams,gtag) {
        super(config);
        console.log(urlParams)
        
        this.globals = {
            bgMusic: null,
            gtag: gtag,
            gameStageIndex:urlParams
        }

        
    }
}


function launch(urlParams,gtag) {

    let game = new Game19(gameConfig, urlParams,gtag)

    return game
}


export default launch
export { launch }
