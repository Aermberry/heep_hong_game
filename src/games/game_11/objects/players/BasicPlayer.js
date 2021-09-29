import Phaser from 'phaser'

export default class BasicPlayer extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey)

        this.leftAnimationKey = null;
        this.rightAnimationKey = null;

    }

    setLeftAnimation() {

        return 'turn_left_anime';
    }

    setRightAnimation() {

        return 'turn_right_anime';
    }

}