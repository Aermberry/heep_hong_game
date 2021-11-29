import Phaser from 'phaser'
export default class AnswerBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.blankRoadImg = scene.add.rectangle(x,y, 385, 400)       
        this.blankRoadImg.setInteractive();
        this.blankRoad = scene.add.zone(this.blankRoadImg.x, this.blankRoadImg.y, this.blankRoadImg.width, this.blankRoadImg.height);
        this.blankRoad.setRectangleDropZone(this.blankRoadImg.width, this.blankRoadImg.height);
    }

}