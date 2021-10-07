import BasicBg from "./BasicBg"

export default class BalloonBg extends BasicBg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this._init()
        
    }

    static getAssetArray() {

        return {
            img: {
                'scene4_1': require('../../assets/images/stage4/scene4_1.png'),
            },
            atlas: {
                'birds': { img: require('../../assets/anims/stage4/birds.png'), data: require('../../assets/anims/stage4/birds.json')},
                'sail': { img: require('../../assets/anims/stage4/sail.png'), data: require('../../assets/anims/stage4/sail.json')},
            },
            sound: {
                
            }
        }

    }

    _init() {
        
        this.scene.anims.create({
            key: 'birds',
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('birds', { prefix: 'birds', start: 0, end: 59, zeroPad: 4 }),
        })
                
        this.scene.anims.create({
            key: 'sail',
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('sail', { prefix: 'sail', start: 0, end: 29, zeroPad: 4 }),
        })


        let background = this.scene.add.image(this.scene.getColWidth(6), this.scene.getRowHeight(6), 'scene4_1')
        let boats = this.scene.add.sprite(this.scene.getColWidth(11), this.scene.getRowHeight(4.5),'boats')
        let birds = this.scene.add.sprite(this.scene.getColWidth(2), this.scene.getRowHeight(3),'birds')
        let birds2 = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(1),'birds')
        let birds3 = this.scene.add.sprite(this.scene.getColWidth(9), this.scene.getRowHeight(1.5),'birds')

        boats.play('sail')
        birds.play('birds')
        setTimeout(()=> birds2.play('birds'), 705)
        setTimeout(()=> birds3.play('birds'), 440)

        this.add([background, boats, birds, birds2, birds3])
    }

}