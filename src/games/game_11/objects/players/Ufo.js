import BasicPlayer from './BasicPlayer'

export default class Ufo extends BasicPlayer {

    constructor(scene, x, y) {
        super(scene, x, y)

        scene.anims.create({
            key: 'ufo_turn',
            duration: this.getMovementDuration(),
            frames: scene.anims.generateFrameNames('ufo', { prefix: 'ufo', start: 0, end: 8, zeroPad: 4 }),
        })

        this.ufo = scene.add.sprite(0, 0, 'ufo')

        this.add([this.ufo])

    }

    toLeftAnimate() {

        return new Promise((resolve)=> {
            this.ufo.playReverse('ufo_turn').on('animationcomplete', ()=> {
                resolve()
            })
        })

    }

    toRightAnimate() {
        return new Promise((resolve)=> {
            this.ufo.play('ufo_turn').on('animationcomplete', ()=> {
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
                'ufo': { img: require('../../assets/anims/stage3/ufo.png'), data: require('../../assets/anims/stage3/ufo.json') },
            },
            sound: {
                
            }
        }

    }

}