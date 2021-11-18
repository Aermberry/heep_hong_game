import BasicScene from "./BasicScene"
import Answers from "../objects/Answers";
import BlankRoad from "../objects/BlankRoad";
import Phaser from "phaser";
import ExitBtn from '../objects/ExitBtn'
import DoneBtn from '../objects/DoneBtn'
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

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        });

        this.createProgressBar();
    }

    create() {
        super.create();
        this.buildBg('bg_L1');
        this.hoverArea = [];

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
        let sky = this.add.sprite(this.getColWidth(8.5), this.getRowHeight(.5), 'sun')
        let y = this.getRowHeight(5.5);
        let startX = this.getColWidth(1.7);
        let points = [
            startX, y, 2200, y
        ];
        let curve = new Phaser.Curves.Spline(points);
        this.currentCar = parseInt(Math.random() * (6 - 1 + 1) + 1, 10);

        this.car = this.add.follower(curve, this.getColWidth(1), this.getRowHeight(5.5), `car_${this.currentCar}`).setDepth(10)
        this.car.play(`car_${this.currentCar}_idle`) 


        let data = this.dataModal.gameItems;

        this.pastProblems.forEach((item) => {
            data = data.filter((problems) => {
                if (item.join('|') !== problems.join('|')) {
                    return problems
                }
            })
        })

        // data.splice(data.indexOf(this.pastProblems), 0);
        let item = data[Math.floor(Math.random() * data.length)];
        this.pastProblems.push(item)
        this.answers = new Answers(this, this.getColWidth(1.7), this.getRowHeight(9.8), this.winnerCallBack.bind(this), item);
        this.blankRoad = new BlankRoad(this, this.getColWidth(6), this.getRowHeight(6));
        this.add.existing(this.answers)
        this.add.existing(this.blankRoad)
        sky.play('sun');
        let exitBtn = new ExitBtn(this, 120, 135);
        this.doneBtn = new DoneBtn(this, this.getColWidth(10), this.getRowHeight(10))
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11), 135, this.musicPause.bind(this));
        this.add.existing(exitBtn);
        this.add.existing(this.doneBtn);
        this.add.existing(this.speakerBtn);
    }

    winnerCallBack() {
        setTimeout(() => {
            this.endGame();
        }, 3000)
        this.car.play(`car_${this.currentCar}_run`).startFollow({
            duration: 3000,
            yoyo: false,
            repeat: 0,
            rotateToPath: true,
            verticalAdjust: true
        })
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