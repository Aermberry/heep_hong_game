import BasicScene from './BasicScene'
import EndBroad from '../objects/EndGameBroad'

export default class EndScene extends BasicScene {

    constructor() {
        super({
            key: 'End'
        });

    }

    init() {
        this.dataModel = this.sys.game.globals.model;
    }

    create() {

        super.create();

        this.sys.game.globals.gtag.event((`game_${this.dataModel.gameStage}_end`, {'event_category': 'js_games', 'event_label': 'Game End'}))

        this.buildBg('bg_base')

        this.sound.stopByKey('lightBattle')

        let music = this.sound.add('jump')
        music.setLoop(true)
        music.play()

        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))

        this.add.existing(this.endBroad)

    }

}