import BasicFg from './BasicFg'

export default class IcemanFg extends BasicFg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this.setDepth(2)

        this._init()

    }

    _init() {

        this.scene.anims.create({
            key: 'snow',
            repeat: -1,
            duration: 12000,
            frames: this.scene.anims.generateFrameNames('snow', { prefix: 'snow', start: 0, end: 59, zeroPad: 4 }),
        });

        this.scene.anims.create({
            key: 'road',
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('road', { prefix: 'snowroad', start: 0, end: 59, zeroPad: 4 }),
        })

        let snow = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(0), 'snow')

        snow.setOrigin(0.5,0)

        // snow.setScale(1.3)

        snow.play('snow')

        let road = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(8.2), 'road')

        road.play('road')

        this.add([snow, road])

    }
    
    static getAssetArray() {

        return {
            img: {

            },
            atlas: {
                'snow': { img: require('../../assets/anims/stage5/snow.png'), data: require('../../assets/anims/stage5/snow.json')},
                'road': { img: require('../../assets/anims/stage5/scene5_road.png'), data: require('../../assets/anims/stage5/scene5_road.json')},
            },
            sound: {
                
            }
        }

    }

}