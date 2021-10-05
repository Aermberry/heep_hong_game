import BasicPlayer from './BasicPlayer'

export default class Truck extends BasicPlayer {

    constructor(scene, x, y, title= 'title') {
        super(scene, x, y)


        scene.anims.create({
            key: 'truck_turn',
            duration: this.getMovementDuration() - 200,
            frames: scene.anims.generateFrameNames('truck', { prefix: 'truck', start: 0, end: 9, zeroPad: 4 }),
        })

        this.truck = scene.add.sprite(0, 0, 'truck')

        let textPadding = this.truck.width * 0.05;

        this.textBlock = scene.add.text(
            this.truck.width * -0.2, 
            this.truck.height * -0.26, 
            title,
            {
                fontSize: (this.truck.width * 0.18) + 'px',
                color: '#000000',
                // fontFamily: "Custom-Han-Serif"
            }
        )

        this.textBlock.setOrigin(0.5)
        this.textBlock.setPadding(textPadding, textPadding, textPadding, textPadding)

        this.add([this.truck, this.textBlock])

    }

    toLeftAnimate() {

        return new Promise((resolve)=> {
            this.scene.tweens.add({
                targets: this.textBlock,
                x: this.truck.width * -0.2,
                duration: this.getMovementDuration() -200
            })
            this.truck.playReverse('truck_turn').on('animationcomplete', ()=> {
                resolve()
            })
        })

    }

    toRightAnimate() {
        return new Promise((resolve)=> {
            this.scene.tweens.add({
                targets: this.textBlock,
                x: this.truck.width * 0.1,
                duration: this.getMovementDuration() -200
            })
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