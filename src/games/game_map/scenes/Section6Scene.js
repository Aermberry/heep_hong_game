import SectionBasicScene from "./SectionBasicScene"
import BackBtn from "../objects/BackBtn"
import HintBtn from "../objects/HintBtn"
import GameNavBtn from "../objects/GameNavBtn"
import LampLight from "../objects/animations/LampLight"
// import StartBtn from '../objects/StartBtn'

export default class Section6Scene extends SectionBasicScene {

    constructor() {
        super('Section_6')
    }

    init() {
        this.dataModel = this.sys.game.globals.model;
    }

    preload() {

        this.buildPreloadBg('bg_title')

        const atlasFiles = {

        }

        const imageFiles = {
            game6Bg: require('../assets/images/section_6/game_bg.png'),
            // s6Hint: require('../assets/images/section_6/target.png'),
            btnHint10: require('../assets/images/section_6/Game_target_Z-24.png'),
            s6Logo: require('../assets/images/section_6/game_magic.png'),
            lamp_light: require('../assets/images/main/worldmap_lamp_pic.png'),
            s6car: require('../assets/images/section_6/single_car.png')
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

        this.load.spritesheet('s6btn1', require('../assets/images/section_6/btn.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s6HintLogo', require('../assets/images/section_6/logo-134.png'),{ frameWidth: 305, frameHeight: 314.5 })

    }

    create() {
        
        super.create()

        this.initSection('game6Bg')
        
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
        const gameBtn = new GameNavBtn(this, this.getColWidth(7.6), this.getRowHeight(7.4), 's6btn1', '/game/10')
        const hintBtn = new HintBtn(this, this.getColWidth(6.8), this.getRowHeight(5.5), [gameBtn], 's6HintLogo')

        gameBtn.initHint('btnHint10', this.getColWidth(0), this.getRowHeight(2.5))

        const lampLight1 = new LampLight(this, this.getColWidth(1), this.getRowHeight(5))
        const lampLight2 = new LampLight(this, this.getColWidth(10.1), this.getRowHeight(0.9))
        const lampLight3 = new LampLight(this, this.getColWidth(11.6), this.getRowHeight(6.4))

        const car = this.add.image(this.getColWidth(11.2), this.getRowHeight(6), 's6car')
        
        this.tweens.add({
            targets: car,
            x: this.getColWidth(4.5),
            y: this.getRowHeight(13),
            repeat: -1,
            duration:10000
        })

        this.add.image(this.getColWidth(3), this.getRowHeight(1.5), 's6Logo')
        this.add.existing(backBtn)
        this.add.existing(hintBtn)
        this.add.existing(gameBtn)
        this.add.existing(lampLight1)
        this.add.existing(lampLight2)
        this.add.existing(lampLight3)

    }


}