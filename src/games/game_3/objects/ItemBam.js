import Phaser from 'phaser'

export default class ItemBam extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {

        super(scene, x, scene.getRowHeight(12), children)

        this.inPosition = {
            x,
            y
        }

        this.bamImg = scene.add.image(0, 0, 'itemBam')
        this.whiteBroad = scene.add.rectangle(0, 0, 650, 650, 0xffffff)

        this.whiteBroad.setAlpha(0);

        // this.whiteBroad = new Rectangle(0, 0, scene.getRowHeight(9), 10);

        // this.whiteBroad = new Rectangle(0, 0, scene.getRowHeight(9), 10);
        // Rectangle.CenterOn(this.bamImg, 0, 0);

        this.add([
            this.bamImg, 
            this.whiteBroad
            // this.whiteBroad
        ]);

    }

    moveIn() {

        this.scene.tweens.add({
            targets: this,
            x: this.inPosition.x,
            y: this.inPosition.y,
            duration: 400,
            ease: 'Power2'

        })

        this.scene.tweens.add({
            targets: this.whiteBroad,
            alpha: 1,
            delay:800,
            duration: 400,
            ease: 'Power2'
        });

    }

    moveOut() {
        
    }

}