import SectionBasicScene from "./SectionBasicScene";
import BackBtn from "../objects/BackBtn"
import HintBtn from "../objects/HintBtn"
import GameNavBtn from "../objects/GameNavBtn";

export default class Section6Scene extends SectionBasicScene {

    constructor() {
        super('Section_6')
    }

    preload() {

        this.buildPreloadBg('bg_title')

        const atlasFiles = {

        }

        const imageFiles = {
            game6Bg: require('../assets/images/section_6/game_bg.png'),
            s6Hint: require('../assets/images/section_6/target.png'),
            s6Logo: require('../assets/images/section_6/game_magic.png')
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles
        })

        this.load.spritesheet('s6btn1', require('../assets/images/section_6/btn.png'),{ frameWidth: 132, frameHeight: 140 })
        this.load.spritesheet('s6HintLogo', require('../assets/images/section_6/logo-134.png'),{ frameWidth: 305, frameHeight: 314.5 })

    }

    create() {
        
        super.create()

        this.initSection('game6Bg')

    }

    populateSection() {
    
        const backBtn = new BackBtn(this, this.getColWidth(1), this.getRowHeight(1.5))
        const hintBtn = new HintBtn(this, this.getColWidth(6.8), this.getRowHeight(5.5), 's6Hint', 's6HintLogo')
        const gameBtn = new GameNavBtn(this, this.getColWidth(7.6), this.getRowHeight(7.4), 's6btn1', '/game/10')

        this.add.image(this.getColWidth(3), this.getRowHeight(1.5), 's6Logo')
        this.add.existing(backBtn)
        this.add.existing(hintBtn)
        this.add.existing(gameBtn)

    }


}