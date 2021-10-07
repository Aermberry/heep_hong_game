import BasicBg from "./BasicBg"

export default class IcemanBg extends BasicBg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this._init()
        
    }

    static getAssetArray() {

        return {
            img: {
                'scene5_1': require('../../assets/images/stage5/scene5_1.png'),
                'scene5_2': require('../../assets/images/stage5/scene5_2.png'),
            },
            atlas: {
                // 'road': { img: require('../../assets/anims/stage1/road.png'), data: require('../../assets/anims/stage1/road.json')},
            },
            sound: {
                
            }
        }

    }

    _init() {
        
        let background = this.scene.add.image(this.scene.getColWidth(0), this.scene.getRowHeight(0), 'scene5_1')
        let foreground = this.scene.add.image(this.scene.getColWidth(0), this.scene.getRowHeight(4), 'scene5_2')

        background.setScale(1.1)

        foreground.setOrigin(0)
        background.setOrigin(0)

        this.add([background, foreground])

        this.scene.tweens.add({
            targets: background,
            x: - background.width * 0.1,
            duration: 80000,
            yoyo: 1
        })
    }

}