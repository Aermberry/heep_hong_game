import SectionBasicScene from "./SectionBasicScene"
import BackBtn from "../objects/BackBtn"
import SpeakerBtn from "../objects/SpeakerBtn"
import HintBtn from "../objects/HintBtn"
// import GameNavBtn from "../objects/GameNavBtn"
import Cloud from "../objects/animations/Cloud"
import Game20NavBtn from "../objects/Game20NavBtn"
// import StartBtn from '../objects/StartBtn'

export default class Section5Scene extends SectionBasicScene {

    constructor() {
        super('Section_5')
    }

    init() {
        this.dataModel = this.sys.game.globals.model;
    }

    preload() {

        this.buildPreloadBg('bg_title', {x: 0.8, y: 0.6})

        const atlasFiles = {
            'ship': { img: require('../assets/images/section_5/ship.png'), data: require('../assets/images/section_5/ship.json') },
            'fish': { img: require('../assets/images/section_5/fish.png'), data: require('../assets/images/section_5/fish.json') }
        }

        const imageFiles = {
            game5Bg: require('../assets/images/section_5/game_bg.png'),
            // s5Hint: require('../assets/images/section_5/target.png'),
            g20Hint: require('../assets/images/section_5/Game_target_Z-16.png'),
            s5Logo: require('../assets/images/section_5/game_art.png'),
            cloud_big: require('../assets/images/objects/cloud_big.png'),
            cloud_small: require('../assets/images/objects/cloud_small.png')

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

        this.load.spritesheet('s5btn1', require('../assets/images/section_5/btn.png'),{ frameWidth: 131, frameHeight: 135 })
        this.load.spritesheet('s5HintLogo', require('../assets/images/section_5/logo-133.png'), { frameWidth: 305, frameHeight: 314.5 })

        this.createProgressBar()
    }

    create() {

        super.create()
        this.sound.stopAll()
        this.initSection('game5Bg')

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
        // const gameBtn1 = new GameNavBtn(this, this.getColWidth(5.7), this.getRowHeight(5.3), 's5btn1', '/game/20')
        const gameBtn1 = new Game20NavBtn(this, this.getColWidth(5.7), this.getRowHeight(5.3), 's5btn1', '/game/20')
        const hintBtn = new HintBtn(this, this.getColWidth(7.3), this.getRowHeight(4.6), [gameBtn1], 's5HintLogo')
        const cloud = new Cloud(this, this.getColWidth(3), this.getRowHeight(8))
        const cloud2 = new Cloud(this, this.getColWidth(10), this.getRowHeight(6), 'cloud_small')
        cloud.setScale(2)
        cloud2.setScale(1.5)

        gameBtn1.initHint('g20Hint', this.getColWidth(-2), this.getRowHeight(0))

        this.anims.create({
            key: 'ship',
            frames: this.anims.generateFrameNames('ship', { prefix: 'Symbol 1', start: 0, end: 24, zeroPad: 4 }),
            repeat: -1,
            // delay: 6000,
            repeatDelay: 300
        });


        let animate1 = this.add.sprite(this.getColWidth(11), this.getRowHeight(9), 'ship')
        animate1.play('ship')

        this.anims.create({
            key: 'fish',
            frames: this.anims.generateFrameNames('fish', { prefix: 'Symbol 3', start: 0, end: 29, zeroPad: 4 }),
            repeat: -1,
            // delay: 6000,
            repeatDelay: 300
        });


        let animate2 = this.add.sprite(this.getColWidth(11), this.getRowHeight(11), 'fish')
        animate2.play('fish')

        this.add.image(this.getColWidth(3.5), this.getRowHeight(1.5), 's5Logo')
        this.add.existing(cloud)
        this.add.existing(cloud2)
        this.add.existing(backBtn)
        this.add.existing(hintBtn)
        this.add.existing(gameBtn1)
        this.add.existing(speakerBtn)

    }

}