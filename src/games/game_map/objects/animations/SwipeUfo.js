import Phaser from 'phaser'

export default class SwipeUfo extends Phaser.GameObjects.Container{

    constructor(scene, x, y) {
        super(scene, x, y)

        this.ufo = new Phaser.GameObjects.Sprite(scene, 0, 0, 'ufo')
        this.ufo.setScale(0.5)
        //Draw an cricle as flight path

        this.add([this.ufo]);

        this.path = new Phaser.Curves.Path()
        this.path.add(new Phaser.Curves.Ellipse(0, 0, 500, 250, 0, 360, false, 310))
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() }

        this.scene.tweens.add({
            targets: [this.follower, this.ufo],
            t: 1,
            scale: 1.5,
            ease: 'Sine.easeInOut',
            duration: 10000,
            repeat: -1
        })

    }

    initObject() {
        


        // const salt = Math.random()
        // this.scene.tweens.add({
        //     targets: this,
        //     x: this.x - this.width * (0.9 + (0.2 * salt)),
        //     yoyo: true,
        //     loop: -1,
        //     duration: 12000 + (4000 * salt),
        //     ease: Phaser.Math.Easing.Linear,
        //     delay: 1000 * salt
        // })
    }

    updatePositionWithPath() {

        this.path.getPoint(this.follower.t, this.follower.vec)

        this.ufo.setPosition(this.follower.vec.x, this.follower.vec.y)

    }

}