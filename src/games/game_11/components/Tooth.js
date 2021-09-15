import Phaser from 'phaser'

export default class Tooth extends Phaser.GameObjects.Container {

    #toothTexture
    constructor(scene, x, y, label, image) {

        super(scene, x, y);

        this.scene = scene;
        this.labelText = label;
        this.image = image;
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
    }

    getImageWidth() {
        return this.toothTexture.displayWidth;
    }
}