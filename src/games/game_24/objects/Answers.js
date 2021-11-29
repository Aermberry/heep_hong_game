import Question from "./Quesiton"
import Phaser from 'phaser'
export default class Answers extends Phaser.GameObjects.Container {

    constructor(scene, x, y, question) {

        super(scene, x, y);
        this.answers = [];
        this.question = question;
        let _width = 0;
        for (let i = 0; i < this.question.length; i++) {
            if (this.answers.length == 0) {
                this.answers.push(new Question(scene, 400, y, this.question[i], this.selectAnswerRecord.bind(this)));
            } else {
                _width = _width + this.answers[i - 1].container.width + 100;
                this.answers.push(new Question(scene, 400 + _width, y, this.question[i], this.selectAnswerRecord.bind(this)));
            }
        }
    }
    //答案选择；
    selectAnswerRecord(answer) {
        for (let i = 0; i < this.question.length; i++) {
            if (this.question[i].type == answer.type) {
                this.question[i] = answer;
                if (this.question.every((item) => item.result != null)) { //答案选完；
                    this.answers.forEach(element => {
                        element.setFramebtn(2)
                    })
                }
            }
        }
    }

    //开始检查答案是否正确；
    startCheckAnswer() {
        if (!this.question.every((item) => item.result != null)) {
            console.log('没有选择答案')
            return;
        }
        for (let i = 0; i < this.question.length; i++) {
            if (this.question[i].result == false) {
                this.answers[i].setFramebtn(4);
                if (i == 0) {
                    this.cat(this.x + this.answers[i].container.width - 150, this.question[i]);
                } else {
                    this.cat(this.answers[i].container.width + this.answers[i].container.y, this.question[i]);
                }
                return;
            } else {
                this.answers[i].setFramebtn(3);
                this.cat(2000, this.question[i]);
            }
        }
    }


    //车子行驶轨迹 
    cat(catx, item) {
        this.scene.tweens.add({
            targets: this.scene.car1,
            x: catx,
            duration: 1500,
            ease: 'Power2',
        }).on('complete', () => { //车子走完执行方法；
            if (item.result == false) {
                console.log('撞车啦');
                this.scene.car1.play('pink_car_stop').once("animationcomplete", () => {
                    this.scene.bears.play('bear2');
                    this.scene.pens.play('pen2');
                    this.scene.leoo.play('leo2').once("animationcomplete", () => {
                        this.scene.car1.play('pink_car_run').once("animationcomplete", () => {
                            this.anewQuestion();
                        })
                    })
                });
            } else {
                if (this.question.every((item) => item.result == true)) {
                    this.scene.currentIndex++;
                    this.question.forEach(element => {
                        element.result = null;
                    })
                    if (this.scene.currentIndex == this.scene.currentQuestionGroup.length) {
                        console.log('已经答完5道题');
                        this.scene.scene.start('End');
                    } else {
                        this.scene.scene.start('Game', { number: this.scene.currentIndex, currentQuestionGroup: this.scene.currentQuestionGroup });
                    }
                }
            }
        });
    }

    //答案错误，重新答题；
    anewQuestion() {
        for (let i = 0; i < this.question.length; i++) {
            this.answers[i].resetting(0);
            this.question[i].result = null;
        }
        this.scene.bears.play('bear');
        this.scene.pens.play('pen');
        this.scene.leoo.play('leo');
        this.scene.car1.x = this.scene.getColWidth(0.5);
    }

}