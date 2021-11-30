import Phaser from 'phaser'

export default class Cloud extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'cloud_big')
        this.initObject()
    }

    initObject() {
        const salt = Math.random()
        this.scene.tweens.add({
            targets: this,
            x: this.x - this.width * (0.9 + (0.2 * salt)),
            yoyo: true,
            loop: -1,
            duration: 12000 + (4000 * salt),
            ease: Phaser.Math.Easing.Linear,
            delay: 1000 * salt
        })
    }

}