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

    create() {

        super.create();
        let gameStage = this.sys.game.globals.model.gameStage;
        this.sys.game.globals.gtag.event(`game_${gameStage}_end`, {'event_category': 'js_games', 'event_label': 'Game End'})
        this.buildBg('end_bg')
        this.speakerBtn = new SpeakerBtn(this, this, 1820, 120, this.openSpeaker.bind(this));
        // this.speakerBtn.visible = false;
        this.speakerOffBtn = new SpeakerBtnOff(this, this, 1820, 120, this.offSpeaker.bind(this));

        // this.End_pic = this.sound.add('End_pic')
        // this.End_pic.setLoop(false)
        // this.End_pic.play()


        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6));
        this.add.existing(this.speakerBtn);
        this.add.existing(this.speakerOffBtn);

        this.add.existing(this.endBroad)

        if (this.stopAll) {
            this.sound.stopAll();
            this.speakerBtn.visible = true;
            this.speakerOffBtn.visible = false;
        } else {
            this.musicStart = this.sound.add('End_pic');
            this.musicStart.setLoop(true);
            this.musicStart.play();
            this.speakerBtn.visible = false;
            this.speakerOffBtn.visible = true;
        }

    }

    openSpeaker() {
        this.speakerBtn.visible = false;
        this.speakerOffBtn.visible = true;
        this.music = this.sound.add('End_pic');
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