import BasicScene from './BasicScene'
import EndBroad from '../objects/EndGameBroad'

export default class EndScene extends BasicScene {

    constructor() {
        super({
            key: 'End'
        });

    }

    create() {

        super.create();


        this.buildBg('bg_base')

        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))

        this.add.existing(this.endBroad)        

        this.sound.stopAll()

        // let bgBroad = 
        // this.add.image(0,0,'end_box');

        // bgBroad.setOrigin(0.5)

    }

}