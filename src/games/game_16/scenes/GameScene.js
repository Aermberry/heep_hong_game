import BasicScene from "./BasicScene"
import Answers from "../objects/Answers";
import BlankRoad from "../objects/BlankRoad";
import Phaser from "phaser";
import ExitBtn from '../objects/ExitBtn'
import DoneBtn from '../objects/DoneBtn'
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
        this.dataModal = this.sys.game.globals.model;

    }

    preload() {
        this.buildBg('bg_tutor')

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // let music = this.sound.add('drums')
        // music.setLoop(true)
        // music.play()
        this.anims.create({
            key: 'sun',
            delay: 200,
            frames: this.anims.generateFrameNames('sun', { prefix: 'sun', start: 0, end: 34, zeroPad: 4 }),
            repeat: -1
        });

        this.anims.create({
            key: 'addoil',
            delay: 200,
            frames: this.anims.generateFrameNames('addoil', { prefix: 'addoil', start: 0, end: 9, zeroPad: 4 }),
            repeat: 1
        });

        this.anims.create({
            key: 'remind',
            delay: 200,
            frames: this.anims.generateFrameNames('remind', { prefix: 'remind', start: 0, end: 9, zeroPad: 4 }),
            repeat: 0
        });

        this.anims.create({
            key: 'L2_answer_failed2',
            delay: 200,
            frames: this.anims.generateFrameNames('L2_answer_failed2', { prefix: 'Symbol 1', start: 0, end: 29, zeroPad: 4 }),
            repeat: 0
        });

        this.anims.create({
            key: 'less_happy',
            delay: 200,
            frames: this.anims.generateFrameNames('less_happy', { prefix: 'Symbol 1', start: 0, end: 29, zeroPad: 4 }),
            repeat: -1
        });

        this.anims.create({
            key: 'correct_answer',
            delay: 200,
            frames: this.anims.generateFrameNames('correct_answer', { prefix: 'Symbol 1', start: 0, end: 9, zeroPad: 4 }),
            repeat: 0
        });

        this.anims.create({
            key: 'car_1_idle',
            frames: this.anims.generateFrameNames('car_1_idle', { prefix: 'car1', start: 0, end: 6, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });

        this.anims.create({
            key: 'car_1_run',
            frames: this.anims.generateFrameNames('car_1_run', { prefix: 'run', start: 0, end: 8, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });


        this.anims.create({
            key: 'car_1_stop',
            frames: this.anims.generateFrameNames('car_1_stop', { prefix: 'stop', start: 0, end: 23, zeroPad: 4 }),
            repeat: 0,
            delay: 500
        });
        this.anims.create({
            key: 'car_2_idle',
            frames: this.anims.generateFrameNames('car_2_idle', { prefix: 'idle', start: 0, end: 6, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_2_run',
            frames: this.anims.generateFrameNames('car_2_run', { prefix: 'run', start: 0, end: 8, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_2_stop',
            frames: this.anims.generateFrameNames('car_2_stop', { prefix: 'stop', start: 0, end: 23, zeroPad: 4 }),
            repeat: 0,
            delay: 500
        });

        this.anims.create({
            key: 'car_3_idle',
            frames: this.anims.generateFrameNames('car_3_idle', { prefix: 'idle', start: 0, end: 6, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_3_run',
            frames: this.anims.generateFrameNames('car_3_run', { prefix: 'run', start: 0, end: 8, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_3_stop',
            frames: this.anims.generateFrameNames('car_3_stop', { prefix: 'stop', start: 0, end: 23, zeroPad: 4 }),
            repeat: 0,
            delay: 500
        });

        this.anims.create({
            key: 'car_4_idle',
            frames: this.anims.generateFrameNames('car_4_idle', { prefix: 'idle', start: 0, end: 6, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_4_run',
            frames: this.anims.generateFrameNames('car_4_run', { prefix: 'run', start: 0, end: 8, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_4_stop',
            frames: this.anims.generateFrameNames('car_4_stop', { prefix: 'stop', start: 0, end: 23, zeroPad: 4 }),
            repeat: 0,
            delay: 500
        });

        this.anims.create({
            key: 'car_5_idle',
            frames: this.anims.generateFrameNames('car_5_idle', { prefix: 'idle', start: 0, end: 6, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_5_run',
            frames: this.anims.generateFrameNames('car_5_run', { prefix: 'run', start: 0, end: 8, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_5_stop',
            frames: this.anims.generateFrameNames('car_5_stop', { prefix: 'stop', start: 0, end: 23, zeroPad: 4 }),
            repeat: 0,
            delay: 500
        });

        this.anims.create({
            key: 'car_6_idle',
            frames: this.anims.generateFrameNames('car_6_idle', { prefix: 'idle', start: 0, end: 6, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_6_run',
            frames: this.anims.generateFrameNames('car_6_run', { prefix: 'run', start: 0, end: 8, zeroPad: 4 }),
            repeat: -1,
            delay: 200

        });
        this.anims.create({
            key: 'car_6_stop',
            frames: this.anims.generateFrameNames('car_6_stop', { prefix: 'stop', start: 0, end: 23, zeroPad: 4 }),
            repeat: 0,
            delay: 500
        });

        const imageFiles = {
            'car_1': require('../assets/img/Car_1s.png'),
            'car_2': require('../assets/img/Car_2s.png'),
            'car_3': require('../assets/img/Car_3s.png'),
            'car_4': require('../assets/img/Car_4s.png'),
            'car_5': require('../assets/img/Car_5s.png'),
            'car_6': require('../assets/img/Car_6s.png'),
            'doneBtn': require('../assets/img/Done.png'),
            'bg_L1': require('../assets/img/bg_L1.png'),
            'bg_L2': require('../assets/img/bg_L2.png'),
            'road': require('../assets/img/road.png'),
            'blankRoad1': require('../assets/img/raod1.png')
        };

        const atlasFiles = {

        }

        const soundFiles = {
            '0': require('../assets/audio/level/Game16.17_101.mp3'),
            '1': require('../assets/audio/level/Game16.17_102.mp3'),
            '2': require('../assets/audio/level/Game16.17_103.mp3'),
            '3': require('../assets/audio/level/Game16.17_104.mp3'),
            '4': require('../assets/audio/level/Game16.17_105.mp3'),
            '5': require('../assets/audio/level/Game16.17_106.mp3'),
            '6': require('../assets/audio/level/Game16.17_107.mp3'),
            '7': require('../assets/audio/level/Game16.17_108.mp3'),
            '8': require('../assets/audio/level/Game16.17_109.mp3'),
            '9': require('../assets/audio/level/Game16.17_110.mp3'),
            '10': require('../assets/audio/level/Game16.17_111.mp3'),
            '11': require('../assets/audio/level/Game16.17_112.mp3'),
            '12': require('../assets/audio/level/Game16.17_113.mp3'),
            '13': require('../assets/audio/level/Game16.17_114.mp3'),
            '14': require('../assets/audio/level/Game16.17_115.mp3'),
            '15': require('../assets/audio/level/Game16.17_116.mp3'),
            '16': require('../assets/audio/level/Game16.17_117.mp3'),
            '17': require('../assets/audio/level/Game16.17_118.mp3'),
            '18': require('../assets/audio/level/Game16.17_119.mp3'),
            '19': require('../assets/audio/level/Game16.17_120.mp3')
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
        this.buildBg('bg_L1');
        let gameStage = this.dataModal.gameStage
        this.sys.game.globals.gtag.event(`game_${gameStage}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start' })
        this.hoverArea = [];
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

        this.disableInput = false;
        // let sky = this.add.sprite(this.getColWidth(8.5), this.getRowHeight(.5), 'sun')
        let y = this.getRowHeight(5.5);
        let startX = this.getColWidth(1.7);
        let points = [
            startX, y, 2200, y
        ];
        let curve = new Phaser.Curves.Spline(points);
        this.currentCar = parseInt(Math.random() * (6 - 1 + 1) + 1, 10);

        this.car = this.add.follower(curve, this.getColWidth(1), this.getRowHeight(5.5), `car_${this.currentCar}`).setDepth(10)
        this.car.play(`car_${this.currentCar}_idle`);


        let data = this.dataModal.gameItems;

        this.pastProblems.forEach((item) => {
            data = data.filter((problems) => {
                if (item.join('|') !== problems.join('|')) {
                    ``
                    return problems
                }
            })
        })

        // data.splice(data.indexOf(this.pastProblems), 0);
        let item = data[Math.floor(Math.random() * data.length)];
        this.index = this.dataModal.gameItems.indexOf(item)
        this.pastProblems.push(item)
        this.answers = new Answers(this, this.getColWidth(1.7), this.getRowHeight(9.8), this.winnerCallBack.bind(this), item);
        this.blankRoad = new BlankRoad(this, this.getColWidth(6), this.getRowHeight(6));
        this.add.existing(this.answers)
        this.add.existing(this.blankRoad)
        // sky.play('sun');
        let exitBtn = new ExitBtn(this, 100, 120);
        this.doneBtn = new DoneBtn(this, this.getColWidth(10), this.getRowHeight(10))
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.4), 120, this.musicPause.bind(this));
        this.add.existing(this.speakerBtn);

        this.add.existing(exitBtn);
        this.add.existing(this.doneBtn);
    }

    winnerCallBack(flag) {
        let run = this.sound.add(flag ? 'run' : 'erro_run');
        run.play();
        let text = this.sound.add(this.index);
        if (flag) {
            let correct = this.add.sprite(this.getColWidth(6), this.getRowHeight(4), 'correct_answer').setDepth(1000);
            correct.play('correct_answer');
            let child = this.sound.add('child_clap')
            child.play();
        }
        text.on('complete', () => {
            this.endGame();
        })
        this.car.play(`car_${this.currentCar}_run`).startFollow({
            duration: 3000,
            yoyo: false,
            repeat: 0,
            rotateToPath: true,
            verticalAdjust: true
        })

        setTimeout(() => {
            text.play();
        }, 3000);
    }

    endGame() {
        if (this.currentLevel == 5) {
            this.scene.start('End')
        } else {
            this.scene.start('Game', {
                level: this.currentLevel + 1,
                pastProblems: this.pastProblems
            })
        }
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