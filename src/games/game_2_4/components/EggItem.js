import Egg from "./Egg";

export default class EggItem extends Egg {

    constructor(scene, point, texture, objectItem, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.questionTextureIndex);

        this.objectName = objectItem.objectName;

        this.create(isEnableDraggable);
    }

}