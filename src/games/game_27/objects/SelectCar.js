import Phaser from "phaser";
export default class SelectCar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, item) {
        super(scene, x, y);
        this.isActive = false;
        let itemImg;
        let max = 6;
        itemImg = scene.add.sprite(0, 0, `4w_car${Math.floor(Math.random() * (max - 1 + 1) + 1)}`);
        let text = scene.add.text(0, 140 , item, {
            fontSize: '45px', //30px
            color: '#000000',
            fontWeight: 'bold',
            fontFamily: "system-ui"
        });
        text.x =  text.width / 2 - text.width;
        this.add([itemImg, text]);
        this.setSize(itemImg.width, itemImg.height);
        this.selectAreaOring = {
            x: x,
            y: y
        }
        this.setDepth(100)
        scene.add.existing(this);
        this.setInteractive({
            useHandCursor: true
        })
        scene.input.setDraggable(this);
        scene.input.enableDebug(this);
        
        this.on('drag', (pointer, dragX, dragY) => {
            this.x = dragX;
            this.y = dragY;
            if (this.isActive) {
                this.reRender();
            } else {
                this.leaveRender();
            }
        });

        //进入轨道zone
        this.on('dragenter', () => {
            // pointer, zone
            this.isActive = true;
        });
        //离开轨道zone
        this.on('dragleave', () => {
            this.isActive = false;
        })
        this.on('dragend', function () {
            // console.log(pointer, dragX, dragY, dropped);
            if (this.isActive) {
                this.scene.subjectItem.add(this);
            } else {
                this.x = this.selectAreaOring.x;
                this.y = this.selectAreaOring.y;
                this.scene.subjectItem.remove(this);
            }
        })
    }

    leaveRender() {
        // if (dropZone instanceof TrackZone) { 判断是否是该类的实例化
        this.scene.subjectItem.list.forEach(item => {
            if (item == this) return;
            item.x = item.origin.x;
        });
    }

    reRender() {
        let self = this;
        self.scene.subjectItem.list.forEach(item => {
            if (item == this) return;
            if (item.x <= this.x) {
                self.scene.tweens.add({
                    targets: item,
                    x: item.origin.x - this.width / 2,
                    duration: 200,
                    ease: 'Power2'
                })
            }
            else {
                if (item == this) return;
                self.scene.tweens.add({
                    targets: item,
                    x: item.origin.x + this.width / 2,
                    duration: 200,
                    ease: 'Power2'
                })
            }
        });
    }

}

