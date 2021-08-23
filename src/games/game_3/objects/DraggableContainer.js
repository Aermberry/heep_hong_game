import Phaser from 'phaser'

export default class DragBlock extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y, dragEndCallback, children) {
        super(scene, x, y, children);

        this.dragEndCallback = dragEndCallback;

    }

    create({draggableWidth, draggableHeight}) {

        this.setSize(draggableWidth, draggableHeight);

    }

    startDraggable() {

        this.setInteractive();
        this.scene.input.setDraggable(this)

        this.scene.input.on('drag', this.handleDrag.bind(this));
        this.scene.input.on('dragend', this.handleStopDrag.bind(this, this));

    }

    stopDraggable() {

        this.disableInteractive();

    }

    handleDrag(pointer, gameObject, dragX, dragY) {

        gameObject.x = dragX;
        gameObject.y = dragY;

    }

    handleStopDrag(self) {

        if(typeof this.dragEndCallback == 'function') {
            this.dragEndCallback(self);
        }

    }

    setDraggableHandler(handler) {

        if(typeof handler == 'function') {
            this.dragEndCallback = handler;
        }

    }

}