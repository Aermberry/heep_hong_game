import BasicScene from './BasicScene'
import EndBroad from '../components/DialogTipBox'

export default class EndScene extends BasicScene {

    constructor() {
        super({
            key: 'End'
        });

    }

    create() {

        super.create();

        this.sys.game.globals.gtag.event(`game_${this.sys.game.globals.gameStageIndex}_end`, {'event_category': 'js_games', 'event_label': 'Game End'});

        this.sound.stopAll();

        this.buildBg('bgTutor')

        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))
        localStorage.clear()

        this.add.existing(this.endBroad)

        this.sound.play('gameEndHappyEnding');


    }

}