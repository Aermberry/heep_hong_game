import SectionBasicScene from "./SectionBasicScene"
import GameNavBtn from '../objects/GameNavBtn'
import HintBtn from '../objects/HintBtn'
import BackBtn from '../objects/BackBtn'
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

        }

        const imageFiles = {
            game3Bg: require('../assets/images/section_3/game_bg.png'),
            s3Hint1: require('../assets/images/section_3/target.png'),
            s3Hint2: require('../assets/images/section_3/target_2.png'),
            s3Hint3: require('../assets/images/section_3/target_3.png'),
            s3Hint4: require('../assets/images/section_3/target_4.png'),
            s3Hint5: require('../assets/images/section_3/target_5.png'),
            s3Logo: require('../assets/images/section_3/game_mov.png'),
            balloon: require('../assets/images/objects/balloon.png'),
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
        this.load.spritesheet('s3Hint5Logo', require('../assets/images/section_3/logo-124.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('s3Hint3Logo', require('../assets/images/section_3/logo-125.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('s3Hint4Logo', require('../assets/images/section_3/logo-126.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('s3Hint1Logo', require('../assets/images/section_3/logo-127.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('s3Hint2Logo', require('../assets/images/section_3/logo-128.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('strBtn', require('../assets/images/buttons/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })

    }

    create() {

        super.create()

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

        const backBtn = new BackBtn(this, this.getColWidth(1), this.getRowHeight(1.5))
        const hintBtn1 = new HintBtn(this, this.getColWidth(5.8), this.getRowHeight(10), 's3Hint1', 's3Hint1Logo')
        const hintBtn2 = new HintBtn(this, this.getColWidth(8.9), this.getRowHeight(7.2), 's3Hint2', 's3Hint2Logo')
        const hintBtn3 = new HintBtn(this, this.getColWidth(7.1), this.getRowHeight(5), 's3Hint3', 's3Hint3Logo')
        const hintBtn4 = new HintBtn(this, this.getColWidth(8.5), this.getRowHeight(2), 's3Hint4', 's3Hint4Logo')
        const hintBtn5 = new HintBtn(this, this.getColWidth(3.2), this.getRowHeight(5.7), 's3Hint5', 's3Hint5Logo')
        const game1Btn = new GameNavBtn(this, this.getColWidth(1.6), this.getRowHeight(5.5), 's3btn1', '/game/27')
        const game2Btn = new GameNavBtn(this, this.getColWidth(4.7), this.getRowHeight(5.5), 's3btn2', '/game/28')
        const game3Btn = new GameNavBtn(this, this.getColWidth(5.1), this.getRowHeight(2.9), 's3btn3', '/game/25')
        const game4Btn = new GameNavBtn(this, this.getColWidth(6.4), this.getRowHeight(2.9), 's3btn4', '/game/24')
        const game5Btn = new GameNavBtn(this, this.getColWidth(9.8), this.getRowHeight(3.3), 's3btn5', '/game/26')
        const game6Btn = new GameNavBtn(this, this.getColWidth(3.2), this.getRowHeight(9.2), 's3btn6', '/game/11')
        const game7Btn = new GameNavBtn(this, this.getColWidth(2.8), this.getRowHeight(10.7), 's3btn7', '/game/12')
        const game8Btn = new GameNavBtn(this, this.getColWidth(4.2), this.getRowHeight(9.2), 's3btn8', '/game/13')
        const game9Btn = new GameNavBtn(this, this.getColWidth(7.5), this.getRowHeight(10), 's3btn9', '/game/14')
        const game10Btn = new GameNavBtn(this, this.getColWidth(8.5), this.getRowHeight(10.6), 's3btn10', '/game/15')
        const game11Btn = new GameNavBtn(this, this.getColWidth(9.5), this.getRowHeight(9.2), 's3btn11', '/game/22')
        const game12Btn = new GameNavBtn(this, this.getColWidth(10.5), this.getRowHeight(8), 's3btn12', '/game/23')
        const balloon = new Balloon(this, this.getColWidth(2), this.getRowHeight(7))
        balloon.setScale(1.5)

        this.add.existing(balloon)
        this.add.image(this.getColWidth(3.3), this.getRowHeight(1.5), 's3Logo')
        this.add.existing(backBtn)
        this.add.existing(hintBtn1)
        this.add.existing(hintBtn2)
        this.add.existing(hintBtn3)
        this.add.existing(hintBtn4)
        this.add.existing(hintBtn5)
        this.add.existing(game1Btn)
        this.add.existing(game2Btn)
        this.add.existing(game3Btn)
        this.add.existing(game4Btn)
        this.add.existing(game5Btn)
        this.add.existing(game6Btn)
        this.add.existing(game7Btn)
        this.add.existing(game8Btn)
        this.add.existing(game9Btn)
        this.add.existing(game10Btn)
        this.add.existing(game11Btn)
        this.add.existing(game12Btn)

    }

}