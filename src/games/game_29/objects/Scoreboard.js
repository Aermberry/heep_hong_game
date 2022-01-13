import Phaser from "phaser";
import DragText from "./DragText"
import DoneBtn from "./DoneBtn"
export default class Scoreboard {
    constructor(scene, x, y, onCompleteOnce, onHighlightCallback) {
        this.scene = scene;
        this.onHighlightCallback = onHighlightCallback;
        this.onCompleteOnce = onCompleteOnce;
        this.x = x;
        this.y = y;
        this.num = 0;
    }

    init(data) {
        this.time = new ScoreType(this.scene, this.x + 0, this.y + 0, 'hinsbx1', data.type.t, 't', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
        this.local = new ScoreType(this.scene, this.x + 0, this.y + 50, 'hinsbx2', data.type.l, 'l', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
        this.people = new ScoreType(this.scene, this.x + 0, this.y + 100, 'hinsbx3', data.type.p, 'p', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
        this.before = new ScoreType(this.scene, this.x + 500, this.y + 0, 'hinsbx4', data.type.b, 'b', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
        this.after = new ScoreType(this.scene, this.x + 500, this.y + 50, 'hinsbx5', data.type.a, 'a', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
        this.result = new ScoreType(this.scene, this.x + 500, this.y + 100, 'hinsbx6', data.type.r, 'r', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));

    }

    quiz(gameObject, zone) {
        if (gameObject.type == zone.type) {
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

    onComplete(type) {
        this.num++;
        this.onCompleteOnce(type)
        if (this.num >= 6) {
            this.result.openInteractive();
            this.time.openInteractive();
            this.local.openInteractive();
            this.people.openInteractive();
            this.before.openInteractive();
            this.after.openInteractive();
            let crt_ans_star = this.scene.add.sprite(this.x + 200, 870, 'crt_ans_star').setScale(0.4);
            let crt_ans_star1 = this.scene.add.sprite(this.x + 700, 870, 'crt_ans_star').setScale(0.4);
            let crt_ans_star2 = this.scene.add.sprite(this.x + 60, 500, 'crt_ans_star').setScale(0.4);
            let crt_ans_star3 = this.scene.add.sprite(this.x + 800, 500, 'crt_ans_star').setScale(0.4);
            crt_ans_star1.play('crt_ans_star')
            crt_ans_star.play('crt_ans_star')
            crt_ans_star2.play('crt_ans_star')
            crt_ans_star3.play('crt_ans_star')
            new DoneBtn(this.scene, this.x + 700, 1000)
        }
    }

    onScoreTypeBtnClick(type) {
        this.time.toggleStyle(type);
        this.local.toggleStyle(type);
        this.people.toggleStyle(type);
        this.before.toggleStyle(type);
        this.after.toggleStyle(type);
        this.result.toggleStyle(type);
        this.onHighlightCallback(type);
    }


}



class ScoreType extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite, num, type, onComplete, onHighlightCallback) {
        super(scene, x, y);
        this.title = scene.add.sprite(0, 0, sprite).setOrigin(0).setScale(.5);
        this.onHighlightCallback = onHighlightCallback;
        this.arr = [];
        this.num = num;
        this.type = type;
        this.onComplete = onComplete;
        this.correctNum = 0;
        let index = 0;
        while (index < num) {
            let sprite;
            if (index >= 8) {
                sprite = scene.add.sprite(this.title.displayWidth + 20 + 100 * (index % 8), 100, 'chkmrk').setOrigin(0).setScale(0.4);
            } else if (index >= 4 && index < 8) {
                sprite = scene.add.sprite(this.title.displayWidth + 20 + 100 * (index % 4), 50, 'chkmrk').setOrigin(0).setScale(0.4);
            }
            else {
                sprite = scene.add.sprite(this.title.displayWidth + 20 + 100 * index, 0, 'chkmrk').setOrigin(0).setScale(0.4);
            }
            this.arr.push(sprite)
            index++
        }
        this.add([this.title].concat(this.arr));
        scene.add.existing(this)
    }

    onCorrect() {
        this.correctNum++;
        let index = 0;
        while (index < this.correctNum) {
            this.arr[index].setFrame(1);
            index++
        }
        if (this.correctNum >= this.num) {
            this.onComplete(this.type);
        }
    }

    openInteractive() {
        let self = this;
        self.title.setInteractive({
            useHandCursor: true
        })
        self.title.on('pointerdown', function () {
            self.onHighlight();
        })
    }

    onHighlight() {
        this.onHighlightCallback(this.type)
    }

    toggleStyle(type) {
        this.title.setFrame(type != this.type ? 0 : 1)
    }



}