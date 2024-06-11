import Phaser from 'phaser'

export default class Doll extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture, name) {

        super(scene, x, y, texture)

        this.originX = x;
        this.originY = y;

        this.setName(name);
        this.setScale(0.8);

        this.setToPhysics(scene);
        scene.add.existing(this);
    }

    setToPhysics(scene) {
        scene.physics.add.existing(this);
    }
}