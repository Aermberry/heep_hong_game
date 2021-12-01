import Phaser from 'phaser'

export default class Vehicle extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, config) {
        super(scene, x, y, 'vehicle')
        this.moveConfig = config
        this.initObject()
    }

    initObject() {
        console.log('moveConfig',this.moveConfig)
        const salt = Math.random()
        const origX = this.x
        const origY = this.y
        this.scene.tweens.add({
            targets: this,
            x: this.moveConfig.x,
            y: this.moveConfig.y,
            loop: -1,
            loopDelay: 10000,
            duration: 80000 + (10000 * salt),
            ease: Phaser.Math.Easing.Circular.Out,
            delay: 200 * salt
        }).on('loop', ()=> {
            this.setX(origX)
            this.setY(origY)   
        })
    }

}