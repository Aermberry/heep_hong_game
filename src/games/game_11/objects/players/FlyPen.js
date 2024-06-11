import BasicPlayer from './BasicPlayer'

export default class FlyPen extends BasicPlayer {

    constructor(scene, x, y) {
        super(scene, x, y)

        
        this.scene.anims.create({
            key: 'pen_fly',
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('pen', { prefix: 'pen_fly', start: 0, end: 5, zeroPad: 4 }),
        });

        this.scene.anims.create({
            key: 'pen_turn_left',
            duration: this.getMovementDuration(),
            frames: this.scene.anims.generateFrameNames('pen', { prefix: 'pen_fly', start: 6, end: 11, zeroPad: 4 }),
        })

        this.scene.anims.create({
            key: 'pen_turn_right',
            duration: this.getMovementDuration(),
            frames: this.scene.anims.generateFrameNames('pen', { prefix: 'pen_fly', start: 12, end: 19, zeroPad: 4 }),
        })

        // let pen = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(8.2), 'pen')
        this.pen = scene.add.sprite(0, -scene.getRowHeight(1), 'pen')

        this.pen.play('pen_fly')

        this.add([this.pen])

    }

    toLeftAnimate() {

        return new Promise((innerReslove)=> {
            new Promise((resolve)=> {
                this.pen.play('pen_turn_left').on('animationcomplete', ()=> {
                    resolve()
                })
            }).then(()=> {
                this.pen.play('pen_fly')
                innerReslove()
            })
        })
    }

    toRightAnimate() {
        return new Promise((innerReslove)=> {
            new Promise((resolve)=> {
                this.pen.play('pen_turn_right').on('animationcomplete', ()=> {
                    resolve()
                })
            }).then(()=> {
                this.pen.play('pen_fly')
                innerReslove()
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
                'pen': { img: require('../../assets/anims/stage4/pen_fly.png'), data: require('../../assets/anims/stage4/pen_fly.json')},
            },
            sound: {
                
            }
        }

    }



}