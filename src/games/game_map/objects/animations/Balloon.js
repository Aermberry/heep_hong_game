import Phaser from 'phaser'

export default class Ballon extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y) {
        super(scene, x, y, 'balloon')
        this.initObject()
    }

    initObject() {
        const salt = Math.random()
        this.scene.tweens.add({
            targets: this,
            y: this.y - this.height * (0.6 + (0.2 * salt)),
            yoyo: true,
            loop: -1,
            duration: 6000 + (2000 * salt),
            ease: Phaser.Math.Easing.Back.InOut,
            delay: 500 * salt
        })
    }

}