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


        let water = this.scene.add.sprite(this.scene.getColWidth(5.95), this.scene.getRowHeight(8.2), 'water')

        water.play('water')

        let foreground = this.scene.add.image(this.scene.getColWidth(0), this.scene.getRowHeight(1.5), 'scene2_2')

        
        foreground.setOrigin(0)
        
        water.setScale(1.05)

        this.add([water, foreground])
    }
    
    static getAssetArray() {

        return {
            img: {
                'scene2_2': require('../../assets/images/stage2/scene2_2.png'),
            },
            atlas: {
                'water': { img: require('../../assets/anims/stage2/water.png'), data: require('../../assets/anims/stage2/water.json')},
            },
            sound: {
                
            }
        }

    }
    

}