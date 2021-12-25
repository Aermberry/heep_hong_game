import Phaser from "phaser";
export default class Car extends Phaser.GameObjects.Container {
    constructor(scene, x, y, item) {
        super(scene, x, y);
        let itemImg;
        if (item.length < 5) {
            let max = 6;
            itemImg = scene.add.sprite(0, 0, `4w_car${Math.floor(Math.random() * (max - 1 + 1) + 1)}`).setOrigin(0, 0);
        } else if (item.length < 7) {
            let max = 3;
            itemImg = scene.add.sprite(0, 0, `6w_car${Math.floor(Math.random() * (max - 1 + 1) + 1)}`).setOrigin(0, 0);
        } else {
            let max = 2;
            itemImg = scene.add.sprite(0, 0, `13w_car${Math.floor(Math.random() * (max - 1 + 1) + 1)}`).setOrigin(0, 0);
        }

        let text = scene.add.text(0, 370, item, {
            fontSize: '45px', //30px
            color: '#000000',
            fontWeight: 'bold',
            fontFamily: "system-ui"
        });
        text.x = (itemImg.width - text.width) / 2
        this.add([itemImg, text]);
        this.setSize(itemImg.width, itemImg.height);
        scene.add.existing(this);
    }
}

