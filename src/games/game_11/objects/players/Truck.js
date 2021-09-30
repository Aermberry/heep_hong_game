import BasicPlayer from './BasicPlayer'

export default class Truck extends BasicPlayer {

    constructor(scene, x, y) {
        super(scene, x, y, 'truck')

        scene.anims.create({
            key: 'truck_turn',
            duration: this.getMovementDuration() - 200,
            frames: this.anims.generateFrameNames('truck', { prefix: 'truck', start: 0, end: 9, zeroPad: 4 }),
        })

    }

    toLeftAnimate() {

        return new Promise((resolve)=> {
            this.playReverse('truck_turn').on('animationcomplete', ()=> {
                resolve()
            })
        })

    }

    toRightAnimate() {

        return new Promise((resolve)=> {
            this.play('truck_turn').on('animationcomplete', ()=> {
                resolve()
            })
        })

    }

    getMovementDuration() {
        return 1000
    }

}