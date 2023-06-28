import Egg from "./Egg";
import VoiceButton from "./VoiceButton";

export default class EggQuestion extends Egg {
    constructor(scene, point, texture, objectItem, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.imageIndex);

        this.objectName = objectItem.object;
        this.index = objectItem.voiceIndex;

        this.setName("EggQuestion");

        this.create(isEnableDraggable);

        this.voiceButton = new VoiceButton(this.scene, 30, 90, "voice" + objectItem.voiceIndex);
        this.voiceButton.setScale(0.2);

        this.add(this.voiceButton);

        this.getByName('texture').setX(0);
        
    }


    setRemoveListener() {
        this.voiceButton.cancelListener();
    }

    setEnableListener() {
        this.voiceButton.enableListener();
    }




}