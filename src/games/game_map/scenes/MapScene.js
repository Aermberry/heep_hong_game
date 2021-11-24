import BasicScene from './BasicScene'
import Game1Btn from '../objects/Game1Btn';

export default class MapScene extends BasicScene {

    constructor() {
        super('Map');
    }

    preload() {
        this.buildBg('bg_title')
    }

    create() {
        super.create();

        const game1Btn = new Game1Btn(this, this.getColWidth(2.29), this.getRowHeight(3.2))

        this.add.existing(game1Btn)
console.log('started map');
        // this.scene.start('Map');
    }
}
