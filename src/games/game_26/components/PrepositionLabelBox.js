
import Label from './Label';

export default class PrepositionLabelBox extends Label {

    constructor(scene, point, phrase, style, gameObject) {


        super(scene, point.x, point.y, phrase, 'backgroundLabelPreposition', style);
        this.phrase = phrase;
        this.gameObject = gameObject;

        this.create();
    }

    onDownClicked() {
        this.gameObject.emit('clickedEvent', this.phrase);
    }

    onUpClicked() {
    }
}