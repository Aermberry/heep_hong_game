import SectionBasicScene from './SectionBasicScene'
import GameNavBtn from '../objects/GameNavBtn'
import BackBtn from '../objects/BackBtn'
import HintBtn from '../objects/HintBtn'
import Vehicle from '../objects/animations/Vehicle'
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
        }

        const imageFiles = {
            game4Bg: require('../assets/images/section_4/game_bg.png'),
            s4Hint1: require('../assets/images/section_4/target_1.png'),
            s4Hint2: require('../assets/images/section_4/target_2.png'),
            s4Hint3: require('../assets/images/section_4/target_3.png'),
            s4Hint4: require('../assets/images/section_4/target_4.png'),
            s4Logo: require('../assets/images/section_4/game_job.png'),
            vehicle: require('../assets/images/section_4/vehicle.png'),
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

        this.anims.create({
            key: 's4_road', 
            frames: this.anims.generateFrameNames('s4Road', { prefix: 'Symbol 7', start: 0, end: 58, zeroPad: 4 }),
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
        const game1Btn = new GameNavBtn(this, this.getColWidth(2.4), this.getRowHeight(8.7), 's4btn1', '/game/19')
        const game2Btn = new GameNavBtn(this, this.getColWidth(6.8), this.getRowHeight(4.7), 's4btn2', '/game/18')
        const game3Btn = new GameNavBtn(this, this.getColWidth(7.7), this.getRowHeight(6.1), 's4btn3', '/game/29')
        const game4Btn = new GameNavBtn(this, this.getColWidth(10.5), this.getRowHeight(6), 's4btn4', '/game/30')
        const game5Btn = new GameNavBtn(this, this.getColWidth(4.5), this.getRowHeight(10.3), 's4btn5', '/game/16')
        const game6Btn = new GameNavBtn(this, this.getColWidth(5.8), this.getRowHeight(10), 's4btn6', '/game/17')
        const HintBtn1 = new HintBtn(this, this.getColWidth(2.5), this.getRowHeight(6), 's4Hint2', 'dentisitLogo')
        const HintBtn2 = new HintBtn(this, this.getColWidth(7.8), this.getRowHeight(9.3), 's4Hint4', 'roadDesignLogo')
        const HintBtn3 = new HintBtn(this, this.getColWidth(9), this.getRowHeight(6), 's4Hint3', 'carerLogo')
        const HintBtn4 = new HintBtn(this, this.getColWidth(7.5), this.getRowHeight(2.5), 's4Hint1', 'architectLogo')

        const vehicle = new Vehicle(this, this.getColWidth(9), this.getRowHeight(8.3), {x: this.getColWidth(6.9), y: this.getRowHeight(6.7)})
        let roadAnimate = this.add.sprite(this.getColWidth(5.63), this.getRowHeight(11.01), 's4Road')
        roadAnimate.play('s4_road')


        this.add.existing(vehicle)
        this.add.image(this.getColWidth(3.7), this.getRowHeight(1.5), 's4Logo')
        this.add.existing(backBtn)
        this.add.existing(game1Btn)
        this.add.existing(game2Btn)
        this.add.existing(game3Btn)
        this.add.existing(game4Btn)
        this.add.existing(game5Btn)
        this.add.existing(game6Btn)
        this.add.existing(HintBtn1)
        this.add.existing(HintBtn2)
        this.add.existing(HintBtn3)
        this.add.existing(HintBtn4)

    }

}