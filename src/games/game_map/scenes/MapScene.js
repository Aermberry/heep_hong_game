import BasicScene from './BasicScene'
// import Game1Btn from '../objects/Game1Btn';
import SectionBtn from '../objects/SectionBtn'
import Balloon from '../objects/animations/Balloon'
import Cloud from '../objects/animations/Cloud';
import SwipeUfo from '../objects/animations/SwipeUfo'
import LampLight from '../objects/animations/LampLight';
import Game6Btn from '../objects/Game6Btn';
import SpeakerBtn from '../objects/SpeakerBtn';

export default class MapScene extends BasicScene {

    constructor() {
        super('Map');
    }

    init() {
        this.dataModel = this.sys.game.globals.model;
    }

    preload() {
        this.buildBg('bg_title')

        this.anims.create({
            key: 'tree',
            delay: 3000,
            repeatDelay:8000,
            repeat: -1,
            frames: this.anims.generateFrameNames('tree', { prefix: 'Symbol 1', start: 0, end: 10, zeroPad: 4 }),
        });

        this.anims.create({
            key: 'smoke',
            delay: 1000,
            repeatDelay:1000,
            repeat: -1,
            frames: this.anims.generateFrameNames('smoke', { prefix: 'Symbol 1', start: 0, end: 75, zeroPad: 4 }),
        });

        this.anims.create({
            key: 'dada_red',
            delay: 1000,
            repeatDelay:1000,
            repeat: -1,
            frames: this.anims.generateFrameNames('dada_red', { prefix: 'Symbol 1', start: 0, end: 14, zeroPad: 4 }),
        });

        this.anims.create({
            key: 'dada_yellow',
            delay: 1500,
            repeatDelay:1000,
            repeat: -1,
            frames: this.anims.generateFrameNames('dada_yellow', { prefix: 'Symbol 1', start: 0, end: 14, zeroPad: 4 }),
        });

    }

    create() {
        super.create();

        this.sound.stopAll()

        const speakerBtn = new SpeakerBtn(this, 1820, 120)

        const game1Btn = new SectionBtn(this, this.getColWidth(2.29), this.getRowHeight(3.2), 'section1Btn', 'Section_1', 
        [
            0,0,
            -50,400,
            100, 400,
            350, 320,
            450, 220,
            630, 210,
            650,0
        ])
        const game2Btn = new SectionBtn(this, this.getColWidth(7.74), this.getRowHeight(3.18), 'section2Btn', 'Section_2', 
        [
            10, 310,
            10, 240,
            100, 165,
            250, 0,
            350, 20,
            760, 400,
            600, 380,
            400, 500,
            100, 330,
        ])
        const game3Btn = new SectionBtn(this, this.getColWidth(5.64), this.getRowHeight(8.9), 'section3Btn', 'Section_3', 
        [ 
            20, 150, 
            10, 235,
            100, 290,
            310, 380, 
            550, 360,
            680, 370,
            870, 230,
            750, 100,
            750, 10,
            550, 80,
            430, 0,
            200, 100,
            180, 170
        ])
        const game4Btn = new SectionBtn(this, this.getColWidth(2.95), this.getRowHeight(6.1), 'section4Btn', 'Section_4', 
        [ 
            30, 380, 
            30, 250, 
            180, 170, 
            300, 140, 
            350, 120, 
            460, 20, 
            560, 15, 
            700, 120, 
            680, 190, 
            600, 200, 
            830, 350, 
            620, 440,
            620, 500,
            280, 490
        ])
        const game5Btn = new SectionBtn(this, this.getColWidth(9.5), this.getRowHeight(7.1), 'section5Btn', 'Section_5', [ 
            110, 405, 
            10, 300, 
            60, 100, 
            244, 14, 
            330, 0, 
            458, 12, 
            574, 90, 
            580, 120, 
            594, 300, 
            480, 405, 
            400, 405
        ])
//        const game6Btn = new SectionBtn(this, this.getColWidth(6.15), this.getRowHeight(5.27), 'section6Btn', 'Section_6')
        const game6Btn = new Game6Btn(this, this.getColWidth(6.15), this.getRowHeight(5.27), 'section6Btn')
        // const game6Btn = new Game6Btn(this, this.getColWidth(6.15), this.getRowHeight(5.27))
        const balloon = new Balloon(this, this.getColWidth(4), this.getRowHeight(8.9))
        const balloon2 = new Balloon(this, this.getColWidth(7), this.getRowHeight(7.5))
        const cloud1 = new Cloud(this, this.getColWidth(6), this.getRowHeight(7.5))
        const cloud2 = new Cloud(this, this.getColWidth(3), this.getRowHeight(4.8))
        const cloud3 = new Cloud(this, this.getColWidth(9), this.getRowHeight(5))
        const cloud4 = new Cloud(this, this.getColWidth(9), this.getRowHeight(9), 'cloud_small')
        this.ufo = new SwipeUfo(this, this.getColWidth(3), this.getRowHeight(1))
        const lamp1 = new LampLight(this, this.getColWidth(4.7), this.getRowHeight(4.6))
        const lamp2 = new LampLight(this, this.getColWidth(7.9), this.getRowHeight(5.3))

        const tree = this.add.sprite(this.getColWidth(7.6), this.getRowHeight(4.7), 'tree')

        tree.play('tree')

        const smoke = this.add.sprite(this.getColWidth(3.97), this.getRowHeight(4.89), 'smoke')
        smoke.play('smoke')

        const dada_red = this.add.sprite(this.getColWidth(11.15), this.getRowHeight(8.6), 'dada_red')
        dada_red.play('dada_red')

        const dada_yellow = this.add.sprite(this.getColWidth(9.2), this.getRowHeight(9.8), 'dada_yellow')
        dada_yellow.play('dada_yellow')
        
        this.add.existing(game1Btn)
        this.add.existing(game2Btn)
        this.add.existing(game3Btn)
        this.add.existing(game4Btn)
        this.add.existing(game5Btn)
        this.add.existing(game6Btn)

        this.add.existing(speakerBtn)

        this.add.existing(lamp1)
        this.add.existing(lamp2)
        this.add.existing(this.ufo)
        this.add.existing(balloon)
        this.add.existing(balloon2)
        this.add.existing(cloud1)
        this.add.existing(cloud2)
        this.add.existing(cloud3)
        this.add.existing(cloud4)
    



        // const ufo = this.add.image(this.getColWidth(4), this.getRowHeight(-1), 'ufo');

        // this.tweens.add({
        //     targets: ufo,
        //     x: this.x - this.width * (0.9 + (0.2 * salt)),
        //     yoyo: true,
        //     loop: -1,
        //     duration: 12000 + (4000 * salt),
        //     ease: Phaser.Math.Easing.Linear,
        //     delay: 1000 * salt
        // })



        // this.scene.start('Map');
    }

    update() {
        this.ufo.updatePositionWithPath()
    }

}
