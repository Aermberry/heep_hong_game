import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import BtnCar from '../objects/BtnCar'
import LeftMoveButton from '../objects/LeftMoveButton'
import RightMoveButton from '../objects/RightMoveButton'
import QuestionItem from "../objects/QuesitonItem"
export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game',
        });

        this.isBtn = true;

    }

    init(data) {
        this.dataModal = this.sys.game.globals.model;
        this.currentIndex = data.number;
        if (data.currentQuestionGroup.length == 0) {
            let originalArray = this.dataModal.gameAnswers;
            var result = [];

            var ranNum = 5;

            for (var i = 0; i < ranNum; i++) {
                var ran = Math.floor(Math.random() * (originalArray.length - i));

                result.push(originalArray[ran]);
                originalArray[ran] = originalArray[originalArray.length - i - 1];

            }
            this.currentQuestionGroup = result;
        } else {
            this.currentQuestionGroup = data.currentQuestionGroup;
        }
    }

    preload() {

        this.anims.create({
            key: 'pink_car_run',
            delay: 200,
            frames: this.anims.generateFrameNames('green_carc', { prefix: 'green car crush', start: 0, end: 0, zeroPad: 4 }),
            repeat: 0,
            // duration: 5000
        });
        this.anims.create({
            key: 'pink_car_stop',
            delay: 200,
            frames: this.anims.generateFrameNames('green_carc', { prefix: 'green car crush', start: 1, end: 29, zeroPad: 4 }),
            repeat: 0,
            // duration: 5000
        });
        // this.anims.create({
        //     key: 'bg_up',
        //     delay: 200,
        //     frames: this.anims.generateFrameNames('bg_up', { prefix: 'bg_up', start: 0, end: 60, zeroPad: 4 }),
        //     repeat: -1,
        //     // duration: 5000
        // });
        this.anims.create({
            key: 'leo2',
            delay: 200,
            frames: this.anims.generateFrameNames('leo', { prefix: 'leoo', start: 120, end: 179, zeroPad: 4 }),
            repeat: 0,
            // duration: 5000
        });
        this.anims.create({
            key: 'leo',
            delay: 200,
            frames: this.anims.generateFrameNames('leo', { prefix: 'leoo', start: 0, end: 120, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'pen',
            delay: 200,
            frames: this.anims.generateFrameNames('pen', { prefix: 'pen', start: 0, end: 120, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'pen2',
            delay: 200,
            frames: this.anims.generateFrameNames('pen', { prefix: 'pen', start: 120, end: 179, zeroPad: 4 }),
            repeat: 0,
            // duration: 5000
        });
        this.anims.create({
            key: 'bear',
            delay: 200,
            frames: this.anims.generateFrameNames('bear', { prefix: 'bear', start: 0, end: 120, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'bear2',
            delay: 200,
            frames: this.anims.generateFrameNames('bear', { prefix: 'bear', start: 120, end: 179, zeroPad: 4 }),
            repeat: 0,
            // duration: 5000
        });
        this.anims.create({
            key: 'fat',
            delay: 200,
            frames: this.anims.generateFrameNames('fat', { prefix: 'fat', start: 0, end: 60, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
    }

    create() {
        super.create();
        this.bg_up_clo = this.add.sprite(this.getColWidth(4), this.getRowHeight(1), 'bg_up_clo');
        this.bg_up = this.add.sprite(this.getColWidth(6), this.getRowHeight(3), 'bg_up'),
            this.paintGameScene();
    }

    //绘制游戏页面
    paintGameScene() {
        this.fats = this.add.sprite(this.getColWidth(4.5), this.getRowHeight(4.5), 'fat');
        this.fats.play('fat');
        this.leoo = this.add.sprite(this.getColWidth(6), this.getRowHeight(4), 'leo');
        this.leoo.play('leo');
        this.awardPlatform = this.add.image(this.getColWidth(7.3), this.getRowHeight(5), 'award_platform');
        this.awardPlatform.setDisplaySize(250, 130)
        this.pens = this.add.sprite(this.getColWidth(7.15), this.getRowHeight(3.5), 'pen')
        this.pens.play('pen');
        this.bears = this.add.sprite(this.getColWidth(8.6), this.getRowHeight(3.8), 'bear');
        this.bears.play('bear');
        this.questionUi = this.add.layer();
        if (this.currentQuestionGroup[this.currentIndex].length <= 2) {

            this.bg_low = this.add.image(this.getColWidth(6), this.getRowHeight(8), 'bg_low');
            this.car1 = this.add.sprite(this.getColWidth(0.5), this.getRowHeight(7), 'green_carc');
            this.answersContainer = this.add.container(0, 0, [
                this.bg_low, this.paintQuesiton(), this.car1]);
            this.questionUi.add([this.bg_up, this.bg_up_clo, this.answersContainer, this.fats, this.leoo, this.awardPlatform, this.pens, this.bears,]);
        } else {
            console.log('asdf')
            this.bg_low = this.add.image(this.getColWidth(7.7), this.getRowHeight(8), 'bg_low_long');
            this.car1 = this.add.sprite(this.getColWidth(0.5), this.getRowHeight(7), 'green_carc');
            this.answersContainer = this.add.container(0, 0, [
                this.bg_low, this.paintQuesiton(), this.car1]);
            this.leftMoveButton = new LeftMoveButton(this, this.getColWidth(5), this.getRowHeight(10.7), this.answersContainer);
            this.rightMoveButton = new RightMoveButton(this, this.getColWidth(6), this.getRowHeight(10.7), this.answersContainer);
            this.questionUi.add([this.bg_up, this.bg_up_clo, this.answersContainer, this.leftMoveButton, this.rightMoveButton, this.fats, this.leoo, this.awardPlatform, this.pens, this.bears,]);
        }
        this.backgroundUi = this.add.layer(); //背景；
        this.exitBtn = new ExitBtn(this, 120, 135);
        this.btnCar = new BtnCar(this, this.getColWidth(9.5), this.getRowHeight(10.8), this.completeAnswerAnimation.bind(this));
        this.backgroundUi.add([this.exitBtn, this.btnCar]);
    }

    //绘制题目；
    paintQuesiton() {
        this.container = this.add.container(0, 0);
        let _width = 0;
        for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].length; i++) {
            if (this.container.length == 0) {
                this.container.add(new QuestionItem(this, 400, this.getRowHeight(8), this.currentQuestionGroup[this.currentIndex], i, this.selectAnswerRecord.bind(this)));
            } else {
                _width = _width + this.container.list[i - 1].roadText.width + 100;
                this.container.add(new QuestionItem(this, 400 + _width, this.getRowHeight(8), this.currentQuestionGroup[this.currentIndex], i, this.selectAnswerRecord.bind(this)))
            }
        }
        return this.container;
    }

    //答案选择；
    selectAnswerRecord(answer, index) {
        for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].length; i++) {
            if (this.currentQuestionGroup[this.currentIndex][index].type == answer.type) {
                this.currentQuestionGroup[this.currentIndex][index] = answer;
                console.log(this.currentQuestionGroup[this.currentIndex])
                if (this.currentQuestionGroup[this.currentIndex].every((item) => item.result != null)) { //答案选完；
                    this.btnCar.setBtnCarGlow();
                    this.container.list.forEach(element => {
                        element.setFramebtn(2)
                    })
                }
            }
        }
    }

    completeAnswerAnimation() {
        if (this.isBtn) {
            if (!this.currentQuestionGroup[this.currentIndex].every((item) => item.result != null)) {
                return;
            }
            for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].length; i++) {
                this.setFramebtn();
                if (this.currentQuestionGroup[this.currentIndex][i].result == false) {
                    this.isBtn = false;
                    if (i == 0) {
                        this.cat(this.container.list[i].x + this.container.list[i].width - 200, this.currentQuestionGroup[this.currentIndex][i]);
                    } else {
                        this.cat(this.container.list[i].x + this.container.list[i].width - 200, this.currentQuestionGroup[this.currentIndex][i]);
                    }
                    return;
                } else {
                    if (this.currentQuestionGroup[this.currentIndex].every((item) => item.result == true)) {
                        console.log(this.currentQuestionGroup[this.currentIndex].length >= 3);
                        if (this.currentQuestionGroup[this.currentIndex].length >= 3) {
                            this.tweens.add({
                                targets: this.answersContainer,
                                x: -500,
                                duration: 1500,
                                ease: 'Power2',
                            })
                        }
                        this.cat(this.bg_low.width, this.currentQuestionGroup[this.currentIndex][i]);
                        return;
                    }
                }
            }
        }
    }

    //校验标点符号对错颜色显示
    setFramebtn() {
        for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].length; i++) {
            if (this.currentQuestionGroup[this.currentIndex][i].result == false) {
                this.container.list[i].setFramebtn(4);
            } else {
                this.container.list[i].setFramebtn(3);
            }
        }
    }
    onCompleteHandler(tween, target, custom) { console.log('onCompleteHandler', tween, target, custom); }
    //车子行驶轨迹 
    cat(catx, item) {
        let music = this.sound.add('yes')
        music.setLoop(false)
        music.play()
        this.tweens.add({
            targets: this.car1,
            x: catx,
            duration: 2000,
            ease: 'Power2',
            onComplete: this.onCompleteHandler
        }).on('complete', () => { //车子走完执行方法；
            if (item.result == false) {
                console.log('撞车啦');
                let music = this.sound.add('wrong')
                music.setLoop(false)
                music.play()
                this.car1.play('pink_car_stop').once("animationcomplete", () => {
                    this.bears.play('bear2');
                    this.pens.play('pen2');
                    this.leoo.play('leo2').once("animationcomplete", () => {
                        this.car1.play('pink_car_run').once("animationcomplete", () => {
                            this.anewQuestion();
                        })
                    })
                });
            } else {
                this.currentQuestionGroup[this.currentIndex].forEach(element => {
                    console.log(element.type)
                    if (element.type != null) {
                        element.result = null;
                    }
                })
                this.isBtn = true;
                this.currentIndex++;
                if (this.currentIndex == this.currentQuestionGroup.length) {
                    console.log('已经答完5道题');
                    this.scene.start('End');
                    return;
                } else {
                    this.scene.start('Game', { number: this.currentIndex, currentQuestionGroup: this.currentQuestionGroup });
                }
            }
        });
    }

    //答案错误，重新答题；
    anewQuestion() {
        this.bears.play('bear');
        this.pens.play('pen');
        this.leoo.play('leo');
        this.car1.x = this.getColWidth(0.5);
        this.answersContainer.x = 0;
        let _question; //当前错误题型
        for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].length; i++) {
            this.container.list[i].resetting(3);
            console.log(this.container.list[i])
            _question = this.currentQuestionGroup[this.currentIndex][i].result = true; //更改题目全部为正确；
        }
        setTimeout(
            () => {
                console.log(this.currentQuestionGroup[this.currentIndex].length >= 3);
                if (this.currentQuestionGroup[this.currentIndex].length >= 3) {
                    this.tweens.add({
                        targets: this.answersContainer,
                        x: -500,
                        duration: 1500,
                        ease: 'Power2',
                    })
                }
                this.cat(this.bg_low.width, _question);//执行正确行驶轨迹
            }, 2000
        )
    }

}