import BasicPlayer from './BasicPlayer'

export default class Truck extends BasicPlayer {

    constructor(scene, x, y) {
        super(scene, x, y)


        scene.anims.create({
            key: 'truck_turn',
            duration: this.getMovementDuration() - 200,
            frames: scene.anims.generateFrameNames('truck', { prefix: 'truck', start: 0, end: 4, zeroPad: 4 }),
        })

        this.truck = scene.add.sprite(0, 0, 'truck')

        this.add([this.truck])

    }

    toLeftAnimate() {

        return new Promise((resolve)=> {
            this.truck.playReverse('truck_turn').on('animationcomplete', ()=> {

                resolve()
            })
        })

    }

    toRightAnimate() {
        return new Promise((resolve)=> {
            this.truck.play('truck_turn').on('animationcomplete', ()=> {
                resolve()
            })
        })

    }

    wrongAnimate() {

    }

    getMovementDuration() {
        return 1000
    }

    static getAssetArray() {

        return {
            img: {

            },
            atlas: {
                'truck': { img: require('../../assets/anims/stage1/truck.png'), data: require('../../assets/anims/stage1/truck.json') },
            },
            sound: {
                
            }
        }

    }

}