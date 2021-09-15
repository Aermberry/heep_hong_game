import Tooth from "./Tooth";

export default class BigTooth extends Tooth {

    constructor(scene, x, y, label, image) {
        super(scene, x, y, label, image);

        this.create()
    }
}