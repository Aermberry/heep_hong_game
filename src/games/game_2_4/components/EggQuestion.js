import Egg from "./Egg";

export default class EggQuestion extends Egg {
    constructor(scene, point, texture, objectItem, isEnableDraggable) {

        super(scene, point, texture, "textureObject" + objectItem.questionTextureIndex);

        this.objectName = objectItem.objectName;

        this.setName("EggQuestion");

        this.create(isEnableDraggable);
    }
}