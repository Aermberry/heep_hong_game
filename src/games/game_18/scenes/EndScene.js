import BasicScene from './BasicScene'
import EndBroad from '../objects/EndGameBroad'
import SpeakerBtn from '../objects/SpeakerBtn'
import SpeakerBtnOff from '../objects/SpeakerBtnOff'
export default class EndScene extends BasicScene {

    constructor() {
        super({
            key: 'End'
        });
        this.stopAll = false;

    }

    preload() {
        this.anims.create({
            key: 'bearJob',
            delay: 200,
            frames: this.anims.generateFrameNames('bear_job', { prefix: 'bear1', start: 0, end: 12, zeroPad: 4 }),
            repeat: -1,
            duration: 5000
        });
        // this.cursorHandIcon = { img: require('../assets/yes.png'), data: require('../assets/yes.json') }
    }

    create() {

        super.create();
        let gameStage = this.sys.game.globals.model.gameStage;
        this.sys.game.globals.gtag.event(`game_${gameStage}_end`, { 'event_category': 'js_games', 'event_label': 'Game End' });
        this.buildBg('bg');
        this.add.image(this.getColWidth(3.8), this.getRowHeight(8.5), 'home');
        this.speakerBtn = new SpeakerBtn(this,this, this, 1820, 120, this.openSpeaker.bind(this));
        // this.speakerBtn.visible = false;
        this.speakerOffBtn = new SpeakerBtnOff(this, this, 1820, 120, this.offSpeaker.bind(this));
        this.endBroad = new EndBroad(this, this.cameras.main.displayWidth / 2, this.cameras.main.displayHeight / 2)
        this.bear_job = this.add.sprite(this.getColWidth(9), this.getRowHeight(2.2), 'bear_job');
        this.bearW = this.add.sprite(this.getColWidth(9), this.getRowHeight(5.8), 'bearW');

        this.add.existing(this.endBroad);
        this.add.existing(this.speakerBtn);
        this.add.existing(this.speakerOffBtn);

        this.add.existing(this.bearW);
        if (this.stopAll) {
            this.sound.stopAll();
            this.speakerBtn.visible = true;
            this.speakerOffBtn.visible = false;
        } else {
            this.musicStart = this.sound.add('end_pic');
            this.musicStart.setLoop(true);
            this.musicStart.play();
            this.speakerBtn.visible = false;
            this.speakerOffBtn.visible = true;
        }
        
    }

    openSpeaker() {
        this.speakerBtn.visible = false;
        this.speakerOffBtn.visible = true;
        this.music = this.sound.add('end_pic');
        this.music.setLoop(true);
        this.music.play();
        this.stopAll = false;
    }

    offSpeaker() {
        this.speakerBtn.visible = true;
        this.speakerOffBtn.visible = false;
        this.stopAll = true;
        this.sound.stopAll();
    }

}