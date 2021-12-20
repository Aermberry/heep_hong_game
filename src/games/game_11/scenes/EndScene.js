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

        this.buildBg('end_bg')

        this.sound.stopAll()

        let music = this.sound.add('end_bgm')
        music.setLoop(true)
        music.play()

        let clap = this.sound.add('win')
        clap.play()

        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))

        this.add.existing(this.endBroad)        

    }

}