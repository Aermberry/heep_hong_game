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
        let selectItems = [];
        let errorNumber = 0;
        this.answers = []
        for (let i = 0; i < answer.length; i++) {
            this.answers.push(new Question(scene, x, y + (198 * i), answer[i], i).container)
        }
        let that = this;
        scene.input.on('drop', function (pointer, gameObject, dropZone) {
            that.answers[0].input.draggable = false;
            that.answers[1].input.draggable = false;
            let type = dropZone.x == 416 ? 1 : 2; //根据位置判断主语谓语框；
            gameObject.x = dropZone.x - (gameObject.type == 1 ? 8 : 11);  //拖拽定位X
            gameObject.y = dropZone.y + 100; //拖拽定位Y
            let music = that.scene.sound.add('complete')
            music.setLoop(false)
            music.play()
            if (gameObject.type == type) {
                let children = [];
                let yes = that.scene.add.sprite(0, 0, 'yes');
                children.push(yes);
                that.add(children);
                that.setPosition(dropZone.x, dropZone.y - 100)
                let music = that.scene.sound.add('yes')
                music.setLoop(false)
                music.play()
                yes.play('yes').on('animationcomplete', () => {
                    selectItems.push(gameObject); //答案正确添加选择数组
                    for (var i = 0; i < that.answers.length; i++) {
                        if (gameObject.type != that.answers[i].type) {
                            that.answers[i].input.draggable = true;
                        }
                    }
                    if (selectItems.length == 2) { //答案数组两个，表示答题正确执行盖楼动画
                        completeAnswerAnimation();
                    }
                });
            } else {
                errorNumber++;
                let children = [];
                let wrong = that.scene.add.sprite(0, 0, 'wrong');
                children.push(wrong);
                that.add(children);
                that.setPosition(dropZone.x, dropZone.y - 100)
                let music = that.scene.sound.add('wrong')
                music.setLoop(false)
                music.play();
                wrong.play('wrong').on('animationcomplete', () => {
                    if (errorNumber == 2) { //错误两次自动完成答题进入下一题；
                        for (var i = 0; i < that.answers.length; i++) {
                            if (that.answers[i].type == 1) {
                                that.answers[i].x = 408;408 
                                that.answers[i].y = 802;
                            } else {
                                that.answers[i].x = 803;
                                that.answers[i].y = 802;
                            }
                        }
                        completeAnswerAnimation();
                    } else {
                        //错误，复位；重新选择；
                        if (gameObject.name == 'up') {
                            gameObject.x = x;
                            gameObject.y = y;
                        } else {
                            gameObject.x = x;
                            gameObject.y = y + 200;
                        }
                        if (selectItems.length == 0) {
                            for (var j = 0; j < that.answers.length; j++) {
                                that.answers[j].input.draggable = true;
                            }
                        } else {
                            gameObject.input.draggable = true;
                        }

                    }

                });
            }
        });
    }

}