
export default class Choice {

    constructor(scene, x, y, item, onDragHandler, onEndDragHandler) {
        this.inPosition = {
            x,
            y
        }
        this.scene = scene;
        let self = this;
        this.onDragHandler = onDragHandler;
        this.onEndDragHandler = onEndDragHandler;
        this.answera = scene.add.sprite(x, y, item).setDepth(99);
        scene.add.sprite(x, y, `${item} shadow`).setDepth(3);
        this.answera.inPosition = this.inPosition;
        this.answera.name = item;
        this.answera.setInteractive({
            useHandCursor: true
        })

        scene.input.setDraggable(this.answera);

        this.answera.on('drag', function (gameObject, dragX, dragY) {
            self.answera.setDepth(100)
            self.answera.x = dragX;
            self.answera.y = dragY;
            // onDragHandler(dragX, dragY)
        });

        this.answera.on('dragend', function (pointer, dragX, dragY, dropped) {
            if(!dropped) {
                self.answera.x = self.answera.input.dragStartX;
                self.answera.y = self.answera.input.dragStartY;
            }
            self.answera.setDepth(4)
        });

    }





}