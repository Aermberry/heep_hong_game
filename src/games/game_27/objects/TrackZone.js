import Phaser from "phaser";
export default class TrackZone extends Phaser.GameObjects.Zone {
    constructor(scene,x,y,) {
        super(scene,x,y,1920,500);
        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.body.moves = false;
        this.setOrigin(0)
        this.setRectangleDropZone(1920,500);
    }
    
}