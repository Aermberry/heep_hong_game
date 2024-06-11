import BasicFg from './BasicFg'

export default class TruckFg extends BasicFg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this.setDepth(2)

        this._init()

    }

    _init() {
        this.scene.anims.create({
            key: 'road',
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('road', { prefix: 'road_move', start: 0, end: 2, zeroPad: 4 }),
        });


        let road = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(8.4), 'road')

        road.play('road')

        let roadBg = this.scene.add.image(this.scene.getColWidth(6), this.scene.getRowHeight(8.4), 'road_bg')

        this.add([roadBg, road])
    }
    
    static getAssetArray() {

        return {
            img: {
                'road_bg': require('../../assets/images/stage1/road_mask.png')
            },
            atlas: {
                'road': { img: require('../../assets/anims/stage1/road.png'), data: require('../../assets/anims/stage1/road.json')},
            },
            sound: {
                
            }
        }

    }

}