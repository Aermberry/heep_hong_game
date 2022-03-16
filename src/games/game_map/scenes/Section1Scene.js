import BasicScene from './BasicScene'
import GameNavBtn from '../objects/GameNavBtn'
import HintBtn from '../objects/HintBtn'
import BackBtn from '../objects/BackBtn'
import SpeakerBtn from '../objects/SpeakerBtn'
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
            'stars': { img: require('../assets/images/section_1/stars.png'), data: require('../assets/images/section_1/stars.json')},
            'star': { img: require('../assets/images/section_1/star.png'), data: require('../assets/images/section_1/star.json')}
            // 'tut1': { img: require('../assets/anims/tut1.png'), data: require('../assets/anims/tut1.json')},
            // 'tut2': { img: require('../assets/anims/tut2.png'), data: require('../assets/anims/tut2.json')},
            // 'tut3': { img: require('../assets/anims/tut3.png'), data: require('../assets/anims/tut3.json')},
        }

        const imageFiles = {
            game1Bg: require('../assets/images/section_1/game_bg.png'),
            // s1Hint1: require('../assets/images/section_1/target_1.png'),
            // s1Hint2: require('../assets/images/section_1/target_2.png'),
            g1Hint: require('../assets/images/section_1/Game_target_Z-01.png'),
            g2Hint: require('../assets/images/section_1/Game_target_Z-02.png'),
            g3Hint: require('../assets/images/section_1/Game_target_Z-03.png'),
            g4Hint: require('../assets/images/section_1/Game_target_Z-04.png'),
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

        this.createProgressBar(false)

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

        this.sound.stopAll()

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
        const game2Btn = new GameNavBtn(this, this.getColWidth(6.57), this.getRowHeight(5.3), 's1btn2', '/game/2')
        const game3Btn = new GameNavBtn(this, this.getColWidth(6.1), this.getRowHeight(8.2), 's1btn3', '/game/3')
        const game4Btn = new GameNavBtn(this, this.getColWidth(10.6), this.getRowHeight(7.5), 's1btn4', '/game/4')
        const hintBtnA = new HintBtn(this, this.getColWidth(3.2), this.getRowHeight(7), [game1Btn], 'spaceRestaurantLogo')
        const hintBtnB = new HintBtn(this, this.getColWidth(8.3), this.getRowHeight(8.1), [game2Btn, game3Btn, game4Btn], 'spaceFactoryLogo')
        const backBtn = new BackBtn(this, 100, 120)
        const speakerBtn = new SpeakerBtn(this, 1820, 120)

        game1Btn.initHint('g1Hint', this.getColWidth(2.1), this.getColWidth(0))
        game2Btn.initHint('g2Hint', this.getColWidth(0), this.getColWidth(-1.5))
        game3Btn.initHint('g3Hint', this.getColWidth(-2.5), this.getColWidth(0))
        game4Btn.initHint('g4Hint', this.getColWidth(-0.4), this.getColWidth(-1.5))


        this.anims.create({
            key: 'stars',
            frames: this.anims.generateFrameNames('stars', { prefix: 'Symbol 1', start: 0, end: 6, zeroPad: 4 }),
            repeat: -1,
            repeatDelay: 1000
        });


        let animate = this.add.sprite(this.getColWidth(8.6), this.getRowHeight(9), 'stars')
        animate.play('stars')

        this.anims.create({
            key: 'star',
            frames: this.anims.generateFrameNames('star', { prefix: 'Symbol 1', start: 0, end: 6, zeroPad: 4 }),
            repeat: -1,
            repeatDelay: 1000
        });


        let animate2 = this.add.sprite(this.getColWidth(2), this.getRowHeight(1), 'star')
        animate2.play('star')

        let animate3 = this.add.sprite(this.getColWidth(4), this.getRowHeight(9), 'star')
        animate3.play('star')

        this.add.existing(hintBtnA)
        this.add.existing(hintBtnB)
        this.add.existing(game1Btn)
        this.add.existing(game2Btn)
        this.add.existing(game3Btn)
        this.add.existing(game4Btn)
        this.add.existing(backBtn)
        this.add.existing(speakerBtn)
    }
}
