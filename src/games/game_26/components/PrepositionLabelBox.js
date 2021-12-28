
import Label from './Label';

export default class PrepositionLabelBox extends Label {

    constructor(scene, point, phrase, style, answerPanel) {


        super(scene, point.x, point.y, phrase, 'backgroundLabelPreposition', style);
        this.phrase = phrase;
        this.answerPanel = answerPanel;

        this.create();
    }

    onDownClicked() {
        console.log("on down");
        // console.log(this.answerPanel);
        this.answerPanel.emit('clickedEvent', this.phrase);
    }

    onUpClicked() {

        console.log("on up");
    }
}