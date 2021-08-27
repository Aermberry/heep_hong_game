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
            frames: scene.anims.generateFrameNames('cat_win', { prefix: 'cat_win', start: 0, end: 0, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_win', 
            frames: scene.anims.generateFrameNames('cat_win', { prefix: 'cat_win', start: 1, end: 30, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_win_continue', 
            repeat: -1,
            frames: scene.anims.generateFrameNames('cat_win', { prefix: 'cat_win', start: 31, end: 31, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_lose',
            frames: scene.anims.generateFrameNames('cat_sad', { prefix: 'cat_sad_clean', start: 1, end: 30, zeroPad: 4 }),
        });
        scene.anims.create({
            key: 'cat_lose_continue',
            frames: scene.anims.generateFrameNames('cat_sad', { prefix: 'cat_sad_clean', start: 50, end: 50, zeroPad: 4 })
        });
        scene.anims.create({
            key: 'red_band',
            repeat: -1,
            frames: scene.anims.generateFrameNames('headband', { prefix: 'headband', start: 0, end: 19, zeroPad: 4})
        });

        this.cat = scene.add.sprite(0, 0, 'cat_win')

        this.headBand = scene.add.sprite(-this.cat.width * 0.35, -this.cat.height * 0.15, 'headband')

        this.headBand.setScale(0.65)

        this.cat.play('cat_freeze')

        this.headBand.play('red_band')

        this.add([ this.headBand, this.cat,  ]);

    }

    gameWin() {

        this.headBand.setAlpha(0)

        this.cat.play('cat_win').on('animationcomplete', ()=> {
            this.headBand.setPosition(this.headBand.x + 10, this.headBand.y)
            this.headBand.setAlpha(1)
            this.cat.play('cat_win_continue')
            
        })

    }

    gameFail() {

        // this.headBand.setAlpha(0)

        this.cat.play('cat_lose').on('animationcomplete', ()=> {
            this.headBand.setPosition(this.headBand.x - 1, this.headBand.y + 0.5)
            this.cat.play('cat_lose_continue')
        
        })

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