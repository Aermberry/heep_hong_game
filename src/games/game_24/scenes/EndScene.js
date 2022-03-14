import BasicScene from './BasicScene'
import EndBroad from '../objects/EndGameBroad'

export default class EndScene extends BasicScene {

    constructor() {
        super({
            key: 'End'
        });

    }

    create() {

        super.create();
        let gameStage = this.sys.game.globals.model.gameStage;
        this.sys.game.globals.gtag.event(`game_${gameStage}_end`, {'event_category': 'js_games', 'event_label': 'Game End'})
        this.buildBg('end_bg')

        this.End_pic = this.sound.add('End_pic')
        this.End_pic.setLoop(false)
        this.End_pic.play()


        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))

        this.add.existing(this.endBroad)

    }

}