import BasicBtn from './BasicBtn'

export default class RtBtn extends BasicBtn {

    constructor(scene, x, y) {
        super(scene, x, y)
        this.sprite = scene.add.sprite(0, 0, 'rtBtn').setScale(0.8)
        this.create(this.sprite, this.onClick(this))

    }

    onClick() {

    }
}