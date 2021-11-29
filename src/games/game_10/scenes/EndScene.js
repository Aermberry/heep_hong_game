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

        this.buildBg('cover_bg')
        this.sound.stopAll();
        let music = this.sound.add('end_pic');
        music.play();
        // this.sound.stopByKey('lightBattle')
        // let music = this.sound.add('jump')
        // music.setLoop(true)
        // music.play()

        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))
        this.add.existing(this.endBroad)        

    }

}