import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import Question from '../objects/Question'
import RtBtn from "../objects/RtBtn";
import LtBtn from "../objects/LtBtn";
import TrackZone from "../objects/TrackZone";
import GoBtn from "../objects/goBtn";
import SpeakerBtn from '../objects/SpeakerBtn'
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
        this.dataModal = this.sys.game.globals.model.gameData;

    }

    preload() {
        this.buildBg('bg_tutor')

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // let music = this.sound.add('drums')
        // music.setLoop(true)
        // music.play()

        this.anims.create({
            key: 'wow_car',
            delay: 200,
            frameRate: 8,
            frames: this.anims.generateFrameNames('wow_car', { prefix: 'Symbol 1', start: 0, end: 12, zeroPad: 4 }),
            repeat: 0
        });
        this.anims.create({
            key: 'answer',
            delay: 200,
            frameRate: 8,
            frames: this.anims.generateFrameNames('answer', { prefix: 'Symbol 1', start: 0, end: 17, zeroPad: 4 }),
            repeat: 0
        });


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
        this.sound.stopAll();
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('bgm', {
                volume: 0.1
            })
            this.music.setLoop(true)
            this.music.play();
        }
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
        this.trackZone = new TrackZone(this, 0, this.getRowHeight(6));
        this.question = new Question(this);
        let exitBtn = new ExitBtn(this, 100, 120);
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.5), 120, this.musicPause.bind(this));
        this.rtBtn = new RtBtn(this, this.getColWidth(10.6), this.getRowHeight(11));
        this.ltBtn = new LtBtn(this, this.getColWidth(9.5), this.getRowHeight(11));
        this.goBtn = new GoBtn(this, 1690, 385);
        this.add.existing(this.speakerBtn);
        this.add.existing(this.goBtn);
        this.add.existing(exitBtn);
        this.add.existing(this.rtBtn);
        this.add.existing(this.ltBtn);

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