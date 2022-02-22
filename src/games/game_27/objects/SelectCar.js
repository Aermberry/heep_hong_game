import Phaser from "phaser";
export default class SelectCar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, item) {
        super(scene, x, y);
        this.isDrag = false;
        let itemImg;
        let max = 6;
        itemImg = scene.physics.add.sprite(0, 0, `4w_car${Math.floor(Math.random() * (max - 1 + 1) + 1)}`).setBounce(0.1);
        let text = scene.add.text(0, 140, item, {
            fontSize: '45px', //30px
            color: '#000000',
            fontWeight: 'bold',
            fontFamily: "system-ui"
        });
        text.x = text.width / 2 - text.width;
        this.add([itemImg, text]);
        this.setSize(itemImg.width, itemImg.height);
        this.selectAreaOring = {
            x: x,
            y: y
        }
        this.origin = {
            x: x,
            y: y
        }
        this.index = [];
        scene.add.existing(this);
        this.setInteractive({
            useHandCursor: true
        })
        scene.input.setDraggable(this);
        let self = this;
        this.on('drag', (pointer, dragX, dragY) => {
            this.x = dragX;
            this.y = dragY;
            this.isDrag = true;
            scene.onDragObject = self;
            if (Phaser.Geom.Rectangle.Overlaps(scene.trackZone.getBounds(), itemImg.getBounds())) {
                this.reRender();
            } else {
                this.leaveRender();
            }
        });

        this.on('dragend', function () {
            if (this.isDrag) {
                if (Phaser.Geom.Rectangle.Overlaps(scene.trackZone.getBounds(), itemImg.getBounds())) {
                    // this.x += this.scene.subjectItem.x;
                    let audio = this.scene.sound.add('drop');
                    audio.play();
                    this.origin.x = this.x;
                    let self = this;
                    self.scene.subjectItem.add(self);
                } else {
                    this.x = this.selectAreaOring.x;
                    this.y = this.selectAreaOring.y;
                    this.scene.subjectItem.remove(this);
                }
                self.scene.question.onChange()
            }
            this.isDrag = false;
        })

    }



    leaveRender() {
        // this.scene.subjectItem.remove(this);
    }

    reRender() {
        let self = this;
        self.index = [];
        self.thisIndex = 0;
        if (self.scene.subjectItem.list.includes(this)) {
            self.scene.subjectItem.list.splice(self.scene.subjectItem.list.indexOf(this), 1);
            self.scene.subjectItem.list.push(this)
        }
        // console.log(this.scene.subjectItem.x);
        self.scene.subjectItem.list.forEach((item, index) => {
            if (item == this) {
                self.thisIndex = index;
                return;
            }
            if (item.x + this.scene.subjectItem.x <= this.x) {
                item.x = item.origin.x;
                this.move(item, item.origin.x - this.width / 2)
            } else {
                self.index.push(index)
                item.x = item.origin.x;
                this.move(item, item.origin.x + this.width / 2)
            }
        });
    }

    move(o, x) {
        this.scene.tweens.add({
            targets: o,
            x: x,
            duration: 200,
            ease: 'Power2'
        }).on('complete', () => {
            if (!this.isDrag) {
                o.x = o.origin.x;
            }
        });
    }

}

