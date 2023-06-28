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
                'snow': { img: require('../../assets/anims/stage5/snow.png'), data: require('../../assets/anims/stage5/snow.json')},
            },
            sound: {
                
            }
        }

    }

    _init() {
        
        let background = this.scene.add.image(this.scene.getColWidth(0), this.scene.getRowHeight(0), 'scene5_1')
        let foreground = this.scene.add.image(this.scene.getColWidth(0), this.scene.getRowHeight(4), 'scene5_2')


        this.scene.anims.create({
            key: 'snow',
            repeat: -1,
            frameRate: 3,
            // duration: 18000,
            frames: this.scene.anims.generateFrameNames('snow', { prefix: 'snow', start: 0, end: 23, zeroPad: 4 }),
        });

        let snow = this.scene.add.sprite(this.scene.getColWidth(2), this.scene.getRowHeight(0), 'snow')
        let snow2 = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(-1), 'snow')
        let snow3 = this.scene.add.sprite(this.scene.getColWidth(10), this.scene.getRowHeight(0), 'snow')

        snow.setOrigin(0.5,0)
        snow.setScale(1.5)
        snow2.setOrigin(0.5,0)
        snow2.setScale(1.4)
        snow3.setOrigin(0.5,0)
        snow3.setScale(1.5)

        // snow.setScale(1.3)

        snow.play('snow')
        snow2.play('snow')
        snow3.play('snow')

        background.setScale(1.1)

        foreground.setOrigin(0)
        background.setOrigin(0)

        this.add([background, snow, snow2, snow3, foreground])

        this.scene.tweens.add({
            targets: background,
            x: - background.width * 0.1,
            duration: 80000,
            yoyo: 1
        })
    }

}