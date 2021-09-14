
export default class Road {

    constructor(scene, x, y, item, onDragCallback, dragEndCallback) {
        let roadImg = scene.add.sprite(0, 0, 'road');
        let roadText = scene.add.text(-110, -20, item, {
            fontSize: '30px',
            color: '#ffffff',
            fontFamily: "Custom-Han-Serif"
        });
        var container = scene.add.container(x, y, [roadImg, roadText]);

        container.setSize(roadImg.width, roadImg.height);
        container.setInteractive({
            useHandCursor: true
        })

        scene.input.setDraggable(container);
        scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            if (typeof onDragCallback == 'function') {
                onDragCallback(pointer, gameObject, dragX, dragY);
            }
        });

        scene.input.on('dragend', function (pointer, gameObject) {
            //Check if the gameObject is in the item block
            if (typeof dragEndCallback == 'function') {
                dragEndCallback(pointer, gameObject);
            }
        });

    }


}