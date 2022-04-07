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
        // this.drag_times = 0;
        this.answers = [];
        this.completeButtonState = false;
        this.dropZoneArr = [];
        this.lastDropZone;
        this.remind;
        this.clickStatus = true;
        for (let i = 0; i < answer.length; i++) {
            this.answers.push(new Question(scene, x + (400 * i), y, answer[i], i).container);
        }
        let that = this;
        scene.input.on('drop', function (pointer, gameObject, dropZone) {
            let type = dropZone.x == 416 ? 1 : 2; //根据位置判断主语谓语框；
            if (dropZone.data != null) { //判断答案框是否已经存在答案；
                if (that.dropZoneArr.length == 2) {
                    console.log('交换答案')
                    for (var j = 0; j < that.dropZoneArr.length; j++) {
                        that.scene.tweens.add({
                            targets: that.dropZoneArr[j].data,
                            x: that.dropZoneArr[j].x == 416 ? 814.4 - 11 : 416 - 7,
                            y: dropZone.y + 100,
                            duration: 500,
                            ease: 'Power2'
                        })
                        if (gameObject.name == that.dropZoneArr[j].data.name) {
                            console.log(that.dropZoneArr[j].x);
                            that.dropZoneArr[j].x = that.dropZoneArr[j].x == 416 ? 814.4 : 416;
                            console.log(that.dropZoneArr[j].x);
                        } else {
                            console.log(that.dropZoneArr[j].x);
                            that.dropZoneArr[j].x = that.dropZoneArr[j].x == 416 ? 814.4 : 416;
                            console.log(that.dropZoneArr[j].x);
                        }
                    }
                    console.log(that.selectItems.length)
                    // return;
                    if (that.selectItems.length == 2) {
                        that.selectItems = [];
                        console.log('答案1')
                        console.log(that.selectItems)
                        return;
                    } else {
                        for (var e = 0; e < that.answers.length; e++) {
                            that.selectItems.push(that.answers[e]);
                            console.log(that.selectItems)
                        }
                        console.log('答案2')
                        console.log(that.selectItems)
                        return;
                    }
                }
                if (gameObject.name == dropZone.data.name) {
                    console.log('不做任何处理');
                    that.scene.tweens.add({
                        targets: gameObject,
                        x: dropZone.x - (gameObject.type == 1 ? 7 : 11),
                        y: dropZone.y + 100,
                        duration: 500,
                        ease: 'Power2'
                    })
                    return
                } else {
                    for (var i = 0; i < that.answers.length; i++) {
                        console.log('答案区插入新的答案')

                        //答案区插入新的答案
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
                            // that.drag_times = 1;
                            dropZone.data = gameObject;
                            that.dropZoneArr.push(dropZone);
                            if (gameObject.type == type) {
                                that.selectItems.push(gameObject);
                            }

                            if (that.remind != undefined) {
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
            // that.drag_times++;
            dropZone.data = gameObject;
            if (that.dropZoneArr.length == 0) {
                that.dropZoneArr.push(dropZone);
                if (gameObject.type == type) {
                    that.selectItems.push(gameObject);
                }
            } else {
                if (that.dropZoneArr[0].data.name == gameObject.name) {
                    that.dropZoneArr.forEach((item) => item.data = null);
                    that.dropZoneArr = [];
                    that.selectItems = [];
                    that.dropZoneArr.push(dropZone);
                    if (gameObject.type == type) {
                        that.selectItems.push(gameObject);
                    }
                } else {
                    that.dropZoneArr.push(dropZone);
                    if (gameObject.type == type) {
                        that.selectItems.push(gameObject);
                    }
                }

            }
            that.scene.tweens.add({
                targets: gameObject,
                x: dropZone.x - (gameObject.type == 1 ? 7 : 11),
                y: dropZone.y + 100,
                duration: 500,
                ease: 'Power2'
            })
            if (that.dropZoneArr.length == 2) {
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
                    // this.drag_times = 0;
                    this.completeAnswerAnimation(false, this.errorNumber);
                    // }
                    this.clickStatus = true;

                }
            }
        }
    }

    answerError() {
        this.dropZoneArr.forEach((item) => item.data = null);
        this.dropZoneArr = [];
        for (var i = 0; i < this.answers.length; i++) {
            this.answers[i].input.draggable = true;
            // this.answers[i].data = null;
            // this.dropZoneArr[i].data = null;
            if (this.answers[i].name == 'up') {
                this.scene.tweens.add({
                    targets: this.answers[i],
                    x: this.x,
                    y: this.y,
                    duration: 500,
                    ease: 'Power2'
                });
            } else {
                this.scene.tweens.add({
                    targets: this.answers[i],
                    x: this.x + 400,
                    y: this.y + 100,
                    duration: 500,
                    ease: 'Power2'
                })
            }
        }
    }

    setviser() {
        for (var i = 0; i < this.answers.length; i++) {
            this.answers[i].visible = false;
        }
    }

}