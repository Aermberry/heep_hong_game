import Phaser from 'phaser'
import config from './config'

import Model from './Model'
import BootScene from './scenes/BootScene'
import PreloaderScene from './scenes/PreloaderScene'
import TutorSecene from './scenes/TutorScene'
import GameScene from './scenes/GameScene'
import EndScene from './scenes/EndScene'

const gameConfig = Object.assign(config, {
    scene: [BootScene, PreloaderScene, TutorSecene, GameScene, EndScene]
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

class Game11 extends Phaser.Game {

    // private globals: { model: Model }

    constructor(config, urlParams, gtag) {
        super(config);
        let model = new Model()
        this.globals = {
            model,
            gtag
        }

        this.globals.model.gameStage = urlParams.id;
        this.globals.gtag = gtag
        
    }
}


function launch(urlParams, gtag) {

    let game = new Game11(gameConfig, urlParams, gtag)

    return game
}


export default launch
export { launch }
