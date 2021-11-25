import SectionBasicScene from './SectionBasicScene'
import GameNavBtn from '../objects/GameNavBtn'
import BackBtn from '../objects/BackBtn'
import HintBtn from '../objects/HintBtn'

export default class Section4Scene extends SectionBasicScene {

    constructor() {
        super('Section_4')
    }

    preload() {

        this.buildPreloadBg('bg_title')

        const atlasFiles = {

        }

        const imageFiles = {
            game4Bg: require('../assets/images/section_4/game_bg.png'),
            s4Hint1: require('../assets/images/section_4/target_1.png'),
            s4Hint2: require('../assets/images/section_4/target_2.png'),
            s4Hint3: require('../assets/images/section_4/target_3.png'),
            s4Logo: require('../assets/images/section_4/game_job.png'),
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles
        })

        this.load.spritesheet('s4btn1', require('../assets/images/section_4/btn_1.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn2', require('../assets/images/section_4/btn_2.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn3', require('../assets/images/section_4/btn_3.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn4', require('../assets/images/section_4/btn_4.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn5', require('../assets/images/section_4/btn_5.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s4btn6', require('../assets/images/section_4/btn_6.png'),{ frameWidth: 132, frameHeight: 134.5 })

    }

    create() {

        super.create()

        this.initSection('game4Bg')

    }

    populateSection() {

        const backBtn = new BackBtn(this, this.getColWidth(1), this.getRowHeight(1.5))
        const game1Btn = new GameNavBtn(this, this.getColWidth(2.4), this.getRowHeight(8.7), 's4btn1')
        const game2Btn = new GameNavBtn(this, this.getColWidth(6.8), this.getRowHeight(4.7), 's4btn2')
        const game3Btn = new GameNavBtn(this, this.getColWidth(7.7), this.getRowHeight(6.1), 's4btn3')
        const game4Btn = new GameNavBtn(this, this.getColWidth(10.5), this.getRowHeight(6), 's4btn4')
        const game5Btn = new GameNavBtn(this, this.getColWidth(4.5), this.getRowHeight(10.3), 's4btn5')
        const game6Btn = new GameNavBtn(this, this.getColWidth(5.8), this.getRowHeight(10), 's4btn6')
        const HintBtn1 = new HintBtn(this, this.getColWidth(2.5), this.getRowHeight(6), 's4Hint1')
        const HintBtn2 = new HintBtn(this, this.getColWidth(7.5), this.getRowHeight(10), 's4Hint2')
        const HintBtn3 = new HintBtn(this, this.getColWidth(9), this.getRowHeight(6), 's4Hint3')

        this.add.image(this.getColWidth(3.3), this.getRowHeight(1.5), 's4Logo')
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

    }

}