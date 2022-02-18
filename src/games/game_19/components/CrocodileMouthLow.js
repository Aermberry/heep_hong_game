import Phaser from "phaser"

export default class CrocodileMouthLow extends Phaser.GameObjects.Container {

    constructor(scene, x, y) {

        super(scene, x, y)

        this.crocoElmArr = [
            'croco_low_1',
            'croco_low_2',
            'croco_low_3',
            'croco_low_4'
        ]
        
        this.initRender();

        this.scene.add.existing(this);
    }

    initRender() {


        let offset = 0;

        const bed = this.scene.add.image(0, 0, 'crocoBed')
        bed.setScale(0.6)
        bed.setPosition(this.scene.getColWidth(2.5), this.scene.getRowHeight(4.8))
        this.add(bed)
        const bed2 = this.scene.add.image(0, 0, 'crocoBed')
        bed2.setScale(0.6)
        bed2.setPosition(this.scene.getColWidth(2) + bed.displayWidth, this.scene.getRowHeight(4.8))
        this.add(bed2)



        this.crocoElmArr.forEach((itemName)=> {
            const curImage = this.scene.add.image(offset, 0, itemName)
            curImage.setScale(0.4)
            this.add(curImage)
            offset += curImage.displayWidth - 2
        })


    }
    
}