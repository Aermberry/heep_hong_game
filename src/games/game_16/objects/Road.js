
export default class Road {

    constructor(scene, x, y, item, onDragHandler, onEndDragHandler) {
        this.inPosition = {
            x,
            y
        }
        this.flag = true;
        let roadImg = scene.add.sprite(0, 0, 'road');
        let roadText = scene.add.text(-110, -30, item, {
            fontSize: '55px', //30px
            color: '#ffffff',
            fontFamily: "Custom-Han-Serif"
        });
        roadText.x = roadText.width / 2 - roadText.width

        this.container = scene.add.container(x, y, [roadImg, roadText]);
        this.container.setDepth(4);
        this.container.setSize(roadImg.width, roadImg.height);
        this.container.setInteractive({
            useHandCursor: true
        })

        scene.input.setDraggable(this.container);
        let that = this;
        this.container.on('drag', function (gameObject, dragX, dragY) {
            if (that.flag) {
                let music = scene.sound.add('drop');
                music.play();
                that.flag = false;
            }
            that.container.setDepth(100)
            that.container.x = dragX;
            that.container.y = dragY;
            onDragHandler(dragX, dragY)
        });

        this.container.on('dragend', function (pointer, dragX, dragY, dropped) {
            that.flag = true;
            that.container.setDepth(4)
            if (!dropped) {
                that.container.x = that.container.input.dragStartX;
                that.container.y = that.container.input.dragStartY;
            } else {
                let music = scene.sound.add('seal');
                music.play();
            }
            onEndDragHandler(dragX, dragY)
        });




    }



}