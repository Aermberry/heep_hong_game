import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import Question from '../objects/Question'
import RtBtn from "../objects/RtBtn";
import LtBtn from "../objects/LtBtn";
import TrackZone from "../objects/TrackZone";
import GoBtn from "../objects/goBtn";
import SpeakerBtn from '../objects/SpeakerBtn'
import config from '../config/index'
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
            frames: this.anims.generateFrameNames('wow_car', { prefix: 'Symbol 1', start: 0, end: 13, zeroPad: 4 }),
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
            'end_box': require('../assets/img/end_box.png'),
            '4w_car1': require('../assets/img/4w_car1.png'),
            '4w_car2': require('../assets/img/4w_car2.png'),
            '4w_car3': require('../assets/img/4w_car3.png'),
            '4w_car4': require('../assets/img/4w_car4.png'),
            '4w_car5': require('../assets/img/4w_car5.png'),
            '4w_car6': require('../assets/img/4w_car6.png'),
            '6w_car1': require('../assets/img/6w_car1.png'),
            '6w_car2': require('../assets/img/6w_car2.png'),
            '6w_car3': require('../assets/img/6w_car3.png'),
            '13w_car1': require('../assets/img/13w_car1.png'),
            '13w_car2': require('../assets/img/13w_car2.png'),
            'car_box': require('../assets/img/car_box.png'),
        };

        const atlasFiles = {
        }


        const soundFiles = {
            'bgm': require('../assets/audio/Circus Theme(loop).mp3'),
            'buttonOnClcik': require('../assets/audio/comedy_pop_finger_in_mouth_002.mp3'),
            'drop': require('../assets/audio/HAMMER, WAR 81.mp3'),
            'goButtonOnClcik': require('../assets/audio/School Bell (short).mp3'),
            'winnerSound': require('../assets/audio/css1_lift1.mp3'),
            'errorSound': require('../assets/audio/css1_launch2.mp3'),
            'winnerSound2': require('../assets/audio/Roller Coaster Ride 1 (short).mp3'),
            'endpic': require('../assets/audio/Waltzing Circus (short).mp3')
        }

        this.gameNum = this.sys.game.globals.model.game;
        //目前只有20題，如有更改再改變該方法
        let i =0;
        while(i<20) {
            soundFiles[i] =  require(`../assets/audio/item/Game27.28_${this.gameNum == 27 ? '1': '2'}${i < 9 ? '0' + (i + 1) : i+1 }.mp3`);
            i++;
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles,
            sound: soundFiles
        });

        // this.createProgressBar();
        let self = this;
        self.progressBar = self.add.graphics();
        self.loadingText = self.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff'
            }
        });
        self.loadingText.setOrigin(0.5, 0.5);
    
        self.load.on('progress', function (value) {
          self.progressBar.clear();
          self.progressBar.fillStyle(0xFC8EFA, 1);
          self.progressBar.fillRect(config.width * 0.118, config.height * 0.92, (config.width * 0.778) * value, 10);
        });
    
        self.load.on('complete', function () {
          self.loadingText.setText('連接完成');
        }.bind(self));
    }

    create() {
        super.create();
        let gameStage = this.sys.game.globals.model.game
        this.sys.game.globals.gtag.event(`game_${gameStage}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start' })

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
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.4), 120, this.musicPause.bind(this));
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