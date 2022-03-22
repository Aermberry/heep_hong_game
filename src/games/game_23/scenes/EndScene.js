import BasicScene from './BasicScene'
import VictoryDialog from '../components/DialogTipBox'



export default class EndScene extends BasicScene {

    constructor() {
        super('End');

    }

    create() {

        super.create();
        
        this.sys.game.globals.gtag.event(`game_${this.sys.game.globals.gameStageIndex}_end`, {'event_category': 'js_games', 'event_label': 'Game End'})

        // this.sound.stopAll();

        // this.playBackgroundMusic();

        this.buildBg('bgVictory');

        this.endBroad = new VictoryDialog(this, this.cameras.main.width/2 , this.cameras.main.height/2);
        
        localStorage.clear()

    }


    // playBackgroundMusic(){
    //     const backgroundMusic = this.sound.add('preloaderSceneGameEndSceneBackgroundMusic', {
    //         volume: 0.2,
    //         loop: true
    //     });

    //     backgroundMusic.play();
    // }

}