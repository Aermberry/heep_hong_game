import SectionBasicScene from "./SectionBasicScene"
import BackBtn from "../objects/BackBtn"
import HintBtn from "../objects/HintBtn"
import GameNavBtn from "../objects/GameNavBtn"
import Cloud from "../objects/animations/Cloud"
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

        }

        const imageFiles = {
            game5Bg: require('../assets/images/section_5/game_bg.png'),
            s5Hint: require('../assets/images/section_5/target.png'),
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

    }

    create() {
        
        super.create()

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
        const hintBtn = new HintBtn(this, this.getColWidth(7.3), this.getRowHeight(4.6), 's5Hint', 's5HintLogo')
        const gameBtn1 = new GameNavBtn(this, this.getColWidth(5.7), this.getRowHeight(5.3), 's5btn1', '/game/20')
        const cloud = new Cloud(this, this.getColWidth(3), this.getRowHeight(8))
        const cloud2 = new Cloud(this, this.getColWidth(10), this.getRowHeight(6), 'cloud_small')
        cloud.setScale(2)
        cloud2.setScale(1.5)

        this.add.image(this.getColWidth(3.5), this.getRowHeight(1.5), 's5Logo')
        this.add.existing(cloud)
        this.add.existing(cloud2)
        this.add.existing(backBtn)
        this.add.existing(hintBtn)
        this.add.existing(gameBtn1)

    }

}