import BasicBtn from './BasicBtn'

export default class LtBtn extends BasicBtn {

    constructor(scene, x, y) {
        super(scene, x, y)
        this.scene = scene;
        this.sprite = scene.add.sprite(0, 0, 'ltBtn').setScale(0.8).setDepth(99);
        this.create(this.sprite, this.onClick.bind(this))

    }

    onClick() {
        let length = 0;
        this.scene.subjectItem.list.forEach(item => {
            length += item.width;
        });
        let audio = this.scene.sound.add('buttonOnClcik');
        audio.play();
        length = length / 2;
        if (this.scene.subjectItem.x + 100 <= length) {
            let self = this;
            self.scene.tweens.add({
                targets: self.scene.subjectItem,
                x: self.scene.subjectItem.x += 100,
                duration: 200,
                ease: 'Power2'
            })
        }
    }
}