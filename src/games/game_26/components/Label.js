import Phaser from 'phaser'
// import CursorHand from '../assets/images/cursor_hand.png'

export default class Label extends Phaser.GameObjects.Container {

    #toothTexture
    constructor(scene, x, y, label, image, style) {

        super(scene, x, y);

        this.scene = scene;
        this.labelText = label;
        this.style = style;
        this.image = image;
        this.originPoint = { originPointX: x, originPointY: y }
        scene.add.existing(this);
    }

    create() {
        this.texture = this.scene.add.image(0, 0, this.image).setScale(0.5);
        this.labelText = this.scene.make.text({
            x: -5,
            y: -10,
            text: this.labelText,
            style: this.style
        }).setOrigin(0.5);

        // Phaser.Display.Align.In.Center(this.labelText, this.texture);

        this.add(
            [this.texture, this.labelText]
        )

        this.setSize(this.texture.displayWidth, this.texture.displayHeight);

        this.setInteractive({ useHandCursor: true }).on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
                console.log("down")
                this.texture.setFrame(0);
                this.onDownClicked();
            }
        )
            .on(
                Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                    console.log("up")
                    this.texture.setFrame(0);
                    this.onUpClicked();
                }
            )
    }

   
}