import Phaser from "phaser";
import DragText from "./DragText"
import DoneBtn from "./DoneBtn"
export default class Scoreboard {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.num = 0;
    }

    init(data) {
        this.time = new SocreType(this.scene, this.x + 0, this.y + 0, 'hinsbx1', data.type.t, this.onComplete.bind(this));
        this.local = new SocreType(this.scene, this.x + 0, this.y + 50, 'hinsbx2', data.type.l, this.onComplete.bind(this));
        this.people = new SocreType(this.scene, this.x + 0, this.y + 100, 'hinsbx3', data.type.p, this.onComplete.bind(this));
        this.before = new SocreType(this.scene, this.x + 500, this.y + 0, 'hinsbx4', data.type.b, this.onComplete.bind(this));
        this.after = new SocreType(this.scene, this.x + 500, this.y + 50, 'hinsbx5', data.type.a, this.onComplete.bind(this));
        this.result = new SocreType(this.scene, this.x + 500, this.y + 100, 'hinsbx6', data.type.r, this.onComplete.bind(this));

    }

    quiz(gameObject, zone) {
        if (gameObject.type == zone) {
            switch (gameObject.type) {
                case 't':
                    this.time.onCorrect();
                    break;
                case 'l':
                    this.local.onCorrect();
                    break;
                case 'p':
                    this.people.onCorrect();
                    break;
                case 'b':
                    this.before.onCorrect();
                    break;
                case 'a':
                    this.after.onCorrect();
                    break;
                case 'r':
                    this.result.onCorrect();
                    break;
            }

            let dragText = this.scene.input.displayList.list.filter((item) => item instanceof DragText && item.name == gameObject.name)
            dragText.forEach(item => {
                item.destroy();
            })
            gameObject.destroy();
        }
    }

    onComplete() {
        this.num++;
        if (this.num >= 6) {
            new DoneBtn(this.scene, this.x + 700, this.y + 250)

        }
    }


}



class SocreType extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite, num, onComplete) {
        super(scene, x, y);
        let title = scene.add.sprite(0, 0, sprite).setOrigin(0).setScale(0.4);
        this.arr = [];
        this.num = num;
        this.onComplete = onComplete;
        this.correctNum = 0;
        let index = 0;
        while (index < num) {
            let sprite = scene.add.sprite(title.displayWidth + 20 + 100 * index, 0, 'mini_but_shw').setOrigin(0).setScale(0.4);
            this.arr.push(sprite)
            index++
        }
        this.add([title].concat(this.arr));
        scene.add.existing(this)
    }

    onCorrect() {
        this.correctNum++;
        let index = 0;
        while (index < this.correctNum) {
            this.arr[index].setTexture('mini_but');
            index++
        }
        if (this.correctNum >= this.num) {
            this.onComplete();
        }

    }
}