import Phaser from "phaser";
import DragText from "./DragText"
import DoneBtn from "./DoneBtn"
export default class Scoreboard {
    constructor(scene, x, y, onCompleteOnce, onHighlightCallback, onCompleteCallback, isGame30 = false) {
        this.scene = scene;
        this.isGame30 = isGame30;
        this.onHighlightCallback = onHighlightCallback;
        this.onCompleteOnce = onCompleteOnce;
        this.onCompleteCallback = onCompleteCallback;
        this.x = x;
        this.y = y;
        this.num = 0;
        this.scoreTypeArr = [];
    }

    init(data) {
        if (this.isGame30) {
            data.forEach((key, i) => {
                let textureName = key == 'l' ? 'lv3hinsbx1' : key == 't' ? 'lv3hinsbx2' : key == 'r' ? 'lv3hinsbx3' : key == 'a' ? 'lv3hinsbx4' : key == 'p' ? 'lv3hinsbx5' : 'lv3hinsbx6';
                this.scoreTypeArr.push(new ScoreType(this.scene, this.x, this.y + 50 * i, textureName, this.scene.answer.type[key], key, this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this), true))
            })
        } else {
            this.time = new ScoreType(this.scene, this.x + 0, this.y + 0, 'hinsbx1', data.type.t, 't', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
            this.local = new ScoreType(this.scene, this.x + 0, this.y + 50, 'hinsbx2', data.type.l, 'l', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
            this.people = new ScoreType(this.scene, this.x + 0, this.y + 100, 'hinsbx3', data.type.p, 'p', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
            this.before = new ScoreType(this.scene, this.x + 500, this.y + 0, 'hinsbx4', data.type.b, 'b', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
            this.after = new ScoreType(this.scene, this.x + 500, this.y + 50, 'hinsbx5', data.type.a, 'a', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
            this.result = new ScoreType(this.scene, this.x + 500, this.y + 100, 'hinsbx6', data.type.r, 'r', this.onComplete.bind(this), this.onScoreTypeBtnClick.bind(this));
            this.scoreTypeArr.push(this.time, this.local, this.people, this.before, this.after, this.result)
        }


    }

    quiz(gameObject, zone) {
        if (gameObject.type == zone.type) {

            this.scoreTypeArr.forEach(item => {
                item.onCorrect(gameObject.type);
            });

            let dragText = this.scene.input.displayList.list.filter((item) => item instanceof DragText && item.name == gameObject.name)
            dragText.forEach(item => {
                item.destroy();
            })
            gameObject.destroy();
            let music = this.scene.sound.add('yes')
            music.play();
            return true;
        } else {
            let music = this.scene.sound.add('no')
            music.play();
            return false;
        }
    }

    onComplete(type) {
        this.num++;
        this.onCompleteOnce(type)
        if (this.num >= this.scoreTypeArr.length) {
            this.onCompleteCallback();
            this.scoreTypeArr.forEach(item => {
                item.openInteractive();
            });
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
        this.scoreTypeArr.forEach(item => {
            item.toggleStyle(type);
        });
        this.onHighlightCallback(type);
    }

}



class ScoreType extends Phaser.GameObjects.Container {
    constructor(scene, x, y, sprite, num, type, onComplete, onHighlightCallback, isGame30 = false) {
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
            if (isGame30) {
                sprite = scene.add.sprite(this.title.displayWidth + 20 + 70 * index, 0, 'chkmrk').setOrigin(0).setScale(0.4);
            } else {
                if (index >= 8) {
                    sprite = scene.add.sprite(this.title.displayWidth + 20 + 100 * (index % 8), 100, 'chkmrk').setOrigin(0).setScale(0.4);
                } else if (index >= 4 && index < 8) {
                    sprite = scene.add.sprite(this.title.displayWidth + 20 + 100 * (index % 4), 50, 'chkmrk').setOrigin(0).setScale(0.4);
                }
                else {
                    sprite = scene.add.sprite(this.title.displayWidth + 20 + 100 * index, 0, 'chkmrk').setOrigin(0).setScale(0.4);
                }
            }
            this.arr.push(sprite)
            index++
        }
        this.add([this.title].concat(this.arr));
        scene.add.existing(this)
    }

    onCorrect(type) {
        if (type == this.type) {
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