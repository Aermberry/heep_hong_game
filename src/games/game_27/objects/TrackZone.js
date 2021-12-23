import Phaser from "phaser";
export default class TrackZone extends Phaser.GameObjects.Zone {
    constructor(scene,x,y,) {
        super(scene,x,y,1920,500);
        this.setOrigin(0)
        this.setRectangleDropZone(1920,500);
        var graphics = scene.add.graphics();
        graphics.lineStyle(2, 0xffff00);
        graphics.strokeRect(x,y,  this.input.hitArea.width, this.input.hitArea.height);
    }
}