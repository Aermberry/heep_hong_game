
import Label from './Label';

export default class PhraseLabelBox extends Label {

    constructor(scene, x, y, phrase, style) {


        super(scene, x, y, phrase, 'backgroundLabelPhrase', style);

        this.create();
    }
}