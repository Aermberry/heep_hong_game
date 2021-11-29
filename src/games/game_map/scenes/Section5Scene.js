import SectionBasicScene from "./SectionBasicScene"
import BackBtn from "../objects/BackBtn"
import HintBtn from "../objects/HintBtn"
import GameNavBtn from "../objects/GameNavBtn"

export default class Section5Scene extends SectionBasicScene {

    constructor() {
        super('Section_5')
    }

    preload() {

        this.buildPreloadBg('bg_title', {x: 0.8, y: 0.6})

        const atlasFiles = {

        }

        const imageFiles = {
            game5Bg: require('../assets/images/section_5/game_bg.png'),
            s5Hint: require('../assets/images/section_5/target.png'),
            s5Logo: require('../assets/images/section_5/game_art.png'),
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles
        })

        this.load.spritesheet('s5btn1', require('../assets/images/section_5/btn.png'),{ frameWidth: 131, frameHeight: 135 })

    }

    create() {
        
        super.create()

        this.initSection('game5Bg')

    }

    populateSection() {
    
        const backBtn = new BackBtn(this, this.getColWidth(1), this.getRowHeight(1.5))
        const hintBtn = new HintBtn(this, this.getColWidth(8), this.getRowHeight(5), 's5Hint')
        const gameBtn1 = new GameNavBtn(this, this.getColWidth(6), this.getRowHeight(6), 's5btn1', '/game/20')

        this.add.image(this.getColWidth(3.5), this.getRowHeight(1.5), 's5Logo')
        this.add.existing(backBtn)
        this.add.existing(hintBtn)
        this.add.existing(gameBtn1)

    }

}