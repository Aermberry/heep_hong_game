import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import BtnCar from '../objects/BtnCar'
import LeftMoveButton from '../objects/LeftMoveButton'
import RightMoveButton from '../objects/RightMoveButton'
import QuestionItem from "../objects/QuesitonItem"
import SpeakerBtn from '../objects/SpeakerBtn'
import SpeakerBtnOff from '../objects/SpeakerBtnOff'
import config from '../config/index';
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
        this.buildBg('loading');
        const imageFiles = {
            // 'end_bg': require('../assets/img/end_bg.png'),
            // 'end_box': require('../assets/img/end_box.png'),
            // 'tutor_bg': require('../assets/img/tut_bg.png'),
            'car1': require('../assets/img/car1.png'),
            'car2': require('../assets/img/car2.png'),
            'bg_low': require('../assets/img/bg_low2.png'),
            'bg_low_long': require('../assets/img/bg_low_long3.png'),
            'award_platform': require('../assets/img/123box.png'),
            'bg_up': require('../assets/img/bg_up1.png'),
            'bg_up_clo': require('../assets/img/bg_up_clo.png'),
        };

        const atlasFiles = {
            'tut_1': { img: require('../assets/img/tut_1.png'), data: require('../assets/img/tut_1.json') },
            'tut_2': { img: require('../assets/img/tut_2.png'), data: require('../assets/img/tut_2.json') },
            'tut_3': { img: require('../assets/img/tut_3.png'), data: require('../assets/img/tut_3.json') },
            'bear': { img: require('../assets/img/bear.png'), data: require('../assets/img/bear.json') },
            'cl1': { img: require('../assets/img/bg_up_cl1.png'), data: require('../assets/img/bg_up_cl1.json') },
            'cl2': { img: require('../assets/img/bg_up_cl2.png'), data: require('../assets/img/bg_up_cl2.json') },
            'fat': { img: require('../assets/img/fat.png'), data: require('../assets/img/fat.json') },
            'leo': { img: require('../assets/img/leo.png'), data: require('../assets/img/leo.json') },
            'pen': { img: require('../assets/img/pen.png'), data: require('../assets/img/pen.json') },
            'pink_car': { img: require('../assets/img/pink_car crush.png'), data: require('../assets/img/pink_car crush.json') },
            'green_carc': { img: require('../assets/img/green car crush.png'), data: require('../assets/img/green car crush.json') },

        }

        const soundFiles = {
            'Bgm': require('../assets/audio/Bgm.mp3'),
            'effect_select_teeth': require('../assets/audio/effect_select_teeth.mp3'),
            'End_pic': require('../assets/audio/End_pic.mp3'),
            'win': require('../assets/audio/win.mp3'),
            'wrong': require('../assets/audio/wrong.mp3'),
            'yes': require('../assets/audio/yes.mp3'),
            '201': require('../assets/audio/Game24.25_201.mp3'),
            '202': require('../assets/audio/Game24.25_202.mp3'),
            '203': require('../assets/audio/Game24.25_203.mp3'),
            '204': require('../assets/audio/Game24.25_204.mp3'),
            '205': require('../assets/audio/Game24.25_205.mp3'),
            '206': require('../assets/audio/Game24.25_206.mp3'),
            '207': require('../assets/audio/Game24.25_207_new.mp3'),
            '208': require('../assets/audio/Game24.25_208.mp3'),
            '209': require('../assets/audio/Game24.25_209.mp3'),
            '210': require('../assets/audio/Game24.25_210.mp3'),
            '211': require('../assets/audio/Game24.25_211_new.mp3'),
            '212': require('../assets/audio/Game24.25_212_new.mp3'),
            '213': require('../assets/audio/Game24.25_213.mp3'),
            '214': require('../assets/audio/Game24.25_214.mp3'),
            '215': require('../assets/audio/Game24.25_215.mp3'),
            '216': require('../assets/audio/Game24.25_216_new.mp3'),
            '217': require('../assets/audio/Game24.25_217.mp3'),
            '218': require('../assets/audio/Game24.25_218.mp3'),
            '219': require('../assets/audio/Game24.25_219.mp3'),
            '220': require('../assets/audio/Game24.25_220.mp3'),
        }
        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

        let self = this;
        self.progressBar = self.add.graphics();
        self.loadingText = self.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff'
            }
        });
        self.loadingText.setOrigin(0.5, 0.5);
    
        self.load.on('progress', function (value) {
          self.progressBar.clear();
          self.progressBar.fillStyle(0xFC8EFA, 1);
          self.progressBar.fillRect(config.width * 0.118, config.height * 0.92, (config.width * 0.778) * value, 10);
        });
    
        self.load.on('complete', function () {
          self.loadingText.setText('連接完成');
        }.bind(self));
    }

    create() {
        super.create();
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
        // this.sound.play('Bgm');
        let gameStage = this.dataModal.gameStage
        this.sys.game.globals.gtag.event(`game_${gameStage}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start' })
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
        if (this.stopAll) {
            this.sound.stopAll();
            this.speakerBtn.visible = true;
            this.speakerOffBtn.visible = false;
        } else {
            console.log('音乐播放')
            this.musicStart = this.sound.add('Bgm');
            this.musicStart.setLoop(true);
            this.musicStart.play();
            this.speakerBtn.visible = false;
            this.speakerOffBtn.visible = true;
            return;
        }
    }

    openSpeaker() {
        this.speakerBtn.visible = false;
        this.speakerOffBtn.visible = true;
        this.musicStart = this.sound.add('Bgm');
        this.musicStart.setLoop(true);
        this.musicStart.play();
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
            this.fats = this.add.sprite(this.getColWidth(4.5), this.getRowHeight(5.5), 'fat');
            this.fats.play('fat');
            this.leoo = this.add.sprite(this.getColWidth(6), this.getRowHeight(5), 'leo');
            this.leoo.play('leo');
            this.awardPlatform = this.add.image(this.getColWidth(7.3), this.getRowHeight(6), 'award_platform');
            this.awardPlatform.setDisplaySize(250, 130)
            this.pens = this.add.sprite(this.getColWidth(7.2), this.getRowHeight(4.5), 'pen')
            this.pens.play('pen');
            this.bears = this.add.sprite(this.getColWidth(8.6), this.getRowHeight(4.8), 'bear');
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
        this.exitBtn = new ExitBtn(this, 100, 120);
        this.btnCar = new BtnCar(this, this.getColWidth(9.5), this.getRowHeight(10.8), this.completeAnswerAnimation.bind(this));
        this.speakerBtn = new SpeakerBtn(this, 1820, 120, this.openSpeaker.bind(this));
        // this.speakerBtn.visible = false;
        this.speakerOffBtn = new SpeakerBtnOff(this, 1820, 120, this.offSpeaker.bind(this));
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
                    // this.container.list.forEach(element => {
                    //     element.setFramebtn(2)
                    // })
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
                            this.sound.stopAll();
                            this.scene.start('Game', { number: this.currentIndex, currentQuestionGroup: this.currentQuestionGroup, stopAll: this.stopAll });
                        }

                    }, this.currentQuestionGroup[this.currentIndex].seconds
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