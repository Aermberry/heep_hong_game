import SectionBasicScene from "./SectionBasicScene"
import GameNavBtn from '../objects/GameNavBtn'
import HintBtn from '../objects/HintBtn'
import BackBtn from '../objects/BackBtn'
import SpeakerBtn from '../objects/SpeakerBtn'
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
            'tree_fall': { img: require('../assets/images/section_2/forest_s.png'), data: require('../assets/images/section_2/forest_s.json') },
            'tree_b': { img: require('../assets/images/section_2/forest_B.png'), data: require('../assets/images/section_2/forest_B.json') },
        }

        const imageFiles = {
            game2Bg: require('../assets/images/section_2/game_bg.png'),
            // s2Hint: require('../assets/images/section_2/target.png'),
            s2Logo: require('../assets/images/section_2/game_kungfu.png'),
            b1Hint: require('../assets/images/section_2/Game_target_Z-05.png'),
            b2Hint: require('../assets/images/section_2/Game_target_Z-06.png'),
            b3Hint: require('../assets/images/section_2/Game_target_Z-07.png'),
            b4Hint: require('../assets/images/section_2/Game_target_Z-08.png'),
            b6Hint: require('../assets/images/section_2/Game_target_Z-09.png'),
            b5Hint: require('../assets/images/section_2/Game_target_Z-10.png'),
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

        this.createProgressBar()
    }

    create() {
        super.create()
        this.sound.stopAll()
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

        const backBtn = new BackBtn(this, 100, 120)
        const speakerBtn = new SpeakerBtn(this, 1820, 120)

        const game4Btn = new GameNavBtn(this, this.getColWidth(2.55), this.getRowHeight(10.2), 's2btn1', '/game/8')
        const game2Btn = new GameNavBtn(this, this.getColWidth(3.85), this.getRowHeight(7.1), 's2btn2', '/game/6')
        const game3Btn = new GameNavBtn(this, this.getColWidth(9.6), this.getRowHeight(7.1), 's2btn3', '/game/7')
        const game6Btn = new GameNavBtn(this, this.getColWidth(9.1), this.getRowHeight(10.8), 's2btn4', '/game/21')
        const game1Btn = new GameNavBtn(this, this.getColWidth(1.3), this.getRowHeight(7.3), 's2btn5', '/game/5')
        const game5Btn = new GameNavBtn(this, this.getColWidth(6.32), this.getRowHeight(9.95), 's2btn6', '/game/9')
        const hintBtn = new HintBtn(this, this.getColWidth(6.32), this.getRowHeight(5.5), [game1Btn, game2Btn, game3Btn, game4Btn, game5Btn, game6Btn], 'catLogo')

        game1Btn.initHint('b1Hint', this.getColWidth(0), this.getRowHeight(-1.8))
        game2Btn.initHint('b2Hint', this.getColWidth(0), this.getRowHeight(-1.8))
        game3Btn.initHint('b3Hint', this.getColWidth(0), this.getRowHeight(-1.8))
        game4Btn.initHint('b4Hint', this.getColWidth(0), this.getRowHeight(-1.8))
        game5Btn.initHint('b5Hint', this.getColWidth(0), this.getRowHeight(-1.8))
        game6Btn.initHint('b6Hint', this.getColWidth(0), this.getRowHeight(-1.8))

        this.anims.create({
            key: 'tree_fall_anime',
            frames: this.anims.generateFrameNames('tree_fall', { prefix: 'Symbol 1', start: 0, end: 35, zeroPad: 4 }),
            repeat: -1,
            delay: 6000,
            repeatDelay: 5000
        });

        this.anims.create({
            key: 'tree_b_anime',
            frames: this.anims.generateFrameNames('tree_b', { prefix: 'Symbol 1', start: 0, end: 35, zeroPad: 4 }),
            repeat: -1,
            delay: 0,
            repeatDelay: 5000
        });

        let animate2 = this.add.sprite(this.getColWidth(8.6), this.getRowHeight(8.6), 'tree_b_anime')
        animate2.play('tree_b_anime')

        let animate = this.add.sprite(this.getColWidth(8.6), this.getRowHeight(10.2), 'tree_fall')
        animate.play('tree_fall_anime')


        this.add.image(this.getColWidth(3.3), this.getRowHeight(1.5), 's2Logo')

        this.add.existing(backBtn)
        this.add.existing(speakerBtn)
        this.add.existing(hintBtn)
        this.add.existing(game1Btn)
        this.add.existing(game2Btn)
        this.add.existing(game3Btn)
        this.add.existing(game4Btn)
        this.add.existing(game5Btn)
        this.add.existing(game6Btn)

    }

}