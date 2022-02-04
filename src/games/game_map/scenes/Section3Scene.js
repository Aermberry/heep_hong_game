import SectionBasicScene from "./SectionBasicScene"
import GameNavBtn from '../objects/GameNavBtn'
import HintBtn from '../objects/HintBtn'
import BackBtn from '../objects/BackBtn'
import SpeakerBtn from '../objects/SpeakerBtn'
import Balloon from '../objects/animations/Balloon'
// import StartBtn from '../objects/StartBtn'

export default class Section3Scene extends SectionBasicScene {

    constructor() {
        super('Section_3')
    }

    init() {
        this.dataModel = this.sys.game.globals.model;
    }

    preload() {

        this.buildPreloadBg('bg_title', {x: 0.5,y: 0.8})

        const atlasFiles = {
            'box': { img: require('../assets/images/section_3/box.png'), data: require('../assets/images/section_3/box.json') },
            'box2': { img: require('../assets/images/section_3/box.png'), data: require('../assets/images/section_3/box.json') },
        }

        const imageFiles = {
            game3Bg: require('../assets/images/section_3/game_bg.png'),
            // s3Hint1: require('../assets/images/section_3/target.png'),
            // s3Hint2: require('../assets/images/section_3/target_2.png'),
            // s3Hint3: require('../assets/images/section_3/target_3.png'),
            // s3Hint4: require('../assets/images/section_3/target_4.png'),
            // s3Hint5: require('../assets/images/section_3/target_5.png'),
            s3Logo: require('../assets/images/section_3/game_mov.png'),
            balloon: require('../assets/images/objects/balloon.png'),
            g11Hint: require('../assets/images/section_3/Game_target_Z-19.png'),
            g12Hint: require('../assets/images/section_3/Game_target_Z-22.png'),
            g13Hint: require('../assets/images/section_3/Game_target_Z-20.png'),
            g14Hint: require('../assets/images/section_3/Game_target_Z-21.png'),
            g15Hint: require('../assets/images/section_3/Game_target_Z-23.png'),
            g22Hint: require('../assets/images/section_3/Game_target_Z-18.png'),
            g23Hint: require('../assets/images/section_3/Game_target_Z-17.png'),
            g24Hint: require('../assets/images/section_3/Game_target_Z-14.png'),
            g25Hint: require('../assets/images/section_3/Game_target_Z-15.png'),
            g26Hint: require('../assets/images/section_3/Game_target_Z-13.png'),
            g27Hint: require('../assets/images/section_3/Game_target_Z-25.png'),
            g28Hint: require('../assets/images/section_3/Game_target_Z-26.png'),
            s3Car: require('../assets/images/section_3/single_car.png')
        }

        const soundFiles = {
            'bgm': require('../assets/audios/casual_game_track.mp3'),
            // 'button': require('../assets/audios/comedy_pop_finger_in_mouth_002.mp3'),
            'info': require('../assets/audios/medicine_syrup_dosing_syringe_slide_with_no_syrup_inside.mp3'),
            'zoom': require('../assets/audios/Whoosh_Low_Fast_Raxr_Edos_4.mp3')
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles, sound: soundFiles
        })

