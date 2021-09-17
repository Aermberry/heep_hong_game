import Tooth from "./Tooth";

export default class SmallTooth extends Tooth {

    constructor(scene, x, y, label) {
        super(scene, x, y, label, 'stageSmallTooth');

        this.type = 'smallTooth';

        this.x = x;
        this.y = y;
        this.create()
    }

}