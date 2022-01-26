import Egg from "./Egg";
import VoiceButton from "./VoiceButton";

export default class EggItem extends Egg {

    constructor(scene, point, texture, objectItem, voiceIndex, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.imageIndex);

        this.objectName = objectItem.object;
        this.index = voiceIndex;


        this.setName("EggItem");
        this.create(isEnableDraggable);

        this.voiceButton = new VoiceButton(this.scene, -20, 120, "voice" + voiceIndex);
        this.voiceButton.setScale(0.2);

        this.add(this.voiceButton);
    }

    setRemoveListener() {
        super.setRemoveListener();
        this.voiceButton.cancelListener();
    }

    setEnableListener() {
        super.setEnableDraggable();
        this.voiceButton.enableListener();
    }

}