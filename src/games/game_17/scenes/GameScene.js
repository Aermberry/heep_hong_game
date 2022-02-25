import BasicScene from "./BasicScene"
import Answers from "../objects/Answers";
import BlankRoad from "../objects/BlankRoad";
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
            key: 'L1_answer_failed2',
            delay: 200,
            frames: this.anims.generateFrameNames('L1_answer_failed2', { prefix: 'Symbol 1', start: 0, end: 29, zeroPad: 4 }),
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
            'line_road': require('../assets/img/road_line.png'),
            'road': require('../assets/img/road.png'),
            'blankRoad2': require('../assets/img/road2.png')
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
        let gameStage = this.dataModal.gameStage
        this.sys.game.globals.gtag.event(`game_${gameStage}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start'})

        this.sound.stopAll();
        this.hoverArea = [];

        this.buildBg('bg_L2');
        
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
   
        this.currentCar = parseInt(Math.random() * (6 - 1 + 1) + 1, 10);
        this.car = this.add.sprite(this.getColWidth(0.5), this.getRowHeight(4.5), `car_${this.currentCar}`).setDepth(10)

        let data = this.dataModal.gameItems;
        this.pastProblems.forEach((item) => {
            data = data.filter((problems) => {
                if (item.join('|') !== problems.join('|')) {
                    return problems
                }
            })
        })

        data.splice(data.indexOf(this.pastProblems), 0);
        let item = data[Math.floor(Math.random() * data.length)];
        this.pastProblems.push(item)

        this.answers = new Answers(this, this.getColWidth(1.7), this.getRowHeight(9.8), this.winnerCallBack.bind(this), item);
        this.blankRoad1 = new BlankRoad(this, this.getColWidth(4.34), this.getRowHeight(4.8));
        this.blankRoad2 = new BlankRoad(this, this.getColWidth(7.1), this.getRowHeight(7.5));
        this.add.existing(this.answers)
        this.add.existing(this.blankRoad1)
        // sky.play('sun');

        this.car.play(`car_${this.currentCar}_idle`) 
        // this.car.flipX = -1
        
        let exitBtn = new ExitBtn(this, 100, 120);
        this.doneBtn = new DoneBtn(this, this.getColWidth(10), this.getRowHeight(10))
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.5), 120, this.musicPause.bind(this));
        this.add.existing(exitBtn);
        this.add.existing(this.doneBtn);
        this.add.existing(this.speakerBtn);

    }

    winnerCallBack(flag) {
        this.music.pause();
        let music = this.sound.add('run')
        let run = this.sound.add(flag ? 'run' : 'erro_run');
        run.play();
        if (flag) {
            let correct = this.add.sprite(this.getColWidth(6), this.getRowHeight(4), 'correct_answer').setDepth(1000);
            correct.play('correct_answer');
            let child = this.sound.add('child_clap')
            child.play();
        }
        music.addMarker({
            name: 'run1',
            start: 2,
            duration: 5
        });
        music.play('run1')
        setTimeout(() => {
            this.endGame()
        }, 3400)
        this.car.play(`car_${this.currentCar}_run`);
        this.tweens.add({
            targets: this.car,
            x: 1200,
            duration: 1000,
            ease: 'Power2'
        }).on('complete', () => {
            this.tweens.add({
                targets: this.car,
                y: this.car.y + 100,
                duration: 200,
                ease: 'Power2'
            }).on('complete', () => {
                this.car.flipX = -1;
                this.tweens.add({
                    targets: this.car,
                    x: 600,
                    duration: 1000,
                    ease: 'Power2'
                }).on('complete', () => {
                    this.tweens.add({
                        targets: this.car,
                        y: this.car.y + 140,
                        duration: 200,
                        ease: 'Power2'
                    }).on('complete', () => {
                        this.car.flipX = 0
                        this.tweens.add({
                            targets: this.car,
                            x: 2000,
                            duration: 1000,
                            ease: 'Power2'
                        })
                    })
                })
            })
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