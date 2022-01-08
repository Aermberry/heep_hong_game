import Phaser from "phaser";
export default class DragText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, type, depth, name) {
        super(scene, x, y, text, style)
        this.setOrigin(0);
        this.name = name;
        this.origin = {
            x: x,
            y: y
        }
        this.depth = depth;
        this.type = type;
        this.setInteractive({
            useHandCursor: true
        })
        scene.input.setDraggable(this);
        scene.add.existing(this);

        let self = this;

        // self.on('dragstart', function () {
        //     this.scene.children.bringToTop(self); 拖拽开始事件，将gameobject置顶
        // });

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

        self.on('dragend', () => {
            let dragText = scene.input.displayList.list.filter((item) => item instanceof DragText && item.name == self.name)
            dragText.forEach(item => {
                item.x = item.origin.x;
                item.y = item.origin.y;
            });
            self.x = self.origin.x
            self.y = self.origin.y
        })


    }



}