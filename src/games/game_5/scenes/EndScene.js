import BasicScene from './BasicScene'
import EndBroad from '../objects/EndGameBroad'
import SpeakerBtn from '../objects/SpeakerBtn'

export default class EndScene extends BasicScene {

    constructor() {
        super({
            key: 'End'
        });

    }

    init() {
        this.dataModel = this.sys.game.globals.model;
        this.gameMusic = null
    }

    create() {

        super.create();

        this.sys.game.globals.gtag.event(`game_${this.dataModel.gameStage}_end`, {'event_category': 'js_games', 'event_label': 'Game End'})

        this.buildBg('bg_base')

        this.sound.stopByKey('lightBattle')

        let music = this.sound.add('jump')
        music.setLoop(true)
        music.play()
        this.gameMusic = music

        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))

        this.add.existing(this.endBroad)

        this.speakerBtn = new SpeakerBtn(this, 1820, 120,this.musicPause.bind(this))
        this.add.existing(this.speakerBtn)

    }

    musicPause() {
        if (this.dataModel.bgMusicPlaying){
            this.dataModel.bgMusicPlaying = false
            this.gameMusic.pause()
        } else {
            this.dataModel.bgMusicPlaying = true
            this.gameMusic.resume()
        }

    }

}