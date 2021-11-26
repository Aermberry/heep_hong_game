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
            if (dropZone.data != null) { //判断答案框是否已经存在答案；
                if (gameObject.name == 'up') {
                    that.scene.tweens.add({
                        targets: gameObject,
                        x: x,
                        y: y,
                        duration: 500,
                        ease: 'Power2'
                    });
                } else {
                    that.scene.tweens.add({
                        targets: gameObject,
                        x: x + 400,
                        y: y + 100,
                        duration: 500,
                        ease: 'Power2'
                    });
                }
                return;
            }
            that.drag_times++;
            dropZone.data = gameObject;
            that.dropZoneArr.push(dropZone);
            that.answers[0].input.draggable = false;
            that.answers[1].input.draggable = false;
            let type = dropZone.x == 416 ? 1 : 2; //根据位置判断主语谓语框；
            // gameObject.x = dropZone.x - (gameObject.type == 1 ? 8 : 11);  //拖拽定位X
            // gameObject.y = dropZone.y + 100; //拖拽定位Y
            that.scene.tweens.add({
                targets: gameObject,
                x: dropZone.x - (gameObject.type == 1 ? 7 : 11),
                y: dropZone.y + 100,
                duration: 500,
                ease: 'Power2'
            })
            // let music = that.scene.sound.add('done')
            // music.setLoop(false)
            // music.play() 
            if (gameObject.type == type) {
                that.selectItems.push(gameObject);
            }
            for (var i = 0; i < that.answers.length; i++) {
                if (gameObject.type != that.answers[i].type) {
                    that.answers[i].input.draggable = true;
                }
            }
            if (that.drag_times == 2) {
                let remind = that.scene.add.sprite(gameObject.type == 1 ? 300 : 400, 150, 'remind');
                that.add(remind);
                remind.play('remind');
                that.remind = remind;
                that.completeButtonState = true;
            }
            // if (gameObject.type == type) {
            //     let children = [];
            //     let yes = that.scene.add.sprite(0, 0, 'yes');
            //     children.push(yes);
            //     that.add(children);
            //     that.setPosition(dropZone.x, dropZone.y - 100)
            // let music = that.scene.sound.add('yes')
            // music.setLoop(false)
            // music.play()
            //     yes.play('yes').on('animationcomplete', () => {
            //         that.selectItems.push(gameObject); //答案正确添加选择数组
            // for (var i = 0; i < that.answers.length; i++) {
            //     if (gameObject.type != that.answers[i].type) {
            //         that.answers[i].input.draggable = true;
            //     }
            // }
            // if (that.selectItems.length == 2) {
            //     let remind = that.scene.add.sprite(gameObject.type == 1?1300:900, 150, 'remind');
            //     that.add(remind);
            //     remind.play('remind')
            // }
            //         console.log(gameObject.type)
            //         // if (selectItems.length == 2) { //答案数组两个，表示答题正确执行盖楼动画
            //         //     that.answers[0].input.draggable = false;
            //         //     that.answers[1].input.draggable = false;
            //         //     completeAnswerAnimation();
            //         // }
            //     });
            // } else {
            //     errorNumber++;
            //     let children = [];
            //     let wrong = that.scene.add.sprite(0, 0, 'wrong');
            //     children.push(wrong);
            //     that.add(children);
            //     that.setPosition(dropZone.x, dropZone.y - 100)
            //     let music = that.scene.sound.add('wrong')
            //     music.setLoop(false)
            //     music.play();
            //     wrong.play('wrong').on('animationcomplete', () => {
            //         if (errorNumber == 2) { //错误两次自动完成答题进入下一题；
            //             for (var i = 0; i < that.answers.length; i++) {
            //                 if (that.answers[i].type == 1) {
            //                     that.scene.tweens.add({
            //                         targets: that.answers[i],
            //                         x: 408,
            //                         y: 802,
            //                         duration: 500,
            //                         ease: 'Power2'
            //                     });
            //                     // that.answers[i].x = 408;
            //                     // that.answers[i].y = 802;
            //                 } else {
            //                     that.scene.tweens.add({
            //                         targets: that.answers[i],
            //                         x: 803,
            //                         y: 802,
            //                         duration: 500,
            //                         ease: 'Power2'
            //                     });
            //                     // that.answers[i].x = 803;
            //                     // that.answers[i].y = 802;
            //                 }
            //             }
            //             // that.selectItems = [];
            //             // that.selectItems.push(...that.answers);
            //             // if (that.selectItems.length == 2) {
            //             //     let remind = that.scene.add.sprite(gameObject.type == 1?950:1000, 150, 'remind');
            //             //     that.add(remind);
            //             //     remind.play('remind')
            //             // }
            //             // console.log(gameObject.type)
            //             completeAnswerAnimation();
            //         } else {
            //             //错误，复位；重新选择；
            // if (gameObject.name == 'up') {
            //     that.scene.tweens.add({
            //         targets: gameObject,
            //         x: x,
            //         y: y,
            //         duration: 500,
            //         ease: 'Power2'
            //     });
            //     // gameObject.x = x;
            //     // gameObject.y = y;
            // } else {
            //     that.scene.tweens.add({
            //         targets: gameObject,
            //         x: x + 400,
            //         y: y + 100,
            //         duration: 500,
            //         ease: 'Power2'
            //     });
            //     // gameObject.x = x;
            //     // gameObject.y = y + 200;
            // }
            //             if (that.selectItems.length == 0) {
            //                 for (var j = 0; j < that.answers.length; j++) {
            //                     that.answers[j].input.draggable = true;
            //                 }
            //             } else {
            //                 gameObject.input.draggable = true;
            //             }

            //         }

            //     });
            // }
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
                // gameObject.x = x;
                // gameObject.y = y;
            } else {
                console.log(i)
                this.scene.tweens.add({
                    targets: this.answers[i],
                    x: this.x + 400,
                    y: this.y + 100,
                    duration: 500,
                    ease: 'Power2'
                })
                // gameObject.x = x;
                // gameObject.y = y + 200;
            }
        }
        this.dropZoneArr = [];
        this.selectItems = [];
    }

}