
import Label from './Label';

export default class PrepositionLabelBox extends Label {

    constructor(scene, point, phrase, style) {


        super(scene, point.x, point.y, phrase, 'backgroundLabelPreposition', style);

        this.create();
    }
}