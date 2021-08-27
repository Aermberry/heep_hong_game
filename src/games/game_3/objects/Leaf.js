import Phaser from 'phaser'

// export default class Leaf extends Phaser.GameObjects.Sprite {

//     constructor(scene, x, y) {

//         super(scene, x, y, 'leaf')

//         scene.anims.create({
//             key: 'leaf_fall',
//             repeat: -1,
//             frames: scene.anims.generateFrameNames('leaf', { prefix: 'leaf_drop', start: 0, end: 58, zeroPad: 4 }),
//         });

//         this.play('leaf_fall');

        
//     }


// }


export default class Leaf extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, fallSpeed = 3) {
        super(scene, x, y, 'leaf')

        this.originPosition = {
            x,
            y
        }

        this.yMoveDuration = Math.ceil(Math.random() * fallSpeed)
        this.delay = Math.ceil(Math.random() * 3000)

    }

    swaping() {

        return new Promise((resolve)=> {

            this.scene.tweens.add({
                targets: this,
                yoyo: true,
                repeat: 2,
                angle: this.angle + 180,
                x: this.x -200,
                duration: 1500,
                ease: Phaser.Math.Easing.Expo.InOut
            }).on('complete', ()=> {
                this.scene.tweens.add({
                    targets: this,
                    angle: this.angle + 100,
                    x: this.x -150,
                    alpha: 0,
                    duration: 1500,
                    ease: Phaser.Math.Easing.Expo.InOut
                }).on('complete', ()=> {

                    resolve();
                    
                })
    
            })
    

        })

    }

    initAnimate() {

        setTimeout(()=> {
            this.setPosition(this.originPosition.x, this.originPosition.y)

            this.setAlpha(1)
    
            this.swaping().then(()=> {
                this.initAnimate()
            })
        }, this.delay)



    }

    update() {
        this.y = this.y + this.yMoveDuration
    }

}