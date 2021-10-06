import BasicFg from "./BasicFg"

export default class ShipFg extends BasicFg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this.setDepth(2)

        this._init()

    }

    _init() {
        this.scene.anims.create({
            key: 'water',
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('water', { prefix: 'scene2_water', start: 0, end: 59, zeroPad: 4 }),
        });


        let water = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(8.2), 'water')

        water.play('water')

        this.add([water])
    }
    
    static getAssetArray() {

        return {
            img: {

            },
            atlas: {
                'water': { img: require('../../assets/anims/stage2/water.png'), data: require('../../assets/anims/stage2/water.json')},
            },
            sound: {
                
            }
        }

    }
    

}