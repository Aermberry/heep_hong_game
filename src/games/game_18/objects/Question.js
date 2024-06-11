
export default class Question {

    constructor(scene, x, y, item, index) {
        this.inPosition = {
            x,
            y
        }
        // const ImgsType = {
        //     'green': 'home_g',
        //     'yellow': 'home_y'
        // }
        const ImgsArr = ["home_b", "home_e", "home_g", "home_o", "home_r"]
        let ImaIndex = Math.floor((Math.random() * ImgsArr.length))
        this.handKey = item.type == 1 ? ImgsArr[ImaIndex] : "home_y";
        let roadImg = scene.add.sprite(0, 0, this.handKey);
        let roadText = scene.add.text(
            0, -20, item.value,
            {
                fontSize: '42px',
                color: '#000000',
                fontFamily: "Custom-STKaitiTC",
                textAlign: "center"
            }
        )
        roadText.x = roadText.width / 2 - roadText.width
        this.container = scene.add.container(x, index == 1 ? y + 100 : y, [roadImg, roadText]);
        this.container.setDepth(4);
        this.container.setSize(roadImg.width, roadImg.height);
        this.container.setInteractive({
            useHandCursor: true
        })
        this.container.type = item.type;
        this.container.last.type = item.type;
        this.container.name = index == 0 ? 'up' : 'down'

        scene.input.setDraggable(this.container);
        let that = this;
        this.container.on('drag', function (gameObject, dragX, dragY) {
            that.container.x = dragX;
            that.container.y = dragY;
            that.container.setDepth(20);
        });
        console.log(this.container.input)
        this.container.on('dragend', function (pointer, dragX, dragY, dropped) {
            that.container.setDepth(4)
            if (!dropped) {
                console.log('不执行')
                that.container.x = that.container.input.dragStartX;
                that.container.y = that.container.input.dragStartY;
            }
            // that.container.x = that.container.input.dragStartX;
            // that.container.y = that.container.input.dragStartY;
        });
    }

}