import Egg from "./Egg";
import VoiceButton from "./VoiceButton";

export default class EggItem extends Egg {

    constructor(scene, point, texture, objectItem, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.index);

        this.objectName = objectItem.objectName;
        this.index = objectItem.index;


        this.setName("EggItem");
        this.create(isEnableDraggable);

        this.voiceButton = new VoiceButton(this.scene, -20, 120, "voiceItemObject" + objectItem.index);
        this.voiceButton.setScale(0.2);

        this.add(this.voiceButton);
    }

    setRemoveListener(){
        super.setRemoveListener();
        this.voiceButton.cancelListener( );
    }

    setEnableListener(){
        super.setEnableDraggable()
        this.voiceButton.enableListener( );
    }

}