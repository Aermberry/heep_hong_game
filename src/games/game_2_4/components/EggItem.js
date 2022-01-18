import Egg from "./Egg";
import { EggStatus } from "./EggStatus";
import VoiceButton from "./VoiceButton";

export default class EggItem extends Egg {

    constructor(scene, point, texture, objectItem, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.index);

        this.objectName = objectItem.objectName;
        this.index = objectItem.index;


        this.setName("EggItem");
        this.create(isEnableDraggable);

        const voiceButton = new VoiceButton(this.scene, -20, 120, "voiceItemObject" + objectItem.index);
        voiceButton.setScale(0.2);

        this.add(voiceButton);
    }

    showErrorStatue(callback) {
        super.showErrorStatue();
        this.eggStatus = EggStatus.Failed;

        callback();
    }

}