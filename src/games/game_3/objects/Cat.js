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
            frames: scene.anims.generateFrameNames('cat', { prefix: 'cat', start: 1, end: 9, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_win_continue', 
            repeat: -1,
            frames: scene.anims.generateFrameNames('cat', { prefix: 'cat', start: 10, end: 50, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_lose',
            frames: scene.anims.generateFrameNames('cat', { prefix: 'cat', start: 51, end: 60, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_lose_continue',
            repeat: -1,
            frames: scene.anims.generateFrameNames('cat', { prefix: 'cat', start: 61, end: 81, zeroPad: 4 })
        })

        this.cat = scene.add.sprite(0, 0, 'cat')

        this.cat.play('cat_freeze')

        this.add([this.cat]);

    }

    gameWin() {

        this.cat.play('cat_win').on('animationcomplete', ()=> this.cat.play('cat_win_continue'))

    }

    gameFail() {

        this.cat.play('cat_lose').on('animationcomplete', ()=> this.cat.play('cat_lose_continue'))

    }

    moveTo(x, y, time) {

        return new Promise((resolve)=> {

            this.scene.tweens.add({
                targets: this,
                x: x,
                y: y,
                duration: time,
                ease: 'Circular'
            }).on('complete', ()=> {
                resolve(this);
            })
        
        })

    }

    moveIn() {

        return this.moveTo(this.inPosition.x, this.inPosition.y, 800)

    }

}