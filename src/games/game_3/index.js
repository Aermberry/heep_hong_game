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

class Game3 extends Phaser.Game {

    // private globals: { model: Model }

    constructor(config, urlParams) {
        super(config);
        let model = new Model()
        this.globals = {
            model
        }

        this.globals.model.gameStage = urlParams.sid; 
    }
}


function launch(urlParams) {

    let game = new Game3(gameConfig, urlParams)

    return game
}


export default launch
export { launch }
