import Phaser from 'phaser'

export default class BasicPlayer extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {
        super(scene, x, y, [])

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

    checkWrong() {

    }

    toLeftAnimate() {
        return Promise((resolve) => resolve())
    }

    toRightAnimate() {
        return Promise((resolve) => resolve())
    }

    wrongAnimate() {
        return Promise((resolve) => resolve())
    }

    moveWithAnim({ x, y, time = 1000 }) {

        let self = this

        let tweenObj = {
            targets: self,
            duration: time,
        }
console.log('no delay')
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

    
    /**
     * Provide an array for preloadFromArr function
     * @return      {img, atlas, sound}
     */
     static getAssetArray() {

        return {
            img: {

            },
            atlas: {

            },
            sound: {
                
            }
        }

    }

}