import Phaser from "phaser";

export default class TutorSprite extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {

        super(scene, x, y,texture);


        scene.add.existing(this);
        
    }


}