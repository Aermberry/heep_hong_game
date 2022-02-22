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

        this.buildBg('bg_L1')
        this.sound.stopAll();

        let music = this.sound.add('endpic');
        music.setLoop(true);
        music.play();
        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))
        this.add.rectangle(0,0,10000,10000, 0x0d6f3f, 0.9)
        this.add.existing(this.endBroad)        

    }

}