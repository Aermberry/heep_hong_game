export default class DropZone {
    constructor(scene, x, y) {
        this.blankRoadImg = scene.add.image(x, y, 'car_box')
        this.blankRoadImg.setOrigin(0,0);
        this.blankRoadImg.setDepth(1);
        this.blankRoadImg.setInteractive();
        this.blankRoad = scene.add.zone(this.blankRoadImg.x, this.blankRoadImg.y, this.blankRoadImg.width, this.blankRoadImg.height);
        this.blankRoad.setRectangleDropZone(this.blankRoadImg.width, this.blankRoadImg.height);
    }

}