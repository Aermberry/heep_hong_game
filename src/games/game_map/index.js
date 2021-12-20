import Phaser from 'phaser'
import config from './config'

import Model from './Model'
import BootScene from './scenes/BootScene'
import PreloaderScene from './scenes/PreloaderScene'
import MapScene from './scenes/MapScene'
import Section1Scene from './scenes/Section1Scene'
import Section2Scene from './scenes/Section2Scene'
import Section3Scene from './scenes/Section3Scene'
import Section4Scene from './scenes/Section4Scene'
import Section5Scene from './scenes/Section5Scene'
import Section6Scene from './scenes/Section6Scene'

const gameConfig = Object.assign(config, {
    scene: [BootScene, PreloaderScene, MapScene, Section1Scene, Section2Scene, Section3Scene, Section4Scene, Section5Scene, Section6Scene]
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

    constructor(config, urlParams, vueRouter) {
        super(config);
        let model = new Model(urlParams, vueRouter)
        this.globals = {
            model
        }
    }
}


function launch(urlParams, vueRouter) {

    let game = new GameMap(gameConfig, urlParams, vueRouter)

    return game
}


export default launch
export { launch }
