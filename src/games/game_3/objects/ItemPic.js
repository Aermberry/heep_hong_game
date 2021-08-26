import Phaser from 'phaser'
import constStore from '../store'

export default class ItemPic extends Phaser.GameObjects.Container {

    constructor(scene, x, y, item, width, height) {

        super(scene, x, y)

        this.whiteBroad = scene.add.rectangle(0, 0, width, height, 0xffffff)
        this.hLine = scene.add.line(0, 0, this.whiteBroad.width * 0, 0, this.whiteBroad.width * 0.8, 0, constStore.hexColors.lightGray )
        this.vLine = scene.add.line(0, 0, 0, this.whiteBroad.height * 0, 0, this.whiteBroad.height * 0.8, constStore.hexColors.lightGray)

        let textPadding = this.whiteBroad.width * 0.05;

        this.textBlock = scene.add.text(
            0, textPadding * 1, item.value,
            {
                fontSize: (this.whiteBroad.width) + 'px',
                color: '#000000',
                fontFamily: "Custom-Han-Serif"
            }
        )

        this.textBlock.setOrigin(0.5)
        this.textBlock.setPadding(textPadding, textPadding, textPadding, textPadding)

        this.add([
            this.whiteBroad,
            this.hLine,
            this.vLine,
            this.textBlock
        ])

    }

}