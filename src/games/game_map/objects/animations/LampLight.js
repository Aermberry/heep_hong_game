import Phaser from 'phaser'

export default class LampLight extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'lamp_light')
        this.setAlpha(0.2)
        this.setScale(2)
        this.initObject()
    }

    initObject() {
        const salt = Math.random()
        this.scene.tweens.add({
            targets: this,
            alpha: 1,
            yoyo: true,
            loop: -1,
            duration: 1000 + (1000 * salt),
            ease: Phaser.Math.Easing.Linear,
            delay: 1000 * salt
        })
    }

}