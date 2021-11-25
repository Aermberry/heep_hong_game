import Phaser from 'phaser'
import CursorHand from '../assets/images/cursor_hand.png'

export default class Tooth extends Phaser.GameObjects.Container {

    constructor(scene, x, y, label, image) {

        super(scene, x, y);

        this.scene = scene;
        this.labelText = label;
        this.image = image;

        this.setName('tooth');
        this.originPoint = { originPointX: x, originPointY: y }
        scene.add.existing(this);
    }

    create() {
        this.toothTexture = this.scene.add.image(0, 0, this.image).setName('toothTexture').setScale(0.5);
        this.setSize(this.toothTexture.displayWidth, this.toothTexture.displayHeight);



        this.labelText = this.scene.make.text({
            x: 0,
            y: -20,
            text: this.labelText,
            style: {
                align: 'center',
                color: 'black',
                fontSize: '50px',
                padding: { x: 100, y: 100 }
            }
        }).setOrigin(0.5, 0.5);



        this.add(
            [this.toothTexture, this.labelText]
        )

        this.setSize(this.toothTexture.displayWidth, this.toothTexture.displayHeight);
        this.setInteractive(
            {
                cursor: `url(${CursorHand}), pointer`,
                // useHandCursor: true
            }
        )
        this.scene.input.setDraggable(this);

        this.on('pointerover', function () {

            this.toothTexture.setTint(0xa7a7a7);
            this.scene.sound.play('selectTeethEffectSound');

        });

        this.on('pointerout', function () {

            this.toothTexture.clearTint();
        });



        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });

        this.scene.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped) {
                gameObject.x = gameObject.originPoint.originPointX
                gameObject.y = gameObject.originPoint.originPointY
            }


        })
    }

    changeStyle(scale, fontSize) {
        this.toothTexture.setScale(scale);
        this.labelText.setFontSize(fontSize);
    }
}