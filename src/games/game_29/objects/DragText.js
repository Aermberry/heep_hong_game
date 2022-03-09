import Phaser from "phaser";
export default class DragText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, type, depth, name, isHard) {
        super(scene, x, y, text, style)
        this.setOrigin(0);
        this.name = name;
        this.isHard = isHard
        this.origin = {
            x: x,
            y: y
        }
        this.depth = depth;
        this.type = type;

        this.setInteractive({
            useHandCursor: true
        })
        scene.add.existing(this);

        if (!isHard) {
            scene.input.setDraggable(this);
        } else {
            this.setStyle({
                fontSize: '55px',
                color: "#000000",
                backgroundColor: '',
                padding: {
                    x: 5, y: 5
                },
                fontWeight: 'bold',
                fontFamily: "system-ui"
            });
            this.updateText();
            this.on('pointerdown', function () {
                this.onDragTextClick()
            })
        }

        let self = this;

        // self.on('dragstart', function () {
        //     this.scene.children.bringToTop(self); 拖拽开始事件，将gameobject置顶
        // });

        self.on('drag', (pointer, dragX, dragY) => {
            if(self.name.length > 15) {
                let dragText = scene.input.displayList.list.filter((item) => item instanceof DragText && item.name == self.name)
                let x = dragX - self.x;
                let y = dragY - self.y;
                dragText.forEach(item => {
                    item.x += x;
                    item.y += y;
                });
                this.x = dragX;
                this.y = dragY;
            } else {

                let dragText = scene.input.displayList.list.filter((item) => item instanceof DragText && item.name == self.name)
                console.log(dragText)
                dragText.forEach((item, i) => {
                    item.x =  i == 0 ? dragX  : dragText[i-1].x +dragText[i-1].width
                    item.y = dragY;
                });
            }

        });

        self.on('dragend', () => {
            let dragText = scene.input.displayList.list.filter((item) => item instanceof DragText && item.name == self.name)
            dragText.forEach(item => {
                item.x = this.isHard ? item.origin.x - 5 : item.origin.x;
                item.y = this.isHard ? item.origin.y - 5 : item.origin.y;
            });
            self.x = this.isHard ? self.origin.x - 5 : self.origin.x
            self.y = this.isHard ? self.origin.y - 5 : self.origin.y
        })
    }

    setDraggableAndHighlight(flag = true) {
        if (flag) {
            this.setStyle({
                fontSize: '55px',
                color: "#000000",
                stroke: '#E882A4',
                strokeThickness: 10,
                padding: {
                    x: 5, y: 5
                },
                fontWeight: 'bold',
                fontFamily: "system-ui"
            });
            this.x -= 5;
            this.y -= 5;
            // this.scene.children.bringToTop(this);
        } else {
            this.setStyle({
                fontSize: '55px',
                color: "#000000",
                backgroundColor: '',
                strokeThickness: 0,
                padding: {
                    x: 5, y: 5
                },
                fontWeight: 'bold',
                fontFamily: "system-ui"
            });
            this.x = this.origin.x;
            this.y = this.origin.y;
        }
        this.updateText();
        this.scene.input.setDraggable(this, flag);
    }

    onDragTextClick() {
        let self = this;
        self.scene.input.displayList.list.filter((item) => item instanceof DragText).forEach((item) => {
            item.setDraggableAndHighlight(item.name == self.name)
        });
    }



}