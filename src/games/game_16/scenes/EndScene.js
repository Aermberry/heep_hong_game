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

        this.buildBg('bg_L1')
        let gameStage = this.sys.game.globals.model.gameStage;

        this.sys.game.globals.gtag.event(`game_${gameStage}_end`, { 'event_category': 'js_games', 'event_label': 'Game End' })

        // this.sound.stopByKey('lightBattle')
        // let music = this.sound.add('jump')
        // music.setLoop(true)
        // music.play()
        this.sound.stopAll();
        this.music = this.sound.add('end_pic');
        this.music.setLoop(true);
        this.music.play();
        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))

        this.add.rectangle(0, 0, 10000, 10000, 0x0d6f3f, 0.9)
        this.add.existing(this.endBroad)
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.4), 120, this.musicPause.bind(this));
        this.add.existing(this.speakerBtn);
    }

    musicPause() {
        this.stopAll = !this.stopAll;
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('end_pic', {
                volume: 1
            });
            this.music.setLoop(true);
            this.music.play();
        }
    }

}