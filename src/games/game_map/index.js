import Phaser from 'phaser'
import config from './config'

import Model from './Model'
import BootScene from './scenes/BootScene'
import PreloaderScene from './scenes/PreloaderScene'
import MapScene from './scenes/MapScene'
import SectionScene from './scenes/SectionScene'

const gameConfig = Object.assign(config, {
    scene: [BootScene, PreloaderScene, MapScene, SectionScene]
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

class GameMap extends Phaser.Game {

    // private globals: { model: Model }

    constructor(config, urlParams) {
        super(config);
        let model = new Model()
        this.globals = {
            model
        }

        this.globals.model.gameStage = urlParams.id;
    }
}


function launch(urlParams) {

    let game = new GameMap(gameConfig, urlParams)

    return game
}


export default launch
export { launch }
