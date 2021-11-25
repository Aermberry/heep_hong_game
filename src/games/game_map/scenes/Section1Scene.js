import BasicScene from './BasicScene'
import GameNavBtn from '../objects/GameNavBtn'
import HintBtn from '../objects/HintBtn'
import BackBtn from '../objects/BackBtn'

export default class Section1Scene extends BasicScene {

    constructor() {
        super('Section_1')
    }

    init() {
        this.initPromise = null
        this.isPreloadResolved = false
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
            s1Hint1: require('../assets/images/section_1/target.png'),
            s1Hint2: require('../assets/images/section_1/target2.png')
            // 'game1Btn': require('../assets/images/buttons/1a.png'),
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles
        })

        this.load.spritesheet('s1btn1', require('../assets/images/section_1/btn_1.png'),{ frameWidth: 131, frameHeight: 134 })
        this.load.spritesheet('s1btn2', require('../assets/images/section_1/btn_2.png'),{ frameWidth: 131, frameHeight: 133 })
        this.load.spritesheet('s1btn3', require('../assets/images/section_1/btn_3.png'),{ frameWidth: 131, frameHeight: 131 })
        this.load.spritesheet('s1btn4', require('../assets/images/section_1/btn_4.png'),{ frameWidth: 131, frameHeight: 134 })

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
        const game1Btn = new GameNavBtn(this, this.getColWidth(1.68), this.getRowHeight(8.8), 's1btn1', 'www.google.com')
        const game2Btn = new GameNavBtn(this, this.getColWidth(6.57), this.getRowHeight(5.3), 's1btn2', 'www.yahoo.com')
        const game3Btn = new GameNavBtn(this, this.getColWidth(6.1), this.getRowHeight(8.2), 's1btn3', 'www.yahoo.com')
        const game4Btn = new GameNavBtn(this, this.getColWidth(10.6), this.getRowHeight(7.5), 's1btn4', 'www.yahoo.com')
        const hintBtnA = new HintBtn(this, this.getColWidth(3), this.getRowHeight(7), 's1Hint2')
        const hintBtnB = new HintBtn(this, this.getColWidth(8), this.getRowHeight(8), 's1Hint1')
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
