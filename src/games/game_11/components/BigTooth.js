import Tooth from "./Tooth";

export default class BigTooth extends Tooth {

    constructor(scene, x, y, label) {
        super(scene, x, y, label, 'stageBigTooth');

        this.create()
    }
}