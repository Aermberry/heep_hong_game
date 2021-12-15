import BasicScene from './BasicScene'
// import Game1Btn from '../objects/Game1Btn';
import SectionBtn from '../objects/SectionBtn'
import Balloon from '../objects/animations/Balloon'
import Cloud from '../objects/animations/Cloud';
export default class MapScene extends BasicScene {

    constructor() {
        super('Map');
    }

    preload() {
        this.buildBg('bg_title')
    }

    create() {
        super.create();

        const game1Btn = new SectionBtn(this, this.getColWidth(2.29), this.getRowHeight(3.2), 'section1Btn', 'Section_1')
        const game2Btn = new SectionBtn(this, this.getColWidth(7.74), this.getRowHeight(3.18), 'section2Btn', 'Section_2')
        const game3Btn = new SectionBtn(this, this.getColWidth(5.64), this.getRowHeight(8.9), 'section3Btn', 'Section_3')
        const game4Btn = new SectionBtn(this, this.getColWidth(2.95), this.getRowHeight(6.1), 'section4Btn', 'Section_4')
        const game5Btn = new SectionBtn(this, this.getColWidth(9.5), this.getRowHeight(7.1), 'section5Btn', 'Section_5')
        const game6Btn = new SectionBtn(this, this.getColWidth(6.15), this.getRowHeight(5.27), 'section6Btn', 'Section_6')
        // const game6Btn = new Game6Btn(this, this.getColWidth(6.15), this.getRowHeight(5.27))
        const balloon = new Balloon(this, this.getColWidth(4), this.getRowHeight(8.9))
        const balloon2 = new Balloon(this, this.getColWidth(7), this.getRowHeight(7.5))
        const cloud1 = new Cloud(this, this.getColWidth(9), this.getRowHeight(9))
        const cloud2 = new Cloud(this, this.getColWidth(3), this.getRowHeight(4.8))

        this.add.existing(game1Btn)
        this.add.existing(game2Btn)
        this.add.existing(game3Btn)
        this.add.existing(game4Btn)
        this.add.existing(game5Btn)

        this.add.existing(game6Btn)

        this.add.existing(balloon)
        this.add.existing(balloon2)
        this.add.existing(cloud1)
        this.add.existing(cloud2)

        // this.scene.start('Map');
    }
}
