import Phaser from 'phaser'


export default class ContainerBox extends Phaser.GameObjects.Container {
    constructor(confirm) {

        super(confirm.scene, confirm.x, confirm.y);

        confirm.scene.add.existing(this);
        this.setSize(confirm.width, confirm.height);

        if (confirm.backgroundColor != null) {
            this.add(confirm.scene.add.graphics()
                .fillStyle(confirm.backgroundColor)
                .fillRect(0, 0, confirm.width, confirm.height));
        }
    }
}