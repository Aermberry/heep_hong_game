import Phaser from 'phaser'


export default class ItemBam extends Phaser.GameObjects.Container {

    constructor(scene, x, y, item, children) {

        super(scene, x, scene.getRowHeight(12), children)

        this.inPosition = {
            x,
            y
        }

        this.bamImg = scene.add.image(0, 0, 'itemBam')
        this.whiteBroad = scene.add.rectangle(0, 0, 650, 650, 0xffffff)

        let textPadding = this.whiteBroad.width * 0.05;

        this.textBlock = scene.add.text(
            0, textPadding * 2, item.value,
            {
                fontSize: (this.whiteBroad.width) + 'px',
                color: '#000000'
            }
        )

        this.textBlock.setOrigin(0.5)
        this.textBlock.setPadding(textPadding, textPadding, textPadding, textPadding)

        this.whiteBroad.setAlpha(0);
        this.textBlock.setAlpha(0);

        this.add([
            this.bamImg, 
            this.whiteBroad,
            this.textBlock
        ]);

        this.createCrop();

    }

    createCrop() {

        // //Cretae two crop to be use for breakUp animation
        this.topHalf = this.scene.add.image(0, 0, 'itemBam')
        this.bottomHalf = this.scene.add.image(0, 0, 'itemBam')

        let graphics = this.scene.add.graphics({x: (this.inPosition.x - this.bamImg.width*.65), y: (this.inPosition.y - this.bamImg.height*.65)})
        graphics.fillTriangle(0, 0, 
            this.bamImg.width *1.2, this.bamImg.height* 1.2, 
            0, this.bamImg.height*1.2,
        )
        graphics.setAlpha(0)

        let altGraphics = this.scene.add.graphics({x: (this.inPosition.x + this.bamImg.width*.65), y: (this.inPosition.y + this.bamImg.height*.65)})
        altGraphics.fillTriangle(0, 0,
            -this.bamImg.width *1.2, -this.bamImg.height*1.2, 
            0, -this.bamImg.height*1.2,
        )
        altGraphics.setAlpha(0)


        let topMask = graphics.createGeometryMask()
        // graphics.setRotation(1)
        let bottomMask = altGraphics.createGeometryMask()


        this.topHalf.setMask(topMask)
        this.bottomHalf.setMask(bottomMask)

        this.topHalf.setAlpha(0)
        this.bottomHalf.setAlpha(0)

        this.add([
            this.topHalf,
            this.bottomHalf
        ])

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
            targets: this.textBlock,
            alpha: 1,
            delay: 800,
            duration: 400,
            ease: 'Power2'
        });

        return this.scene.tweens.add({
            targets: this.whiteBroad,
            alpha: 1,
            delay:800,
            duration: 400,
            ease: 'Power2'
        });

    }

    moveOut() {

        this.scene.tweens.add({
            targets: this,
            x: this.scene.getColWidth(13),
            y: this.getRowHeight(13),
            duration: 400,
            ease: 'Power2'
        })
        
    }

    breakUp() {

        this.bamImg.setAlpha(0);
        this.whiteBroad.setAlpha(0);
        this.textBlock.setAlpha(0);

        this.topHalf.setAlpha(1)
        this.bottomHalf.setAlpha(1)

        this.scene.tweens.add({
            targets: this.topHalf,
            x: -50,
            y: -50,
            duration: 600,
            ease: 'Power2'
        })
        this.scene.tweens.add({
            targets: this.bottomHalf,
            x: 50,
            y:50,
            duration: 600,
            ease: 'Power2'
        })

    }

    getStrike() {

        return new Promise((resolve)=> {
            
            let slash = this.scene.add.image( -this.bamImg.width * 0.25, -this.bamImg.height * 0.25, 'slash')

            slash.setScale(0.5)
            slash.setAlpha(0)

            this.add(slash)

            this.scene.tweens.add({
                targets: slash,
                alpha: 1,
                scaleX: .8,
                scaleY: .8,
                duration: 50,
                x: 0,
                y: 0,
                ease: 'Linear'

            }).on('complete',()=> {

                this.scene.tweens.add({
                    targets: slash,
                    alpha: 0,
                    duration: 50,
                    ease: 'Linear'
                }).on('complete', ()=> {

                    this.scene.tweens.add({
                        targets: [this.whiteBroad, this.textBlock],
                        alpha: 0,
                        delay: 500,
                        duration: 400,
                        ease: 'Power2'
                    })

                    resolve();

                })

            })

        })

    }

    isInside({x, y}) {


        console.log(

            this.inPosition.x,

            this.inPosition.y,

            this.bamImg.getTopLeft()
,
            this.bamImg.getBottomRight()
    
        )

        let topLeft = this.bamImg.getTopLeft()

        let bottomRight = this.bamImg.getBottomRight()

        let worldBody = {
            "topLeft": {
                x: this.inPosition.x + topLeft.x,
                y: this.inPosition.y + topLeft.y
            },
            "bottomRight": {
                x: this.inPosition.x + bottomRight.x,
                y: this.inPosition.y + bottomRight.y
            }
                        
        }

        return x >= worldBody.topLeft.x && x <= worldBody.bottomRight.x && y >= worldBody.topLeft.y && y <= worldBody.bottomRight.y;


    }

}