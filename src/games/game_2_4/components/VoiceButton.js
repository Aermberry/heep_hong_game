import Button from "../Framework/UI/Button";


export default class VoiceButton extends Button {

    constructor(scene, x, y) {

        super(scene, x, y,'voiceButton');
       
    }

    onDownClicked() {
        this.texture.setFrame(3);
    }

    onUpClicked() {
        this.texture.setFrame(2);
    }
}