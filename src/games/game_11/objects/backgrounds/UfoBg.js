import BasicBg from "./BasicBg"

export default class UfoBg extends BasicBg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this._init()
        
    }

    static getAssetArray() {

        return {
            img: {
                'scene3_1': require('../../assets/images/stage3/scene3_1.png'),
                'scene3_2': require('../../assets/images/stage3/scene3_2.png'),
            },
            atlas: {
                'farm_cloud': { img: require('../../assets/anims/stage3/farm_cloud.png'), data: require('../../assets/anims/stage3/farm_cloud.json')},
            },
            sound: {
                
            }
        }

    }

    _init() {

        
        this.scene.anims.create({
            key: 'farm_cloud',
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('farm_cloud', { prefix: 'farm_cloud', start: 0, end: 29, zeroPad: 4 }),
        });
        
        
        let background = this.scene.add.image(this.scene.getColWidth(0), this.scene.getRowHeight(0), 'scene3_1')
        let foreground = this.scene.add.image(this.scene.getColWidth(0), this.scene.getRowHeight(4), 'scene3_2')

        let cloud = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(1),'farm_cloud')

        background.setScale(1.3)

        foreground.setOrigin(0)
        background.setOrigin(0)

        this.add([background, foreground, cloud])

        cloud.play('farm_cloud')

        this.scene.tweens.add({
            targets: background,
            x: - background.width + this.scene.getColWidth(9),
            duration: 240000
        })
    }

}