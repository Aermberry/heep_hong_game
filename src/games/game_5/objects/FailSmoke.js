import Phaser from 'phaser'

export default class FailSmoke extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, scale = 1) {

        super(scene, x, y, 'fail_smoke')

        this.originPosition = {
            x,
            y
        }

        this.setScale(scale);
        this.setAngle(360 * scale)

        this.salt = Math.random();

        scene.tweens.add({
            targets: this,
            angle: this.angle + 360,
            duration: 2000,
            repeat: -1,
            ease: Phaser.Math.Easing.Linear

        })

    }

}