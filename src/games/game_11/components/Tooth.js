import Phaser from 'phaser'

export default class Tooth extends Phaser.GameObjects.Container {

    #toothTexture
    constructor(scene, x, y, label, image) {

        super(scene, x, y);

        this.scene = scene;
        this.labelText = label;
        this.image = image;
        this.originPoint = { originPointX: x, originPointY: y }
        scene.add.existing(this);
    }

    create() {
        this.toothTexture = this.scene.add.image(0, 0, this.image).setName('toothTexture').setScale(0.5);
        this.labelText = this.scene.make.text({
            x: 0,
            y: -15,
            text: this.labelText,
            style: {
                color: 'black',
                fontSize: '50px'
            }
        }).setOrigin(0.5);



        this.add(
            [this.toothTexture, this.labelText]
        )

        this.setSize(this.toothTexture.displayWidth, this.toothTexture.displayHeight);
        this.setInteractive()
        this.scene.input.setDraggable(this);

        this.on('pointerover', function () {

            this.toothTexture.setTint(0x44ff44);

        });

        this.on('pointerout', function () {

            this.toothTexture.clearTint();

        });



        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {

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

    changeStyle(scale,fontSize){
        this.toothTexture.setScale(scale);
        this.labelText.setFontSize(fontSize);
    }
}