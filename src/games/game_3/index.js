import Phaser from 'phaser'
import config from './config'

import Model from './Model';
import BootScene from './scenes/BootScene'
import PreloaderScene from './scenes/PreloaderScene';
import TutorSecene from './scenes/TutorScene';

const gameConfig = Object.assign(config, {
    scene: [BootScene, PreloaderScene, TutorSecene]
});

class Game3 extends Phaser.Game {

    // private globals: { model: Model }

    constructor(config) {
        super(config);
        let model = new Model()
        this.globals = {
            model
        }
    }
}


function launch() {
    let game = new Game3(gameConfig)
    return game
}


export default launch
export { launch }
