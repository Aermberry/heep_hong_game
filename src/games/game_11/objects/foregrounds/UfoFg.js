import BasicFg from './BasicFg'

export default class UfoFg extends BasicFg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this.setDepth(2)

        this._init()

    }

    _init() {

        this.scene.anims.create({
            key: 'mudroad',
            repeat: -1,
            duration: 3000,
            frames: this.scene.anims.generateFrameNames('mudroad', { prefix: 'mudroad', start: 0, end: 23, zeroPad: 4 }),
        });


        let mudroad = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(8.2), 'mudroad')

        mudroad.play('mudroad')

        this.add([mudroad])

    }
    
    static getAssetArray() {

        return {
            img: {

            },
            atlas: {
                'mudroad': { img: require('../../assets/anims/stage3/mudroad.png'), data: require('../../assets/anims/stage3/mudroad.json')},
            },
            sound: {
                
            }
        }

    }

}