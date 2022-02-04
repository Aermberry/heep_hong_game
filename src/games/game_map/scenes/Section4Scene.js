import SectionBasicScene from './SectionBasicScene'
import GameNavBtn from '../objects/GameNavBtn'
import BackBtn from '../objects/BackBtn'
import SpeakerBtn from '../objects/SpeakerBtn'
import HintBtn from '../objects/HintBtn'
import Vehicle from '../objects/animations/Vehicle'
import Cloud from '../objects/animations/Cloud'
// import StartBtn from '../objects/StartBtn'

export default class Section4Scene extends SectionBasicScene {

    constructor() {
        super('Section_4')
    }

    init() {
        this.dataModel = this.sys.game.globals.model;
    }

    preload() {

        this.buildPreloadBg('bg_title', {x: 0.3, y: 0.6})

        const atlasFiles = {
            's4Road': { img: require('../assets/images/section_4/road.png'), data: require('../assets/images/section_4/road.json')},
            'butterfly': { img: require('../assets/images/section_4/butterfly.png'), data: require('../assets/images/section_4/butterfly.json')},
        }

        const imageFiles = {
            game4Bg: require('../assets/images/section_4/game_bg.png'),
            // s4Hint1: require('../assets/images/section_4/target_1.png'),
            // s4Hint2: require('../assets/images/section_4/target_2.png'),
            // s4Hint3: require('../assets/images/section_4/target_3.png'),
            // s4Hint4: require('../assets/images/section_4/target_4.png'),
            s4Logo: require('../assets/images/section_4/game_job.png'),
            vehicle: require('../assets/images/section_4/vehicle.png'),
            cloud_big: require('../assets/images/objects/cloud_big.png'),
            cloud_small: require('../assets/images/objects/cloud_small.png'),
            g19Hint: require('../assets/images/section_4/Game_target_Z-27.png'),
            g18Hint: require('../assets/images/section_4/Game_target_Z-28.png'),
            g29Hint: require('../assets/images/section_4/Game_target_Z-11.png'),
            g30Hint: require('../assets/images/section_4/Game_target_Z-12.png'),
            g16Hint: require('../assets/images/section_4/Game_target_Z-29.png'),
            g17Hint: require('../assets/images/section_4/Game_target_Z-30.png'),
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

        this.load.spritesheet('s4btn1', require('../assets/images/section_4/btn_1.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn2', require('../assets/images/section_4/btn_2.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn3', require('../assets/images/section_4/btn_3.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn4', require('../assets/images/section_4/btn_4.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn5', require('../assets/images/section_4/btn_5.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn6', require('../assets/images/section_4/btn_6.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('roadDesignLogo', require('../assets/images/section_4/logo-129.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('dentisitLogo', require('../assets/images/section_4/logo-130.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('architectLogo', require('../assets/images/section_4/logo-131.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('carerLogo', require('../assets/images/section_4/logo-132.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('strBtn', require('../assets/images/buttons/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })

    }

    create() {

        super.create()
        this.sound.stopAll()
        this.anims.create({
            key: 's4_road',
            frames: this.anims.generateFrameNames('s4Road', { prefix: 'Symbol 7', start: 0, end: 58, zeroPad: 4 }),
            repeat: -1,
        });

        this.anims.create({
            key: 'butterfly',
            frames: this.anims.generateFrameNames('butterfly', { prefix: 'Symbol 7', start: 0, end: 58, zeroPad: 4 }),
            repeat: -1,
        });

        this.initSection('game4Bg')

        // if(this.dataModel.isFirstLoad) {
        //     const startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(10))
        //     this.add.existing(startBtn)
        //     this.dataModel.isFirstLoad = false
        // }else {
        //     this.scene.start('Map')
        // }

    }

    populateSection() {

        const backBtn = new BackBtn(this, this.getColWidth(1), this.getRowHeight(1.5))
        const speakerBtn = new SpeakerBtn(this, this.getColWidth(11), this.getRowHeight(1.5))
        const game19Btn = new GameNavBtn(this, this.getColWidth(2.4), this.getRowHeight(8.7), 's4btn1', '/game/19')
        const game18Btn = new GameNavBtn(this, this.getColWidth(6.8), this.getRowHeight(4.7), 's4btn2', '/game/18')
        const game29Btn = new GameNavBtn(this, this.getColWidth(7.7), this.getRowHeight(6.1), 's4btn3', '/game/29')
        const game30Btn = new GameNavBtn(this, this.getColWidth(10.5), this.getRowHeight(6), 's4btn4', '/game/30')
        const game16Btn = new GameNavBtn(this, this.getColWidth(4.5), this.getRowHeight(10.3), 's4btn5', '/game/16')
        const game17Btn = new GameNavBtn(this, this.getColWidth(5.8), this.getRowHeight(10), 's4btn6', '/game/17')
        const HintBtn1 = new HintBtn(this, this.getColWidth(2.5), this.getRowHeight(6), [game19Btn], 'dentisitLogo')
        const HintBtn2 = new HintBtn(this, this.getColWidth(7.8), this.getRowHeight(9.3), [game16Btn, game17Btn], 'roadDesignLogo')
        const HintBtn3 = new HintBtn(this, this.getColWidth(9), this.getRowHeight(6), [game29Btn, game30Btn], 'carerLogo')
        const HintBtn4 = new HintBtn(this, this.getColWidth(7.5), this.getRowHeight(2.5), [game18Btn], 'architectLogo')

        game19Btn.initHint('g19Hint', this.getColWidth(2.2), this.getRowHeight(0))
        game18Btn.initHint('g18Hint', this.getColWidth(0), this.getRowHeight(2.7))
        game29Btn.initHint('g29Hint', this.getColWidth(0), this.getRowHeight(-2.5))
        game30Btn.initHint('g30Hint', this.getColWidth(0), this.getRowHeight(-2.5))
        game16Btn.initHint('g16Hint', this.getColWidth(-1.5), this.getRowHeight(0))
        game17Btn.initHint('g17Hint', this.getColWidth(0), this.getRowHeight(-2.6))

        const vehicle = new Vehicle(this, this.getColWidth(9), this.getRowHeight(8.3), {x: this.getColWidth(6.9), y: this.getRowHeight(6.7)})
        let roadAnimate = this.add.sprite(this.getColWidth(5.63), this.getRowHeight(11.01), 's4Road')
        roadAnimate.play('s4_road')


        const cloud1 = new Cloud(this, this.getColWidth(3), this.getRowHeight(1))
        this.add.existing(cloud1)
        const cloud2 = new Cloud(this, this.getColWidth(11), this.getRowHeight(2.5), 'cloud_small')
        this.add.existing(cloud2)

        let butterflyAnimate = this.add.sprite(this.getColWidth(8), this.getRowHeight(6), 'butterfly')
        butterflyAnimate.play('butterfly')

        this.add.existing(vehicle)
        this.add.image(this.getColWidth(3.7), this.getRowHeight(1.5), 's4Logo')
        this.add.existing(backBtn)
        this.add.existing(speakerBtn)
        this.add.existing(game19Btn)
        this.add.existing(game18Btn)
        this.add.existing(game29Btn)
        this.add.existing(game30Btn)
        this.add.existing(game16Btn)
        this.add.existing(game17Btn)
        this.add.existing(HintBtn1)
        this.add.existing(HintBtn2)
        this.add.existing(HintBtn3)
        this.add.existing(HintBtn4)

    }

}