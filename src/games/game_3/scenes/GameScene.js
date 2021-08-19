import BasicScene from "./BasicScene"
import CatBack from "../objects/CatBack"
import ItemBam from '../objects/ItemBam'

export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {

        this.buildBg('bg_tutor')

        const imageFiles = {
            'itemBam': require('../assets/item_bam.png'),
            'an1': require('../assets/an1.png'),
            'an2': require('../assets/an2.png')
        };

        const atlasFiles = {
            'headband': { img: require('../assets/headband.png'), data: require('../assets/headband.json')},
            'cat_back': { img: require('../assets/cat_back.png'), data: require('../assets/cat_back.json')},
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        });

        this.createProgressBar();

    }

    create() {

        super.create();

        this.buildBg('bg_base')

        this.catBack = new CatBack(this, this.getColWidth(9), this.getRowHeight(7.5))

        this.bam = new ItemBam(this, this.getColWidth(5), this.getRowHeight(6))

        this.add.existing(this.bam)
        this.add.existing(this.catBack)

        this.bam.moveIn();
        this.catBack.moveIn();


    }

}