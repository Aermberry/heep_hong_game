import Phaser from 'phaser'

export default class BasicPlayer extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, spriteKey) {
        super(scene, x, y, spriteKey)

        this.leftAnimationKey = null
        this.rightAnimationKey = null

        this.freezeInput = false

    }

    toLeft(x, y= null) {

        if(this.freezeInput) return

        this.freezeInput = true

        this.moveWithAnim({
            x, y, time: this.getMovementDuration()
        })

        this.toLeftAnimate().then(()=> {
            this.freezeInput = false
        })

        return 'turn_left_anime'
    }

    toRight(x, y= null) {

        if(this.freezeInput) return

        this.freezeInput = true

        this.moveWithAnim({
            x, y, time: this.getMovementDuration()
        })

        this.toRightAnimate().then(()=> {
            this.freezeInput = false
        })

        return 'turn_right_anime'
    }

    toLeftAnimate() {
        return Promise((resolve)=> resolve())
    }

    toRightAnimate() {
        return Promise((resolve)=> resolve())
    }

    moveWithAnim({x, y, time= 1000}) {

        let self = this

        let tweenObj = {
            targets: self,
            duration: time,
        }

        if(typeof x !=  'undefined' && x != null) tweenObj['x'] = x
        if(typeof y != 'undefined' && y != null) tweenObj['y'] = y

    console.log(
        'tweenObj',
        tweenObj)

        this.scene.tweens.add(tweenObj).on('complete', ()=> {



        })
    
        return new Promise((resolve)=> {
            // this.scene.tween.add(tweenObj).on('complete', ()=> {
            //         resolve()
            //     })

                resolve()
            }
        )

    }

    getMovementDuration() {
        return 1000
    }

}