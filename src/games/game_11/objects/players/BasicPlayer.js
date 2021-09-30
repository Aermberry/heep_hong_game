import Phaser from 'phaser'

export default class BasicPlayer extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey)

        this.leftAnimationKey = null
        this.rightAnimationKey = null

        this.freezeInput = false

    }

    toLeft(x, y = null) {

        if (this.freezeInput) return Promise.resolve()

        this.freezeInput = true


        this.toLeftAnimate()

        return new Promise((resolve) => {
            this.moveWithAnim({
                x, y, time: this.getMovementDuration()
            }).then(() => {
                this.freezeInput = false
                resolve()
            })

        })

    }

    toRight(x, y = null) {

        if (this.freezeInput) return Promise.resolve()

        this.freezeInput = true

        this.toRightAnimate()

        return new Promise((resolve) => {

            this.moveWithAnim({
                x, y, time: this.getMovementDuration()
            }).then(()=> {
                this.freezeInput = false
                resolve()
            })
        })

    }

    toLeftAnimate() {
        return Promise((resolve) => resolve())
    }

    toRightAnimate() {
        return Promise((resolve) => resolve())
    }

    moveWithAnim({ x, y, time = 1000 }) {

        let self = this

        let tweenObj = {
            targets: self,
            duration: time,
        }

        if (typeof x != 'undefined' && x != null) tweenObj['x'] = x
        if (typeof y != 'undefined' && y != null) tweenObj['y'] = y

        return new Promise((resolve) => {
            this.scene.tweens.add(tweenObj).on('complete', ()=> {
                resolve()
            })
        }
        )

    }

    getMovementDuration() {
        return 1000
    }

}