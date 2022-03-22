import BasicScene from './BasicScene'
import GameEndDialog from '../components/DialogTipBox'
import { createEndAnimation } from '../assets/animations/EndAnimation';



export default class EndScene extends BasicScene {

    constructor() {
        super('End');

    }

    create() {

        super.create();

        this.sys.game.globals.gtag.event(`game_${this.sys.game.globals.gameStageIndex}_end`, {'event_category': 'js_games', 'event_label': 'Game End'});

        createEndAnimation(this.anims);
        
        this.buildBackground('backgroundTutorEnd')

        this.endBroad = new GameEndDialog(this, this.getColWidth(6), this.getRowHeight(6));
        localStorage.clear()

    }

}