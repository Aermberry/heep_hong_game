import Button from "../phaser3_framework/ui/Button";


export default class PlayerButton extends Button {

    constructor(scene, x, y) {

        super(scene, x, y, 'playerButton', 2);
    }

    onDownClicked() {
        
    }

    onUpClicked() {
        this.parentContainer.playAudio();
    }
}