import Phaser from "phaser";
export default class DragText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, type, depth, name) {
        super(scene, x, y, text, style)
        this.setOrigin(0);
        this.name = name;
        this.depth = depth;
        this.type = type;
        scene.add.existing(this);
        this.setInteractive({
            useHandCursor: true
        })
        scene.input.setDraggable(this);
        let self = this;
        self.on('drag', (pointer, dragX, dragY) => {
            let dragText = scene.input.displayList.list.filter((item) => item instanceof DragText && item.name == self.name)
            let x = dragX - self.x;
            let y = dragY - self.y;
            dragText.forEach(item => {
                item.x += x;
                item.y += y;
            });
            this.x = dragX;
            this.y = dragY;
        });
    }
}