        this.load.spritesheet('s3btn1', require('../assets/images/section_3/btn_1.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn2', require('../assets/images/section_3/btn_2.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn3', require('../assets/images/section_3/btn_3.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn4', require('../assets/images/section_3/btn_4.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn5', require('../assets/images/section_3/btn_5.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn6', require('../assets/images/section_3/btn_6.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn7', require('../assets/images/section_3/btn_7.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn8', require('../assets/images/section_3/btn_8.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn9', require('../assets/images/section_3/btn_9.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn10', require('../assets/images/section_3/btn_10.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn11', require('../assets/images/section_3/btn_11.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3btn12', require('../assets/images/section_3/btn_12.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s3Hint5Logo', require('../assets/images/section_3/In Game target_v2-124.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('s3Hint3Logo', require('../assets/images/section_3/In Game target_v2-125.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('s3Hint4Logo', require('../assets/images/section_3/In Game target_v2-126.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('s3Hint1Logo', require('../assets/images/section_3/In Game target_v2-127.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('s3Hint2Logo', require('../assets/images/section_3/In Game target_v2-128.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('strBtn', require('../assets/images/buttons/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })

    }

    create() {

        super.create()
        this.sound.stopAll()
        this.initSection('game3Bg')

        // if(this.dataModel.isFirstLoad) {
        //     const startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(10))
        //     this.add.existing(startBtn)
        //     this.dataModel.isFirstLoad = false
        // }else {
        //     this.scene.start('Map')
        // }

    }

    populateSection() {

        const car = this.add.image(this.getColWidth(1.5), this.getRowHeight(-1), 's3Car')
        this.tweens.add({
            targets: [car],
            x: this.getColWidth(8.9),
            y: this.getRowHeight(6.5),
            repeat: -1,
            duration: 8000
        })

        this.anims.create({
            key: 'box',
            frames: this.anims.generateFrameNames('box', { prefix: 'Symbol 1', start: 0, end: 17, zeroPad: 4 }),
            repeat: -1,
            delay: 3000,
            repeatDelay: 5000
        });

        this.anims.create({
            key: 'box2',
            frames: this.anims.generateFrameNames('box2', { prefix: 'Symbol 1', start: 0, end: 17, zeroPad: 4 }),
            repeat: -1,
            delay: 1000,
            repeatDelay: 5000
        });

        let boxAnimate1 = this.add.sprite(this.getColWidth(7.1), this.getRowHeight(10.8), 'box')
        boxAnimate1.play('box')

        let boxAnimate2 = this.add.sprite(this.getColWidth(2.4), this.getRowHeight(10), 'box2')
        boxAnimate2.play('box2')

        const backBtn = new BackBtn(this, this.getColWidth(1), this.getRowHeight(1.5))
        const speakerBtn = new SpeakerBtn(this, this.getColWidth(11), this.getRowHeight(1.5))

        const game11Btn = new GameNavBtn(this, this.getColWidth(3), this.getRowHeight(9.2), 's3btn6', '/game/11')
        const game12Btn = new GameNavBtn(this, this.getColWidth(2.8), this.getRowHeight(10.7), 's3btn7', '/game/12')
        const game13Btn = new GameNavBtn(this, this.getColWidth(4.2), this.getRowHeight(9.2), 's3btn8', '/game/13')
        const game14Btn = new GameNavBtn(this, this.getColWidth(7.5), this.getRowHeight(10), 's3btn9', '/game/14')
        const game15Btn = new GameNavBtn(this, this.getColWidth(8.5), this.getRowHeight(10.6), 's3btn10', '/game/15')

        const game22Btn = new GameNavBtn(this, this.getColWidth(9.5), this.getRowHeight(9.2), 's3btn11', '/game/22')
        const game23Btn = new GameNavBtn(this, this.getColWidth(10.5), this.getRowHeight(8), 's3btn12', '/game/23')

        const game24Btn = new GameNavBtn(this, this.getColWidth(6.4), this.getRowHeight(2.9), 's3btn4', '/game/24')
        const game25Btn = new GameNavBtn(this, this.getColWidth(5.1), this.getRowHeight(2.9), 's3btn3', '/game/25')

        const game26Btn = new GameNavBtn(this, this.getColWidth(9.8), this.getRowHeight(3.3), 's3btn5', '/game/26')

        const game27Btn = new GameNavBtn(this, this.getColWidth(1.6), this.getRowHeight(5.5), 's3btn1', '/game/27')
        const game28Btn = new GameNavBtn(this, this.getColWidth(4.7), this.getRowHeight(5.5), 's3btn2', '/game/28')

        const hintBtn1 = new HintBtn(this, this.getColWidth(5.8), this.getRowHeight(10), [game11Btn, game12Btn, game13Btn, game14Btn, game15Btn], 's3Hint1Logo')
        const hintBtn2 = new HintBtn(this, this.getColWidth(8.9), this.getRowHeight(7.2), [game22Btn, game23Btn], 's3Hint2Logo')
        const hintBtn3 = new HintBtn(this, this.getColWidth(7.1), this.getRowHeight(5), [game24Btn, game25Btn], 's3Hint3Logo')
        const hintBtn4 = new HintBtn(this, this.getColWidth(8.5), this.getRowHeight(2), [game26Btn], 's3Hint4Logo')
        const hintBtn5 = new HintBtn(this, this.getColWidth(3.2), this.getRowHeight(5.7), [game27Btn, game28Btn], 's3Hint5Logo')
        const balloon = new Balloon(this, this.getColWidth(2), this.getRowHeight(7))
        balloon.setScale(1.5)
        game11Btn.initHint('g11Hint', this.getColWidth(-0.55), this.getRowHeight(-2.75))
        game12Btn.initHint('g12Hint', this.getColWidth(-1.65), this.getRowHeight(-0.6))
        game13Btn.initHint('g13Hint', this.getColWidth(0.2), this.getRowHeight(-2.75))
        game14Btn.initHint('g14Hint', this.getColWidth(0), this.getRowHeight(-2.6))
        game15Btn.initHint('g15Hint', this.getColWidth(1.8), this.getRowHeight(-0.6))
        game22Btn.initHint('g22Hint', this.getColWidth(-1.6), this.getRowHeight(0.1))
        game23Btn.initHint('g23Hint', this.getColWidth(0), this.getRowHeight(-2.7))
        game24Btn.initHint('g24Hint', this.getColWidth(1.7), this.getRowHeight(-0.1))
        game25Btn.initHint('g25Hint', this.getColWidth(-0.2), this.getRowHeight(2.6))
        game26Btn.initHint('g26Hint', this.getColWidth(0), this.getRowHeight(2.9))
        game27Btn.initHint('g27Hint', this.getColWidth(0.45), this.getRowHeight(3))
        game28Btn.initHint('g28Hint', this.getColWidth(2.4), this.getRowHeight(0))

        this.add.existing(balloon)
        this.add.image(this.getColWidth(3.3), this.getRowHeight(1.5), 's3Logo')
        this.add.existing(backBtn)
        this.add.existing(speakerBtn)
        this.add.existing(hintBtn1)
        this.add.existing(hintBtn2)
        this.add.existing(hintBtn3)
        this.add.existing(hintBtn4)
        this.add.existing(hintBtn5)
        this.add.existing(game11Btn)
        this.add.existing(game12Btn)
        this.add.existing(game13Btn)
        this.add.existing(game14Btn)
        this.add.existing(game15Btn)
        this.add.existing(game22Btn)
        this.add.existing(game23Btn)
        this.add.existing(game24Btn)
        this.add.existing(game25Btn)
        this.add.existing(game26Btn)
        this.add.existing(game27Btn)
        this.add.existing(game28Btn)

    }

}