import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import BtnCar from '../objects/BtnCar'
import LeftMoveButton from '../objects/LeftMoveButton'
import RightMoveButton from '../objects/RightMoveButton'
import QuestionItem from "../objects/QuesitonItem"
import SpeakerBtn from '../objects/SpeakerBtn'
import SpeakerBtnOff from '../objects/SpeakerBtnOff'
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
        console.log(this.currentQuestionGroup);
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
        this.anims.create({
            key: 'cl1',
            delay: 200,
            frames: this.anims.generateFrameNames('cl1', { prefix: 'cl1', start: 0, end: 36, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'cl2',
            delay: 200,
            frames: this.anims.generateFrameNames('cl2', { prefix: 'cl2', start: 0, end: 36, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'leo',
            delay: 200,
            frames: this.anims.generateFrameNames('leo', { prefix: 'leoo', start: 0, end: 24, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'leo2',
            delay: 200,
            frames: this.anims.generateFrameNames('leo', { prefix: 'leoo', start: 25, end: 48, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'leo3',
            delay: 200,
            frames: this.anims.generateFrameNames('leo', { prefix: 'leoo', start: 49, end: 75, zeroPad: 4 }),
            repeat: 0,
            // duration: 5000
        });
        this.anims.create({
            key: 'pen',
            delay: 200,
            frames: this.anims.generateFrameNames('pen', { prefix: 'pen', start: 0, end: 24, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'pen2',
            delay: 200,
            frames: this.anims.generateFrameNames('pen', { prefix: 'pen', start: 25, end: 48, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'pen3',
            delay: 200,
            frames: this.anims.generateFrameNames('pen', { prefix: 'pen', start: 49, end: 76, zeroPad: 4 }),
            repeat: 0,
            // duration: 5000
        });
        this.anims.create({ //开车前
            key: 'bear',
            delay: 200,
            frames: this.anims.generateFrameNames('bear', { prefix: 'bear', start: 0, end: 24, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({ //开车后
            key: 'bear2',
            delay: 200,
            frames: this.anims.generateFrameNames('bear', { prefix: 'bear', start: 25, end: 48, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({ //撞车车后
            key: 'bear3',
            delay: 200,
            frames: this.anims.generateFrameNames('bear', { prefix: 'bear', start: 49, end: 72, zeroPad: 4 }),
            repeat: 0,
            // duration: 5000
        });
        this.anims.create({
            key: 'fat',
            delay: 200,
            frames: this.anims.generateFrameNames('fat', { prefix: 'fat', start: 0, end: 24, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'fat2',
            delay: 200,
            frames: this.anims.generateFrameNames('fat', { prefix: 'fat', start: 25, end: 48, zeroPad: 4 }),
            repeat: -1,
            // duration: 5000
        });
        this.anims.create({
            key: 'fat3',
            delay: 200,
            frames: this.anims.generateFrameNames('fat', { prefix: 'fat', start: 49, end: 77, zeroPad: 4 }),
            repeat: 0,
            // duration: 5000
        });
    }

    create() {
        super.create();
        this.sound.play('Bgm');
        this.bg_up_cl1 = this.add.sprite(this.getColWidth(5), this.getRowHeight(1), 'cl1');
        this.bg_up_cl1.play('cl1');
        this.bg_up_cl1_1 = this.add.sprite(this.getColWidth(9), this.getRowHeight(1.2), 'cl1');
        this.bg_up_cl1_1.play('cl1');
        this.bg_up_cl1_2 = this.add.sprite(this.getColWidth(3), this.getRowHeight(3), 'cl1');
        this.bg_up_cl1_2.play('cl1');
        this.bg_up_cl1_3 = this.add.sprite(this.getColWidth(10), this.getRowHeight(2.5), 'cl1');
        this.bg_up_cl1_3.play('cl1');
        this.bg_up_cl2 = this.add.sprite(this.getColWidth(2), this.getRowHeight(1), 'cl2');
        this.bg_up_cl2.play('cl2');
        this.bg_up_cl2_1 = this.add.sprite(this.getColWidth(7.5), this.getRowHeight(2.2), 'cl2');
        this.bg_up_cl2_1.play('cl2');
        this.bg_up = this.add.sprite(this.getColWidth(6), this.getRowHeight(3), 'bg_up'),
            this.paintGameScene();
    }

    openSpeaker() {
        this.speakerBtn.visible = false;
        this.speakerOffBtn.visible = true;
        this.sound.play('Bgm');
        this.stopAll = false;
    }

    offSpeaker() {
        this.speakerBtn.visible = true;
        this.speakerOffBtn.visible = false;
        this.stopAll = true;
        this.sound.stopAll();
    }

    //绘制游戏页面
    paintGameScene() {
        this.questionUi = this.add.layer();
        this.car1 = this.add.sprite(this.getColWidth(0.5), this.getRowHeight(7), 'green_carc');
        this.car1.setDepth(100)
        if (this.currentQuestionGroup[this.currentIndex].data.length <= 2) {
            this.fats = this.add.sprite(this.getColWidth(4.5), this.getRowHeight(5), 'fat');
            this.fats.play('fat');
            this.leoo = this.add.sprite(this.getColWidth(6), this.getRowHeight(4.5), 'leo');
            this.leoo.play('leo');
            this.awardPlatform = this.add.image(this.getColWidth(7.3), this.getRowHeight(5.5), 'award_platform');
            this.awardPlatform.setDisplaySize(250, 130)
            this.pens = this.add.sprite(this.getColWidth(7.2), this.getRowHeight(4), 'pen')
            this.pens.play('pen');
            this.bears = this.add.sprite(this.getColWidth(8.6), this.getRowHeight(4.3), 'bear');
            this.bears.play('bear');
            this.bg_low = this.add.image(this.getColWidth(6), this.getRowHeight(8), 'bg_low');
            this.answersContainer = this.add.container(0, 0, [
                this.bg_low, this.paintQuesiton(), this.fats, this.leoo, this.awardPlatform, this.pens, this.bears,]);
            this.questionUi.add([this.bg_up, this.answersContainer, this.bg_up_cl1, this.bg_up_cl1_1, this.bg_up_cl1_2, this.bg_up_cl1_3, this.bg_up_cl2, this.bg_up_cl2_1, this.car1]);
        } else {
            this.fats = this.add.sprite(this.getColWidth(10.5), this.getRowHeight(5.5), 'fat');
            this.fats.play('fat');
            this.leoo = this.add.sprite(this.getColWidth(12), this.getRowHeight(5), 'leo');
            this.leoo.play('leo');
            this.awardPlatform = this.add.image(this.getColWidth(13.3), this.getRowHeight(6), 'award_platform');
            this.awardPlatform.setDisplaySize(250, 130)
            this.pens = this.add.sprite(this.getColWidth(13.2), this.getRowHeight(4.5), 'pen')
            this.pens.play('pen');
            this.bears = this.add.sprite(this.getColWidth(14.6), this.getRowHeight(4.8), 'bear');
            this.bears.play('bear');
            this.bg_low = this.add.image(this.getColWidth(8.9), this.getRowHeight(8), 'bg_low_long');
            this.answersContainer = this.add.container(0, 0, [
                this.bg_low, this.paintQuesiton(), this.fats, this.leoo, this.awardPlatform, this.pens, this.bears, this.car1]);
            this.leftMoveButton = new LeftMoveButton(this, this.getColWidth(5), this.getRowHeight(10.7), this.answersContainer);
            this.rightMoveButton = new RightMoveButton(this, this.getColWidth(6), this.getRowHeight(10.7), this.answersContainer);
            this.questionUi.add([this.bg_up, this.answersContainer, this.bg_up_cl1, this.bg_up_cl1_1, this.bg_up_cl1_2, this.bg_up_cl1_3, this.bg_up_cl2, this.bg_up_cl2_1, this.leftMoveButton, this.rightMoveButton]);
        }
        this.backgroundUi = this.add.layer(); //背景；
        this.exitBtn = new ExitBtn(this, 120, 135);
        this.btnCar = new BtnCar(this, this.getColWidth(9.5), this.getRowHeight(10.8), this.completeAnswerAnimation.bind(this));
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.3), 125, this.openSpeaker.bind(this));
        // this.speakerBtn.visible = false;
        this.speakerOffBtn = new SpeakerBtnOff(this, this.getColWidth(11.3), 125, this.offSpeaker.bind(this));
        if (this.stopAll) {
            this.sound.stopAll();
            this.speakerBtn.visible = true;
            this.speakerOffBtn.visible = false;
        } else {
            this.sound.play('Bgm');
            this.speakerBtn.visible = false;
            this.speakerOffBtn.visible = true;
        }
        this.backgroundUi.add([this.exitBtn, this.btnCar, this.speakerBtn, this.speakerOffBtn]);
    }

    //绘制题目；
    paintQuesiton() {
        this.container = this.add.container(0, 0);
        let _width = 0;
        for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].data.length; i++) {
            if (this.container.length == 0) {
                this.container.add(new QuestionItem(this, 400, this.getRowHeight(8), this.currentQuestionGroup[this.currentIndex].data, i, this.selectAnswerRecord.bind(this)));
            } else {
                if (this.currentQuestionGroup[this.currentIndex].data.length <= 3) {
                    _width = _width + this.container.list[i - 1].roadText.width + 150;
                } else {
                    _width = _width + this.container.list[i - 1].roadText.width + 200;
                }
                this.container.add(new QuestionItem(this, 400 + _width, this.getRowHeight(8), this.currentQuestionGroup[this.currentIndex].data, i, this.selectAnswerRecord.bind(this)))
            }
        }
        return this.container;
    }

    //答案选择；
    selectAnswerRecord(answer, index) {
        for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].data.length; i++) {
            if (this.currentQuestionGroup[this.currentIndex].data[index].type == answer.type) {
                this.currentQuestionGroup[this.currentIndex].data[index] = answer;
                console.log(this.currentQuestionGroup[this.currentIndex])
                if (this.currentQuestionGroup[this.currentIndex].data.every((item) => item.result != null)) { //答案选完；
                    this.btnCar.setIsBtn();
                    this.container.list.forEach(element => {
                        element.setFramebtn(2)
                    })
                }
            }
        }
    }

    completeAnswerAnimation() {
        if (this.isBtn) {
            if (!this.currentQuestionGroup[this.currentIndex].data.every((item) => item.result != null)) {
                return;
            }
            this.bears.play('bear2');
            this.fats.play('fat2');
            this.pens.play('pen2');
            this.leoo.play('leo2')
            for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].data.length; i++) {
                this.setFramebtn();
                if (this.currentQuestionGroup[this.currentIndex].data[i].result == false) {
                    this.isBtn = false;
                    if (i == 0) {
                        this.cat(this.container.list[i].x + this.container.list[i].width - 200, this.currentQuestionGroup[this.currentIndex].data[i]);
                    } else {
                        this.cat(this.container.list[i].x + this.container.list[i].width - 200, this.currentQuestionGroup[this.currentIndex].data[i]);
                    }
                    return;
                } else {
                    if (this.currentQuestionGroup[this.currentIndex].data.every((item) => item.result == true)) {
                        console.log(this.currentQuestionGroup[this.currentIndex].data.length >= 3);
                        if (this.currentQuestionGroup[this.currentIndex].data.length >= 3) {
                            this.tweens.add({
                                targets: this.answersContainer,
                                x: -1000,
                                duration: 1500,
                                ease: 'Power2',
                            })
                        }
                        this.cat(this.bg_low.width + 200, this.currentQuestionGroup[this.currentIndex].data[i]);
                        return;
                    }
                }
            }
        }
    }

    //校验标点符号对错颜色显示
    setFramebtn() {
        for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].data.length; i++) {
            if (this.currentQuestionGroup[this.currentIndex].data[i].result == false) {
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
                let wrong = this.sound.add('wrong')
                wrong.setLoop(false)
                wrong.play()
                this.car1.play('pink_car_stop').once("animationcomplete", () => {
                    this.bears.play('bear3');
                    this.fats.play('fat3');
                    this.pens.play('pen3');
                    this.leoo.play('leo3').once("animationcomplete", () => {
                        this.car1.play('pink_car_run').once("animationcomplete", () => {
                            this.anewQuestion();
                        })
                    })
                });
            } else {
                this.sound.play('win');
                this.sound.play(this.currentQuestionGroup[this.currentIndex].audio);
                setTimeout(
                    () => {
                        this.currentQuestionGroup[this.currentIndex].data.forEach(element => {
                            if (element.type != null) {
                                element.result = null;
                            }
                        })
                        this.isBtn = true;
                        this.currentIndex++;
                        if (this.currentIndex == this.currentQuestionGroup.length) {
                            console.log('已经答完5道题');
                            this.sound.stopAll();
                            this.scene.start('End');
                            return;
                        } else {
                            this.scene.start('Game', { number: this.currentIndex, currentQuestionGroup: this.currentQuestionGroup, stopAll: this.stopAll });
                        }

                    }, 12000
                )
            }
        });
    }

    //答案错误，重新答题；
    anewQuestion() {
        this.pens.play('pen2');
        this.leoo.play('leo2');
        this.bears.play('bear2');
        this.fats.play('fat2')
        this.car1.x = this.getColWidth(0.5);
        this.answersContainer.x = 0;
        let _question; //当前错误题型
        for (let i = 0; i < this.currentQuestionGroup[this.currentIndex].data.length; i++) {
            this.container.list[i].resetting(3);
            console.log(this.container.list[i])
            _question = this.currentQuestionGroup[this.currentIndex].data[i].result = true; //更改题目全部为正确；
        }
        setTimeout(
            () => {
                console.log(this.currentQuestionGroup[this.currentIndex].data.length >= 3);
                if (this.currentQuestionGroup[this.currentIndex].data.length >= 3) {
                    this.tweens.add({
                        targets: this.answersContainer,
                        x: -1000,
                        duration: 1500,
                        ease: 'Power2',
                    })
                }
                this.cat(this.bg_low.width + 200, _question);//执行正确行驶轨迹
            }, 2000
        )
    }

}