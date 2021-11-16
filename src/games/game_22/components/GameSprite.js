import Phaser from "phaser";

export default class GameSprite extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, animation) {

        super(scene, x, y);
        scene.add.existing(this);

        this.anims.play(animation);
        
    }


}