import BasicPlayer from './BasicPlayer'

export default class SkiPen extends BasicPlayer {

    constructor(scene, x, y) {
        super(scene, x, y)

        scene.anims.create({
            key: 'pen_turn',
            duration: this.getMovementDuration(),
            frames: scene.anims.generateFrameNames('pen', { prefix: 'skipen', start: 0, end: 8, zeroPad: 4 }),
        })

        // scene.anims.create({
        //     key: 'pen_left',
        //     repeat: -1,
        //     duration: 2000,
        //     frames: scene.anims.generateFrameNames('pen', { prefix: 'skipen', start: 0, end: 3, zeroPad: 4 }),
        // })

        // scene.anims.create({
        //     key: 'pen_right',
        //     repeat: -1,
        //     duration: 2000,
        //     frames: scene.anims.generateFrameNames('pen', { prefix: 'skipen', start: 6, end: 8, zeroPad: 4 }),
        // })

        this.pen = scene.add.sprite(0, 0, 'pen')

        this.pen.play('pen_left')

        this.add([this.pen])

        // this.scene.tweens.add({
        //     targets: this,
        //     x: this.x + 10,
        //     y: this.y + 10,
        //     loop: -1,
        //     duration: 1500
        // })

    }

    toLeftAnimate() {


        return new Promise((resolve) => {
            this.pen.playReverse('pen_turn').on('animationcomplete', () => {
                resolve()
            })
        })

    }

    toRightAnimate() {

        return new Promise((resolve) => {
            this.pen.play('pen_turn').on('animationcomplete', () => {
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
                'pen': { img: require('../../assets/anims/stage5/skipen.png'), data: require('../../assets/anims/stage5/skipen.json') },
            },
            sound: {

            }
        }

    }

}