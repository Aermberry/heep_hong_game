import BasicScene from "./BasicScene"
import Answers from "../objects/Answers";
import BlankRoad from "../objects/BlankRoad";
import Phaser from "phaser";
import ExitBtn from '../objects/ExitBtn'

export default class GameScene extends BasicScene {
    constructor() {
        super({
            key: 'Game'
        });

    }


    init() {
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
        this.buildBg('bg_L2');
        this.disableInput = false;
        let sky = this.add.sprite(this.getColWidth(8.5), this.getRowHeight(.5), 'sun')
        let y = this.getRowHeight(4.5);
        let startX = this.getColWidth(0.5);
        let points = [
            startX, y, 1200, y, 1100, y + 100, 700, y + 100, 700 , y + 240, 2000, y + 240
        ];
        let curve = new Phaser.Curves.Spline(points);
        this.car = this.add.follower(curve, this.getColWidth(0.5), this.getRowHeight(4.5), `car_${parseInt(Math.random() * (6 - 1 + 1) + 1, 10)}`).setDepth(10)
        this.answers = new Answers(this, this.getColWidth(1.7), this.getRowHeight(9.8), this.winnerCallBack.bind(this));
        this.blankRoad1 = new BlankRoad(this, this.getColWidth(4.34), this.getRowHeight(4.8));
        this.blankRoad2 = new BlankRoad(this, this.getColWidth(7.1), this.getRowHeight(7.5));
        this.add.existing(this.answers)
        this.add.existing(this.blankRoad1)
        sky.play('sun');
        let exitBtn = new ExitBtn(this, 120, 135);
        this.add.existing(exitBtn);
        this.car.startFollow({
            duration: 3000,
            yoyo: false,
            repeat: 0,
            rotateToPath: false,
            verticalAdjust: false
        })
    }

    winnerCallBack() {
        setTimeout(() => {
            this.scene.start('End')
        }, 3000)
        this.car.startFollow({
            duration: 3000,
            yoyo: false,
            repeat: 0,
            rotateToPath: false,
            verticalAdjust: false
        })
    }



}