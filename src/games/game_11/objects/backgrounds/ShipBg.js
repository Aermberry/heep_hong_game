import BasicBg from "./BasicBg"

export default class ShipBg extends BasicBg {

    constructor(scene, x, y) {
        super(scene, x, y)

        this._init()
        
    }

    static getAssetArray() {

        return {
            img: {
                'scene2_1': require('../../assets/images/stage2/scene2_1.png'),
                'scene2_2': require('../../assets/images/stage2/scene2_2.png'),
                
            },
            atlas: {
                "bird": { img: require('../../assets/anims/stage2/scene2_bird.png'), data: require('../../assets/anims/stage2/scene2_bird.json') }
            },
            sound: {
                
            }
        }

    }

    _init() {

        this.scene.anims.create({
            key: 'bird_fly',
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('bird', { prefix: 'birds', start: 0, end: 58, zeroPad: 4 }),
        });
        
        let background = this.scene.add.image(this.scene.getColWidth(6), this.scene.getRowHeight(6), 'scene2_1')
        let foreground = this.scene.add.image(this.scene.getColWidth(0), this.scene.getRowHeight(1.5), 'scene2_2')

        
        foreground.setOrigin(0)
        background.setOrigin(0.5)

        let bird = this.scene.add.sprite(this.scene.getColWidth(6), this.scene.getRowHeight(1),'bird')

        bird.play('bird_fly')


        this.add([
            background, 
            foreground, 
            bird
        ])
    }
    

}