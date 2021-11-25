import SectionBasicScene from "./SectionBasicScene"
import GameNavBtn from '../objects/GameNavBtn'
import HintBtn from '../objects/HintBtn'
import BackBtn from '../objects/BackBtn'

export default class Section2Scene extends SectionBasicScene {

    constructor() {
        super('Section_2')
    }

    preload() {
        this.buildPreloadBg('bg_title')

        const atlasFiles = {

        }

        const imageFiles = {
            game2Bg: require('../assets/images/section_2/game_bg.png'),
            s2Hint: require('../assets/images/section_2/target.png'),
            s2Logo: require('../assets/images/section_2/game_kungfu.png'),
            // 'game1Btn': require('../assets/images/buttons/1a.png'),
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles
        })

        this.load.spritesheet('s2btn1', require('../assets/images/section_2/btn_1.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn2', require('../assets/images/section_2/btn_2.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn3', require('../assets/images/section_2/btn_3.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn4', require('../assets/images/section_2/btn_4.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn5', require('../assets/images/section_2/btn_5.png'),{ frameWidth: 132, frameHeight: 134.5 })
        this.load.spritesheet('s2btn6', require('../assets/images/section_2/btn_6.png'),{ frameWidth: 132, frameHeight: 134.5 })
    }

    create() {
        super.create()
        
        this.initSection('game2Bg')

    }

    populateSection() {

        const backBtn = new BackBtn(this, this.getColWidth(1), this.getRowHeight(1.5))
        const hintBtn = new HintBtn(this, this.getColWidth(6.32), this.getRowHeight(6), 's2Hint')
        const game1Btn = new GameNavBtn(this, this.getColWidth(2.55), this.getRowHeight(10.2), 's2btn1')
        const game2Btn = new GameNavBtn(this, this.getColWidth(3.85), this.getRowHeight(7.1), 's2btn2')
        const game3Btn = new GameNavBtn(this, this.getColWidth(9.6), this.getRowHeight(7.1), 's2btn3')
        const game4Btn = new GameNavBtn(this, this.getColWidth(9.1), this.getRowHeight(10.8), 's2btn4')
        const game5Btn = new GameNavBtn(this, this.getColWidth(1.3), this.getRowHeight(7.3), 's2btn5')
        const game6Btn = new GameNavBtn(this, this.getColWidth(6.32), this.getRowHeight(9.95), 's2btn6')

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