import BasicPlayer from "./BasicPlayer"

export default class Ship extends BasicPlayer {

    constructor(scene, x, y) {
        super(scene, x, y)


        scene.anims.create({
            key: 'boat_sail_left',
            duration: this.getMovementDuration(),
            repeat: -1,
            frames: scene.anims.generateFrameNames('boat', { prefix: 'boat', start: 0, end: 15, zeroPad: 4 }),
        })

        scene.anims.create({
            key: 'boat_sail_right',
            duration: this.getMovementDuration(),
            repeat: -1,
            frames: scene.anims.generateFrameNames('boat', { prefix: 'boat', start: 25, end: 38, zeroPad: 4 }),
        })

        scene.anims.create({
            key: 'boat_turn',
            duration: this.getMovementDuration(),
            frames: scene.anims.generateFrameNames('boat', { prefix: 'boat', start: 16, end: 24, zeroPad: 4 }),
        })

        this.boat = scene.add.sprite(0, 0, 'boat')

        this.add([this.boat])

        this.boat.play('boat_sail_left')

    }

    toLeftAnimate() {

        return new Promise((innerReslove)=> {
            new Promise((resolve)=> {
                this.scene.tweens.add({
                    targets: this.textBlock,
                    x: this.boat.width * -0.2,
                    duration: this.getMovementDuration()
                })
                this.boat.playReverse('boat_turn').on('animationcomplete', ()=> {
                    resolve()
                })
            }).then(()=> {
                this.boat.play('boat_sail_left')
                innerReslove()
            })
        })

    }

    toRightAnimate() {
        return new Promise((innerResolve)=> {

            new Promise((resolve)=> {
                this.boat.play('boat_turn').on('animationcomplete', ()=> {
                    resolve()
                })
            }).then(()=> {
                this.boat.play('boat_sail_right')
                innerResolve()
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
                'boat': { img: require('../../assets/anims/stage2/boat.png'), data: require('../../assets/anims/stage2/boat.json') },
            },
            sound: {
                
            }
        }

    }

}