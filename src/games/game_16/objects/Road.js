
export default class Road {

    constructor(scene, x, y, item,) {
        this.inPosition = {
            x,
            y
        }

        let roadImg = scene.add.sprite(0, 0, 'road');
        let roadText = scene.add.text(-110, -20, item, {
            fontSize: '30px',
            color: '#ffffff',
            fontFamily: "Custom-Han-Serif"
        });
        this.container = scene.add.container(x, y, [roadImg, roadText]);
        this.container.setDepth(4);
        this.container.setSize(roadImg.width, roadImg.height);
        this.container.setInteractive({
            useHandCursor: true
        })

        scene.input.setDraggable(this.container);
        let that = this;
        this.container.on('drag', function (gameObject, dragX, dragY) {
            that.container.setDepth(100)
            that.container.x = dragX;
            that.container.y = dragY;
        });

        this.container.on('dragend', function (pointer, dragX, dragY, dropped) {
            that.container.setDepth(4)
            if (!dropped) {
                that.container.x =  that.container.input.dragStartX;
                that.container.y =  that.container.input.dragStartY;
            }
        });




    }



}