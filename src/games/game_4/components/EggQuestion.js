import Egg from "./Egg";
import VoiceButton from "./VoiceButton";

export default class EggQuestion extends Egg {
    constructor(scene, point, texture, objectItem, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.index);

        this.objectName = objectItem.objectName;
        this.index = objectItem.index;

        this.setName("EggQuestion");

        this.create(isEnableDraggable);

        this.voiceButton = new VoiceButton(this.scene, 30, 90, "voice" + objectItem.index);
        this.voiceButton.setScale(0.2);

        this.add(this.voiceButton);
    }


    setRemoveListener() {
        this.voiceButton.cancelListener();
    }

    setEnableListener() {
        this.voiceButton.enableListener();
    }




}