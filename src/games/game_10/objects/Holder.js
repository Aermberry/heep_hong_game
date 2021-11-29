export default class Holder {
    constructor(scene, x, y) {
        this.scene = scene;
        this.holder = scene.add.sprite(x, y, 'holder')
    }

    refreshZone() {
        this.holderZone = this.scene.add.zone(this.holder.x, this.holder.y, this.holder.width, this.holder.height);
        this.holderZone.setRectangleDropZone(this.holder.width, this.holder.height);
        this.holderZone.setDropZone(true);
    }

}