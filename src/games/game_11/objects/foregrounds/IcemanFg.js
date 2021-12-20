import BasicFg from './BasicFg'

export default class IcemanFg extends BasicFg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this.setDepth(2)

        this._init()

    }

    _init() {

        this.scene.anims.create({
            key: 'road',
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('road', { prefix: 'snowroad', start: 0, end: 35, zeroPad: 4 }),
        })

        let road = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(8.2), 'road')

        road.play('road')

        // this.add([snow, snow2, snow3, road])
        this.add([road])

    }
    
    static getAssetArray() {

        return {
            img: {

            },
            atlas: {
                'road': { img: require('../../assets/anims/stage5/scene5_road.png'), data: require('../../assets/anims/stage5/scene5_road.json')},
            },
            sound: {
                
            }
        }

    }

}