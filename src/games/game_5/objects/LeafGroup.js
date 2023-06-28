import Phaser from 'phaser'
import Leaf from './Leaf'

export default class LeafGroup extends Phaser.GameObjects.Group {

    constructor(scene, leafNumber, withAnimate = false, fallSpeed = 3) {
        super(scene, [])
    
        // let leafs = []

        let factorX = scene.getColWidth(12 / leafNumber)
        let factorY = scene.getRowHeight(12 / leafNumber)

        for(let i = 0; i < leafNumber; i++) {

            let posX = (factorX * i) + (factorX * Math.random())
            let posY = (factorY * Math.random())

            let curLeaf = new Leaf(scene, posX, posY, fallSpeed)
            scene.add.existing(curLeaf)
            // leafs.push(curLeaf)
            this.add(curLeaf)

            if(withAnimate) curLeaf.initAnimate()

        }

        this.runChildUpdate = true;

    }

}