import Phaser from 'phaser'

export default class DragBlock extends Phaser.GameObjects.Container {
    
    constructor(scene, x, y, dragEndCallback = null, onDragCallabck = null) {
        super(scene, x, y, []);

        this.dragEndCallback = dragEndCallback;

        this.onDragCallback = onDragCallabck;

    }

    create({draggableWidth, draggableHeight}) {

        this.setSize(draggableWidth, draggableHeight);

    }

    startDraggable() {

        this.setInteractive();
        this.scene.input.setDraggable(this)

        this.scene.input.on('drag', this.handleDrag.bind(this));
        this.scene.input.on('dragend', this.handleStopDrag.bind(this ));

    }

    stopDraggable() {

        this.disableInteractive();

    }


    handleDrag(pointer, gameObject, dragX, dragY) {
        
        //this.destroy fail to disable/remove the input on-drag listener, need to find a better way to implement this method
        if(typeof this.scene == 'undefined') return

        gameObject.x = dragX;
        gameObject.y = dragY;

        if(typeof this.onDragCallback == 'function') {
            this.onDragCallback(pointer, gameObject, dragX, dragY);
        }

    }

    handleStopDrag(pointer, gameObject) {

        //this.destroy fail to disable/remove the input on-drag listener, need to find a better way to implement this method
        if(typeof this.scene == 'undefined') return

        //Callback need to check if the gameObject is in the item block
        if(typeof this.dragEndCallback == 'function') {
            this.dragEndCallback(pointer, gameObject);
        }

    }

    setDragEndHandler(handler) {

        if(typeof this.scene != 'undefined' && typeof handler == 'function') {
            this.dragEndCallback = handler;
        }

    }

    setOnDragHandler(handler) {

        if(typeof handler == 'function') {
            this.onDragCallback = handler;
        }

    }

}