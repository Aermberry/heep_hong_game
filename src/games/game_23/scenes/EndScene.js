import BasicScene from './BasicScene'
import VictoryDialog from '../components/DialogTipBox'



export default class EndScene extends BasicScene {

    constructor() {
        super('End');

    }

    create() {

        super.create();

        this.buildBg('bgVictory')

        this.endBroad = new VictoryDialog(this, this.getColWidth(6), this.getRowHeight(6));
        localStorage.clear()

    }

}