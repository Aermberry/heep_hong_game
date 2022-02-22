import Question from "./Question"
import Phaser from 'phaser'
export default class Answers extends Phaser.GameObjects.Container {

    constructor(scene, x, y, answer, completeAnswerAnimation) {
        super(scene, x, y);
        this.inPosition = {
            x,
            y
        }
        //创建一个答案区域
        this.completeAnswerAnimation = completeAnswerAnimation;
        this.selectItems = [];
        this.errorNumber = 0;
        this.drag_times = 0;
        this.answers = [];
        this.completeButtonState = false;
        this.dropZoneArr = [];
        this.remind;
        this.clickStatus = true;
        for (let i = 0; i < answer.length; i++) {
            this.answers.push(new Question(scene, x + (400 * i), y, answer[i], i).container);
        }
        let that = this;
        scene.input.on('drop', function (pointer, gameObject, dropZone) {
            let type = dropZone.x == 416 ? 1 : 2; //根据位置判断主语谓语框；
            console.log(that.answers);
            if (dropZone.data != null) { //判断答案框是否已经存在答案；

                if (gameObject.name == dropZone.data.name) {
                    that.scene.tweens.add({
                        targets: gameObject,
                        x: dropZone.x - (gameObject.type == 1 ? 7 : 11),
                        y: dropZone.y + 100,
                        duration: 500,
                        ease: 'Power2'
                    })
                } else {
                    for (var i = 0; i < that.answers.length; i++) {
                        if (that.answers[i].name == gameObject.name) {
                            that.scene.tweens.add({
                                targets: gameObject,
                                x: dropZone.x - (gameObject.type == 1 ? 7 : 11),
                                y: dropZone.y + 100,
                                duration: 500,
                                ease: 'Power2'
                            })
                            that.dropZoneArr.forEach((item) => item.data = null);
                            that.selectItems = [];
                            that.dropZoneArr = [];
                            that.drag_times = 1;
                            dropZone.data = gameObject;
                            that.dropZoneArr.push(dropZone);
                            if (gameObject.type == type) {
                                that.selectItems.push(gameObject);
                            }
                        
                            if(that.remind != undefined) {
                                that.remind.visible = false;
                            }
                        } else {
                            if (that.answers[i].name == 'up') {
                                that.scene.tweens.add({
                                    targets: that.answers[i],
                                    x: that.x,
                                    y: that.y,
                                    duration: 500,
                                    ease: 'Power2'
                                });
                            } else {
                                console.log(i)
                                that.scene.tweens.add({
                                    targets: that.answers[i],
                                    x: that.x + 400,
                                    y: that.y + 100,
                                    duration: 500,
                                    ease: 'Power2'
                                })
                            }
                        }
                    }
                }
                return;
            }
            that.drag_times++;
            dropZone.data = gameObject;
            that.dropZoneArr.push(dropZone);
            that.scene.tweens.add({
                targets: gameObject,
                x: dropZone.x - (gameObject.type == 1 ? 7 : 11),
                y: dropZone.y + 100,
                duration: 500,
                ease: 'Power2'
            })
            if (gameObject.type == type) {
                that.selectItems.push(gameObject);
            }
            if (that.drag_times == 2) {
                let remind = that.scene.add.sprite(gameObject.type == 1 ? 300 : 400, 150, 'remind');
                that.add(remind);
                remind.play('remind');
                that.remind = remind;
                that.completeButtonState = true;
            }
        });
    }


    completeGame() {
        if (this.clickStatus) {
            if (this.completeButtonState) {
                this.completeButtonState = false;
                this.remind.visible = false;
                this.clickStatus = false;
                if (this.selectItems.length == 2) { //答案数组两个，表示答题正确执行盖楼动画
                    this.answers[0].input.draggable = false;
                    this.answers[1].input.draggable = false;
                    this.completeAnswerAnimation(true);
                } else {
                    this.errorNumber++;
                    this.drag_times = 0;
                    this.completeAnswerAnimation(false, this.errorNumber);
                    // }
                    this.clickStatus = true;

                }
            }
        }
    }

    answerError() {
        for (var i = 0; i < this.answers.length; i++) {
            this.answers[i].input.draggable = true;
            this.answers[i].data = null;
            this.dropZoneArr[i].data = null;
            if (this.answers[i].name == 'up') {
                this.scene.tweens.add({
                    targets: this.answers[i],
                    x: this.x,
                    y: this.y,
                    duration: 500,
                    ease: 'Power2'
                });
            } else {
                console.log(i)
                this.scene.tweens.add({
                    targets: this.answers[i],
                    x: this.x + 400,
                    y: this.y + 100,
                    duration: 500,
                    ease: 'Power2'
                })
            }
        }
        this.selectItems = [];
    }

}