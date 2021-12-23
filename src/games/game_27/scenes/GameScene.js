import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import Question from '../objects/Question'
import RtBtn from "../objects/RtBtn";
import LtBtn from "../objects/LtBtn";
import TrackZone from "../objects/TrackZone";
// import SpeakerBtn from '../objects/SpeakerBtn'
export default class GameScene extends BasicScene {
    constructor() {
        super({
            key: 'Game'
        });

    }


    init(data) {
        if (data.level) {
            this.pastProblems = data.pastProblems;
            this.currentLevel = data.level;
        } else {
            this.pastProblems = [];
            this.currentLevel = 1;
        }
        this.dataModal = this._gameData = require('../assets/json/game_data.json').gameData;

    }

    preload() {
        this.buildBg('bg_tutor')

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // let music = this.sound.add('drums')
        // music.setLoop(true)
        // music.play()
        // this.anims.create({
        //     key: 'sun',
        //     delay: 200,
        //     frames: this.anims.generateFrameNames('sun', { prefix: 'sun', start: 0, end: 34, zeroPad: 4 }),
        //     repeat: -1
        // });

        const imageFiles = {

        };

        const atlasFiles = {
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        });

        this.createProgressBar();
    }

    create() {
        super.create();
        this.buildBg('bg_L1');
        // this.sound.stopAll();
        // if (this.stopAll) {
        //     this.sound.stopAll();
        // } else {
        //     this.music = this.sound.add('bgm', {
        //         volume: 0.1
        //     })
        //     this.music.setLoop(true)
        //     this.music.play();
        // }
        new Question(this);
        new TrackZone(this,0,this.getRowHeight(6));
        let exitBtn = new ExitBtn(this, 100, 120);
        // this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.5), 120, this.musicPause.bind(this));
        let rtBtn = new RtBtn(this, this.getColWidth(10.6), this.getRowHeight(11));
        let ltBtn = new LtBtn(this, this.getColWidth(9.5), this.getRowHeight(11));

        this.add.existing(exitBtn);
        this.add.existing(rtBtn);
        this.add.existing(ltBtn);

    }



    musicPause() {
        this.stopAll = !this.stopAll;
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('bgm', {
                volume: 0.1
            });
            this.music.setLoop(true);
            this.music.play();
        }
    }


}