import BasicBg from './BasicBg'

export default class TruckBg extends BasicBg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this._init()
        
    }

    static getAssetArray() {

        return {
            img: {
                'scene1_1': require('../../assets/images/stage1/scene1_1.png'),
                'scene1_2': require('../../assets/images/stage1/scene1_2.png'),
            },
            atlas: {
                // 'road': { img: require('../../assets/anims/stage1/road.png'), data: require('../../assets/anims/stage1/road.json')},
            },
            sound: {
                
            }
        }

    }

    _init() {
        
        let background = this.scene.add.image(this.scene.getColWidth(6), this.scene.getRowHeight(3), 'scene1_1')
        let foreground = this.scene.add.image(this.scene.getColWidth(0), this.scene.getRowHeight(4), 'scene1_2')

        foreground.setOrigin(0)
        background.setOrigin(0.5)

        this.add([background, foreground])
    }

}