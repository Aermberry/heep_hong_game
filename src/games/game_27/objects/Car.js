import Phaser from "phaser";
export default class Car extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, item,colllideObject ) {
        let itemImg;
        if (item.length < 5) {
            let max = 6;
            itemImg = scene.add.sprite(0, 0, `4w_car${Math.floor(Math.random() * (max - 1 + 1) + 1)}`);
        } else if (item.length < 7) {
            let max = 3;
            itemImg = scene.add.sprite(0, 0, `6w_car${Math.floor(Math.random() * (max - 1 + 1) + 1)}`);
        } else {
            let max = 2;
            itemImg = scene.add.sprite(0, 0, `13w_car${Math.floor(Math.random() * (max - 1 + 1) + 1)}`);
        }

        let text = scene.add.text(-110, 140, item, {
            fontSize: '55px', //30px
            color: '#000000',
            fontWeight: 'bold',
            fontFamily: "system-ui"
        });
        text.x = text.width / 2 - text.width
        let container = scene.add.container(x, y, [itemImg, text]);
        super(scene, x, y, container);
        console.log(scene)
        if (colllideObject) {
            console.log('加入')
            scene.physics.add.collider(colllideObject, this, this.collisionHandler);
        }
        return this;
    }
    collisionHandler(lastObj, obj) {
        obj.container.x + 100;
    }
}