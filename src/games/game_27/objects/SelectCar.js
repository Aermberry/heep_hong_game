import Phaser from "phaser";
export default class SelectCar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, item) {
        super(scene, x + 200, y +200);
        let itemImg;
        let max = 6;
        itemImg = scene.add.sprite(0, 0, `4w_car${Math.floor(Math.random() * (max - 1 + 1) + 1)}`);
        let text = scene.add.text(0, 150, item, {
            fontSize: '45px', //30px
            color: '#000000',
            fontWeight: 'bold',
            fontFamily: "system-ui"
        });
        text.x = text.width / 2 - text.width
        this.add([itemImg, text]);
        this.setSize(itemImg.width, itemImg.height);
        scene.add.existing(this);
        this.setInteractive({
            useHandCursor: true
        })
        scene.input.setDraggable(this);
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }
}

