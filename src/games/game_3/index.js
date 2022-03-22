import Phaser from 'phaser'
import config from './config'

import BootScene from './scenes/BootScene'
import PreloaderScene from './scenes/PreloaderScene'
import TutorScene from './scenes/TutorScene'
import GameScene from './scenes/GameScene'
import EndScene from './scenes/EndScene'
import GameUIScene from './scenes/GameUIScene'
import EndUIScene from './scenes/EndUIScene'


const gameConfig = Object.assign(config, {
    scene: [BootScene, PreloaderScene, TutorScene, GameScene, EndScene, GameUIScene,EndUIScene]
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

class Game3 extends Phaser.Game {

    constructor(config, urlParams, gtag) {

        super(config);

        this.globals = {
            gtag: gtag,
            gameStageIndex: urlParams.id
        }
    }
}


function launch(urlParams, gtag) {

    let game = new Game3(gameConfig, urlParams, gtag);

    return game
}


export default launch
export {
    launch
}