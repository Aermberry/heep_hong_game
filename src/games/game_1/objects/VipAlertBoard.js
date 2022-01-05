import Phaser from "phaser"

export default class VipAlertBoard extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x, y)
        this.bgArr = []
        const bg1 = this.scene.add.image(0, 0, 'l2Tut0')
        const bg2 = this.scene.add.image(0, 0, 'l2Tut1')
        const bg3 = this.scene.add.image(0, 0, 'l2Tut2')
        const bg4 = this.scene.add.image(0, 0, 'l2Tut3')
        const bg5 = this.scene.add.image(0, 0, 'l2Tut4')

        this.finger = this.scene.add.image(0, 0, 'finger')

        this.bgArr = [bg1, bg2, bg3, bg4, bg5]
        this.fingerMovements = [
            {
                x: -140,
                y: -90
            },
            {
                x: -140,
                y: 90
            },
            {
                x: 0,
                y: 90
            },
            {
                x: 140,
                y: 270
            },
            {
                x: 70,
                y: 420
            }
        ]

        this.bugerBtn =  this.scene.add.sprite(0, 330, 'cfmBtn');
        this.bugerBtn.setFrame(0);
        this.bugerBtn.setScale(0.63)

        this.add(this.bugerBtn);
        this.add(this.bgArr)
        this.add(this.finger)

    }

    async playBroad() {

        this.moveTo(this.finger, 6)

        return await this.fingerMovements.reduce((lastPromise, movement, ind) => {

            return lastPromise.then(()=> {

                return new Promise((resolve)=> {

                    this.moveTo(this.bgArr[ind], 5)

                    this.scene.tweens.add({
                        targets: this.finger,
                        x: movement.x,
                        y: movement.y,
                        duration: 1000,
                        ease: 'Power1'
                    }).on('complete', ()=> {
                        resolve()
                    })

                })

            })

        }, Promise.resolve())
        .then(()=> this.bugerBtn.setFrame(1))

    }
    
}