import BasicScene from './BasicScene'
import EndBroad from '../objects/EndGameBroad'
import SpeakerBtn from '../objects/SpeakerBtn'

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

        this.buildBg('cover_bg')
        this.sound.stopAll();
        this.music = this.sound.add('end_pic');
        this.music.play();
        // this.sound.stopByKey('lightBattle')
        // let music = this.sound.add('jump')
        // music.setLoop(true)
        // music.play()
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.30), 120, this.musicPause.bind(this), 'end_pic');
        this.add.existing(this.speakerBtn);
        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))
        this.add.existing(this.endBroad)        

    }

    musicPause() {
        this.stopAll = !this.stopAll;
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('end_pic');
            this.music.setLoop(true);
            this.music.play();
        }
    }

}