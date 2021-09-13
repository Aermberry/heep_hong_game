import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import SpeakerBtn from '../objects/SpeakerBtn'
export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

    }

    init() {

    }

    preload() {
        this.anims.create({
            key: 'bearJob',
            delay: 200,
            frames: this.anims.generateFrameNames('bear_job', { prefix: 'bear1', start: 0, end: 33, zeroPad: 4 }),
        });
    }

    create() {
        super.create();

        this.buildBg('bg')

       

        let exitBtn = new ExitBtn(this, 120, 135);
        let speakerBtn = new SpeakerBtn(this, this.getColWidth(11), 100);
        this.add.existing(exitBtn);
        this.add.existing(speakerBtn);
        let tutq = this.add.sprite(this.getColWidth(8.7), this.getRowHeight(5.8), 'bear_job');
        tutq.play('bearJob');
        this.add.image(this.getColWidth(3.8), this.getRowHeight(8.5),'home');
        
    }


}