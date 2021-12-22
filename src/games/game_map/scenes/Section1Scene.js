import BasicScene from './BasicScene'
import GameNavBtn from '../objects/GameNavBtn'
import HintBtn from '../objects/HintBtn'
import BackBtn from '../objects/BackBtn'
// import StartBtn from '../objects/StartBtn'

export default class Section1Scene extends BasicScene {

    constructor() {
        super('Section_1')
    }

    init() {
        this.initPromise = null
        this.isPreloadResolved = false

        this.dataModel = this.sys.game.globals.model;
    }

    preload() {

        this.buildPreloadBg('bg_title')

        const atlasFiles = {
            // 'tut1': { img: require('../assets/anims/tut1.png'), data: require('../assets/anims/tut1.json')},
            // 'tut2': { img: require('../assets/anims/tut2.png'), data: require('../assets/anims/tut2.json')},
            // 'tut3': { img: require('../assets/anims/tut3.png'), data: require('../assets/anims/tut3.json')},
        }

        const imageFiles = {
            game1Bg: require('../assets/images/section_1/game_bg.png'),
            s1Hint1: require('../assets/images/section_1/target_1.png'),
            s1Hint2: require('../assets/images/section_1/target_2.png')
            // 'game1Btn': require('../assets/images/buttons/1a.png'),
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

        this.load.spritesheet('s1btn1', require('../assets/images/section_1/btn_1.png'),{ frameWidth: 131, frameHeight: 134 })
        this.load.spritesheet('s1btn2', require('../assets/images/section_1/btn_2.png'),{ frameWidth: 131, frameHeight: 133 })
        this.load.spritesheet('s1btn3', require('../assets/images/section_1/btn_3.png'),{ frameWidth: 131, frameHeight: 131 })
        this.load.spritesheet('s1btn4', require('../assets/images/section_1/btn_4.png'),{ frameWidth: 131, frameHeight: 134 })
        this.load.spritesheet('spaceRestaurantLogo', require('../assets/images/section_1/logo-121.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('spaceFactoryLogo', require('../assets/images/section_1/logo-122.png'),{ frameWidth: 305, frameHeight: 314.5 })
        this.load.spritesheet('strBtn', require('../assets/images/buttons/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })

    }

    buildPreloadBg(imageName) {
        this.buildBg(imageName)

        this.initPromise = new Promise((resolve)=> {
            this.tweens.add({
                targets: this.bg,
                duration: 1000,
                scale: 2,
                alpha: 0
            }).on('complete', function() {
                this.isPreloadResolved = true
                resolve()
            })
        })

    }

    create() {
        super.create();

        if(this.isPreloadResolved) {
            this.initSection()
        }else {

            this.initPromise.then(()=> {
                this.initSection();
            })
        }

        // if(this.dataModel.isFirstLoad) {
        //     const startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(10))
        //     this.add.existing(startBtn)
        //     this.dataModel.isFirstLoad = false
        // }else {
        //     this.scene.start('Map')
        // }



        // this.scene.start('Map');
    }

    initSection() {

        this.buildBg('game1Bg')
        this.bg.setAlpha(0)
        this.bg.setScale(2)

        this.tweens.add({
            targets: this.bg,
            duration: 1000,
            scale: 1,
            alpha: 1
        }).on('complete', ()=> {
            this.populateSection()
        })

    }

    populateSection() {
        const game1Btn = new GameNavBtn(this, this.getColWidth(1.68), this.getRowHeight(8.8), 's1btn1', '/game/1')
        const game2Btn = new GameNavBtn(this, this.getColWidth(6.57), this.getRowHeight(5.3), 's1btn2', 'https://www.google.com')
        const game3Btn = new GameNavBtn(this, this.getColWidth(6.1), this.getRowHeight(8.2), 's1btn3', 'https://www.google.com')
        const game4Btn = new GameNavBtn(this, this.getColWidth(10.6), this.getRowHeight(7.5), 's1btn4', 'https://www.google.com')
        const hintBtnA = new HintBtn(this, this.getColWidth(3.2), this.getRowHeight(7), 's1Hint1', 'spaceRestaurantLogo')
        const hintBtnB = new HintBtn(this, this.getColWidth(8.3), this.getRowHeight(8.1), 's1Hint2', 'spaceFactoryLogo')
        const backBtn = new BackBtn(this, this.getColWidth(1), this.getRowHeight(1.5))

        this.add.existing(game1Btn)
        this.add.existing(game2Btn)
        this.add.existing(game3Btn)
        this.add.existing(game4Btn)
        this.add.existing(hintBtnA)
        this.add.existing(hintBtnB)
        this.add.existing(backBtn)
    }
}
