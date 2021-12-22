import SectionBasicScene from "./SectionBasicScene"
import GameNavBtn from '../objects/GameNavBtn'
import HintBtn from '../objects/HintBtn'
import BackBtn from '../objects/BackBtn'
// import StartBtn from '../objects/StartBtn'

export default class Section2Scene extends SectionBasicScene {

    constructor() {
        super('Section_2')
    }

    init() {
        this.dataModel = this.sys.game.globals.model;
    }

    preload() {
        this.buildPreloadBg('bg_title', {x: 0.6, y: 0.3})

        const atlasFiles = {
            'tree_fall': { img: require('../assets/images/section_2/forest.png'), data: require('../assets/images/section_2/forest.json') },
        }

        const imageFiles = {
            game2Bg: require('../assets/images/section_2/game_bg.png'),
            s2Hint: require('../assets/images/section_2/target.png'),
            s2Logo: require('../assets/images/section_2/game_kungfu.png'),
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

        this.load.spritesheet('s2btn1', require('../assets/images/section_2/btn_1.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn2', require('../assets/images/section_2/btn_2.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn3', require('../assets/images/section_2/btn_3.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn4', require('../assets/images/section_2/btn_4.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn5', require('../assets/images/section_2/btn_5.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn6', require('../assets/images/section_2/btn_6.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('catLogo', require('../assets/images/section_2/logo-123.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('strBtn', require('../assets/images/buttons/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })
    }

    create() {
        super.create()
        
        this.initSection('game2Bg')

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
        const hintBtn = new HintBtn(this, this.getColWidth(6.32), this.getRowHeight(5.5), 's2Hint', 'catLogo')
        const game1Btn = new GameNavBtn(this, this.getColWidth(2.55), this.getRowHeight(10.2), 's2btn1', '/game/8')
        const game2Btn = new GameNavBtn(this, this.getColWidth(3.85), this.getRowHeight(7.1), 's2btn2', '/game/6')
        const game3Btn = new GameNavBtn(this, this.getColWidth(9.6), this.getRowHeight(7.1), 's2btn3', '/game/7')
        const game4Btn = new GameNavBtn(this, this.getColWidth(9.1), this.getRowHeight(10.8), 's2btn4', '/game/21')
        const game5Btn = new GameNavBtn(this, this.getColWidth(1.3), this.getRowHeight(7.3), 's2btn5', '/game/5')
        const game6Btn = new GameNavBtn(this, this.getColWidth(6.32), this.getRowHeight(9.95), 's2btn6', '/game/9')
        
        this.anims.create({
            key: 'tree_fall_anime', 
            frames: this.anims.generateFrameNames('tree_fall', { prefix: 'Symbol 1', start: 0, end: 35, zeroPad: 4 }),
            repeat: -1,
            delay: 6000,
            repeatDelay: 5000
        });


        let animate = this.add.sprite(this.getColWidth(5), this.getRowHeight(6), 'tree_fall')
        animate.play('tree_fall_anime')

        this.add.image(this.getColWidth(3.3), this.getRowHeight(1.5), 's2Logo')
        
        this.add.existing(backBtn)
        this.add.existing(hintBtn)
        this.add.existing(game1Btn)
        this.add.existing(game2Btn)
        this.add.existing(game3Btn)
        this.add.existing(game4Btn)
        this.add.existing(game5Btn)
        this.add.existing(game6Btn)

    }

}