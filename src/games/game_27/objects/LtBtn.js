import BasicBtn from './BasicBtn'

export default class LtBtn extends BasicBtn {

    constructor(scene, x, y) {
        super(scene, x, y)
        this.scene = scene;
        this.sprite = scene.add.sprite(0, 0, 'ltBtn').setScale(0.8);
        this.create(this.sprite, this.onClick(this))
        this.scene.cameras.main.setBounds(0, 0, 1920, 1080);
        this.scene.cameras.main.setZoom(1);
    }

    onClick() {
        this.scene.cameras.main.pan(767, 1096, 2000, 'Power2');
    }
}