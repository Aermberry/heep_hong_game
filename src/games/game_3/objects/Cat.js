import Phaser from 'phaser'

export default class Cat extends Phaser.GameObjects.Container {

    constructor(scene, x, y, children) {

        super(scene, scene.getColWidth(-6), y, children)

        this.inPosition = {
            x,
            y
        }

        scene.anims.create({
            key: 'cat_freeze', 
            frames: scene.anims.generateFrameNames('cat', { prefix: 'cat', start: 0, end: 1, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_win', 
            frames: scene.anims.generateFrameNames('cat', { prefix: 'cat', start: 1, end: 50, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_lose',
            frames: scene.anims.generateFrameNames('cat', { prefix: 'cat', start: 54, end: 84, zeroPad: 4 }),
        });

        this.cat = scene.add.sprite(0, 0, 'cat')

        this.cat.play('cat_freeze')

        this.add([this.cat]);

    }

    gameWin() {

        this.cat.play('cat_win')

    }

    gameFail() {

        this.cat.play('cat_lose')

    }

    moveTo(x, y, time) {

        return new Promise((resolve)=> {

            this.scene.tweens.add({
                targets: this,
                x: x,
                y: y,
                duration: time,
                ease: 'Power2'
            }).on('complete', ()=> {
                resolve(this);
            })
        
        })

    }

    moveIn() {

        return this.moveTo(this.inPosition.x, this.inPosition.y, 800)

    }

}