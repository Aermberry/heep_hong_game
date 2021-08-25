import Phaser from 'phaser'

export default class Leaf extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {

        super(scene, x, y, 'leaf')

        scene.anims.create({
            key: 'leaf_fall',
            repeat: -1,
            frames: scene.anims.generateFrameNames('leaf', { prefix: 'leaf_drop', start: 0, end: 58, zeroPad: 4 }),
        });

        this.play('leaf_fall');

        
    }


}