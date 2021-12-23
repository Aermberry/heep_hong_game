import Phaser from 'phaser'
// import constStore from '../store'

export default class ItemPic extends Phaser.GameObjects.Container {

    constructor(scene, x, y, item, width, height) {

        super(scene, x, y)

        this.setAlpha(0)

        this.whiteBroad = scene.add.rectangle(0, 0, width, height, 0xffffff)
        // this.hLine = scene.add.line(0, 0, this.whiteBroad.width * 0, 0, this.whiteBroad.width * 0.8, 0, constStore.hexColors.lightGray )
        // this.vLine = scene.add.line(0, 0, 0, this.whiteBroad.height * 0, 0, this.whiteBroad.height * 0.8, constStore.hexColors.lightGray)

        this.line = scene.add.image(0, 0, 'bamLine').setScale(1.2)

        this.fxHover = scene.add.image(0, 0, 'fx_hover')
        this.fxHover.setScale(1.4)
        this.fxHover.setAlpha(0)

        this.add([
            this.whiteBroad,
            this.line,
            // this.hLine,
            // this.vLine,
            this.fxHover
        ])

        setTimeout(()=> {


            let textPadding = this.whiteBroad.width * 0.05;

            this.textBlock = scene.add.text(
                0, textPadding * -1, item.value,
                {
                    fontSize: (this.whiteBroad.width) + 'px',
                    color: '#000000',
                    fontFamily: "Custom-STKaitiTC"
                }
            )
    
            this.textBlock.setOrigin(0.5)
            this.textBlock.setPadding(textPadding, textPadding, textPadding, textPadding)
    

            this.add([
                this.textBlock
            ])

            this.scene.tweens.add({
                targets: this,
                alpha: 1,
                delay:800,
                duration: 400,
                ease: 'Power2'
            });

        },
        100
        )

    }

    onHover() {

        if(typeof this.onLeaveTween != 'undefined' && typeof this.onLeaveTween.stop == 'function') this.onLeaveTween.stop();

        this.onHoverTween = this.scene.tweens.add({
            targets: this.fxHover,
            alpha: .5,
            duration: 200,
            ease: 'Power2'
        }).on('complete', ()=> {

            this.fxHover.setAlpha(.5)

        })

    }

    onLeave() {

        if(typeof this.onHoverTween != 'undefined' && typeof this.onHoverTween.stop == 'function') this.onHoverTween.stop();

        this.onLeaveTween = this.scene.tweens.add({
            targets: this.fxHover,
            alpha: 0,
            duration: 200,
            ease: 'Power2'
        }).on('complete', ()=> {

            this.fxHover.setAlpha(0)

        })

    }

}