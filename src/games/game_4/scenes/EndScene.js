import BasicScene from './BasicScene'
import GameEndDialog from '../components/DialogTipBox'
import { createEndAnimation } from '../assets/animations/EndAnimation';



export default class EndScene extends BasicScene {

    constructor() {
        super('End');

    }

    create() {

        super.create();
        createEndAnimation(this.anims);
        this.sound.stopAll();
        this.playBackgroundMusic("gameEndSceneBackgroundMusic");
        this.buildBackground('backgroundTutorEnd')

        this.endBroad = new GameEndDialog(this, this.getColWidth(6), this.getRowHeight(6));
        localStorage.clear()

    }

    playBackgroundMusic(sound){
        
        const backgroundMusic = this.sound.add(sound, {
            volume: 0.8,
            loop: true
        });
        
     
        backgroundMusic.play();
    }

}