import BasicScene from './BasicScene'
import VictoryDialog from '../components/DialogTipBox'



export default class EndScene extends BasicScene {

    constructor() {
        super('End');

    }

    create() {

        super.create();

        this.sound.stopAll();

       
        this.playBackgroundMusic();

        this.buildBg('bgVictory')

        this.endBroad = new VictoryDialog(this, this.getColWidth(6), this.getRowHeight(6));
        localStorage.clear()

    }

    playBackgroundMusic(){
        const backgroundMusic = this.sound.add('preloaderSceneGameEndSceneBackgroundMusic', {
            volume: 0.2,
            loop: true
        });

        backgroundMusic.play();
    }

}