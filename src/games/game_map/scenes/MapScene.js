import BasicScene from './BasicScene'
// import Game1Btn from '../objects/Game1Btn';
import SectionBtn from '../objects/SectionBtn';


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

        this.add.existing(game1Btn)

        this.add.existing(game3Btn)
        this.add.existing(game4Btn)
        this.add.existing(game5Btn)
        this.add.existing(game6Btn)

        this.add.existing(game2Btn)
        // this.scene.start('Map');
    }
}
