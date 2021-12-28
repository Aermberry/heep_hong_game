
import Label from './Label';

export default class PhraseLabelBox extends Label {

    constructor(scene, point, phrase, style) {


        super(scene, point.x, point.y, phrase, 'backgroundLabelPhrase', style);

        this.create();
    }

    onDownClicked() {
        console.log("on down");
    }

    onUpClicked() {

        console.log("on up");
    }
}