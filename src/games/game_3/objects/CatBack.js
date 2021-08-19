import Phaser from 'phaser'

export default class CatBack extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {

        super(scene, scene.getColWidth(12), scene.getRowHeight(12), children)

        this.inPosition = {
            x,
            y
        }

        scene.anims.create({
            key: 'headband',
            repeat: -1,
            frames: scene.anims.generateFrameNames('headband', { prefix: 'headband', start: 0, end: 18, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_shave',
            frames: scene.anims.generateFrameNames('cat_back', { prefix: 'cat_back', start: 0, end: 38, zeroPad: 4 }),
        });

        this.catBack = scene.add.sprite(0, 0, 'cat_back')
        let headBand = scene.add.sprite(0, -165, 'headband')

        headBand.setTintFill()
        headBand.tint = 0xcc0000;

        this.add([this.catBack, headBand]);

        // catBack.play('cat_back')
        headBand.play('headband')
        
    }


    moveIn() {

        this.scene.tweens.add({
            targets: this,
            x: this.inPosition.x,
            y: this.inPosition.y,
            duration: 400,
            ease: 'Power2'
        })

    }

    moveOut() {

    }


}