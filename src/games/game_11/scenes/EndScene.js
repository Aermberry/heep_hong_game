import BasicScene from './BasicScene'
import EndBroad from '../components/DialogTipBox'

export default class EndScene extends BasicScene {

    constructor() {
        super({
            key: 'End'
        });

    }

    create() {

        super.create();


        this.buildBg('bgTutor')

        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6))

        this.add.existing(this.endBroad)        

    }

}