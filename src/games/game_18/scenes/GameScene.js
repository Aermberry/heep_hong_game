import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import SpeakerBtn from '../objects/SpeakerBtn'
import SpeakerBtnOff from '../objects/SpeakerBtnOff'
import Done from '../objects/Done'
import Answers from "../objects/Answers";
import AnswerBox from "../objects/AnswerBox";
// import EndBroad from '../objects/EndGameBroad'
export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game',
        });

    }

    init(data) {
        this.dataModal = this.sys.game.globals.model;
        console.log(this.dataModal);
        this.currentIndex = data.number;
        console.log(data.stopAll)
        this.stopAll = data.stopAll;
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
            key: 'bearJob',
            delay: 200,
            frames: this.anims.generateFrameNames('bear_job', { prefix: 'bear1', start: 0, end: 12, zeroPad: 4 }),
            repeat: -1,
            duration: 5000
        });
        this.anims.create({
            key: 'wrong',
            delay: 100,
            frames: this.anims.generateFrameNames('wrong', { prefix: 'wrong', start: 0, end: 24, zeroPad: 4 }),
            // repeat: 1
            duration: 1000
        });
        this.anims.create({
            key: 'yes',
            delay: 100,
            frames: this.anims.generateFrameNames('yes', { prefix: 'yes', start: 0, end: 24, zeroPad: 4 }),
            // repeat: 1
            duration: 1000
        });
        this.anims.create({
            key: 'house_b',
            delay: 200,
            frames: this.anims.generateFrameNames('house_b', { prefix: 'house_b', start: 0, end: 9, zeroPad: 4 }),
            // repeat: 1
            duration: 2000
        });
        this.anims.create({
            key: 'house_a',
            delay: 200,
            frames: this.anims.generateFrameNames('house_a', { prefix: 'house_a', start: 0, end: 13, zeroPad: 4 }),
            // repeat: 1
            duration: 2000
        });
        this.anims.create({
            key: 'remind',
            delay: 200,
            frames: this.anims.generateFrameNames('remind', { prefix: 'remind1', start: 0, end: 9, zeroPad: 4 }),
            repeat: -1,
            duration: 500
        });

        // this.cursorHandIcon = { img: require('../assets/yes.png'), data: require('../assets/yes.json') }
    }

    create() {
        super.create();
        this.musicStart = this.sound.add('Bgm',{volume:0.3});
        let gameStage = this.dataModal.gameStage
        this.sys.game.globals.gtag.event(`game_${gameStage}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start' })

        this.buildBg('bg')
        this.exitBtn = new ExitBtn(this, 100, 120);
        this.speakerBtn = new SpeakerBtn(this, 1820, 120, this.openSpeaker.bind(this));
        // this.speakerBtn.visible = false;
        this.speakerOffBtn = new SpeakerBtnOff(this, 1820, 120, this.offSpeaker.bind(this));
        this.bearW = this.add.sprite(this.getColWidth(9), this.getRowHeight(5.8), 'bearW');
        this.bear_job = this.add.sprite(this.getColWidth(9), this.getRowHeight(2.2), 'bear_job');
        this.bear_job.play('bearJob');
        this.add.image(this.getColWidth(3.8), this.getRowHeight(8.5), 'home');
        this.answers = new Answers(this, this.getColWidth(7.75), this.getRowHeight(5.8), this.currentQuestionGroup[this.currentIndex].data, this.CompleteAnswerAnimation.bind(this));
        this.AnswerBox1 = new AnswerBox(this, this.getColWidth(2.6), this.getRowHeight(7.8),);
        this.AnswerBox2 = new AnswerBox(this, this.getColWidth(5.09), this.getRowHeight(7.8),);
        this.done = new Done(this, this.getColWidth(9.5), this.getRowHeight(11), this.completeGame.bind(this))
        this.add.existing(this.AnswerBox1);
        this.add.existing(this.AnswerBox2);
        this.add.existing(this.answers)
        this.add.existing(this.exitBtn);
        this.add.existing(this.speakerBtn);
        this.add.existing(this.speakerOffBtn);
        this.add.existing(this.done)

        if (this.stopAll) {
            this.musicStart.stop();
            this.speakerBtn.visible = true;
            this.speakerOffBtn.visible = false;
        } else {
            this.musicStart.setLoop(true);
            this.musicStart.play();
            this.speakerBtn.visible = false;
            this.speakerOffBtn.visible = true;
        }
        let build = this.sound.add('build',{volume:0.3})
        build.play();
    }


    openSpeaker() {
        this.speakerBtn.visible = false;
        this.speakerOffBtn.visible = true;
        this.musicStart.setLoop(true);
        this.musicStart.play();
        this.stopAll = false;
    }

    offSpeaker() {
        this.speakerBtn.visible = true;
        this.speakerOffBtn.visible = false;
        this.stopAll = true;
        this.musicStart.stop();
    }

    completeGame() {
        this.answers.completeGame();
    }

    CompleteAnswerAnimation(state, errorNumber) {
        if (state) {
            let houseNameList = ['house_a', 'house_b'];
            let houseName = houseNameList[Math.floor((Math.random() * houseNameList.length))];
            let house = this.add.sprite(houseName == 'house_a' ? this.getColWidth(3.8) : this.getColWidth(4), this.getRowHeight(3.7), houseName);
            let yes = this.add.sprite(this.getColWidth(3.8), this.getRowHeight(3.7), 'yes');
            yes.setDisplaySize(900, 400);
            let music = this.sound.add('yesAudio')
            music.setLoop(false)
            music.play();
            house.setDisplaySize(900, 800)
            yes.play('yes');
            house.play(houseName).on('animationcomplete', () => {
                this.sound.play(this.currentQuestionGroup[this.currentIndex].audio);
                this.currentIndex++;
                setTimeout(
                    () => {
                        if (this.currentIndex == this.currentQuestionGroup.length) {
                            // this.musicStart.pause();
                            // this.bear_job.stop();
                            this.sound.stopAll();
                            // this.answers.setviser();
                            // this.exitBtn.visible = false;
                            // this.speakerBtn.visible = false;
                            // // this.speakerBtn.visible = false;
                            // this.speakerOffBtn.visible = false;
                            // house.visible = false;
                            this.scene.start('End');
                            // this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6)).setDepth(50)
                            // this.add.existing(this.endBroad)
                            // let gameStage = this.sys.game.globals.model.gameStage;
                            // this.sys.game.globals.gtag.event(`game_${gameStage}_end`, { 'event_category': 'js_games', 'event_label': 'Game End' })
                            return;
                        } else {
                            this.sound.stopAll();
                            this.scene.start('Game', { number: this.currentIndex, currentQuestionGroup: this.currentQuestionGroup, stopAll: this.stopAll });
                        }
                    }, 6000
                )
            });
        } else {
            let wrong = this.add.sprite(this.getColWidth(3.8), this.getRowHeight(5.7), 'wrong');
            wrong.setDisplaySize(900, 400);
            let music = this.sound.add('wrongAudio')
            music.setLoop(false)
            music.play();
            console.log(errorNumber)
            if (errorNumber == 2) {
                this.currentIndex++;
                wrong.play('wrong').on('animationcomplete', () => {
                    setTimeout(
                        () => {
                            if (this.currentIndex == this.currentQuestionGroup.length) {
                                // let gameStage = this.dataModal.gameStage
                                // this.sys.game.globals.gtag.event(`game_${gameStage}_end`, { 'event_category': 'js_games', 'event_label': 'Game End' })
                                // this.music.pause();
                                // this.bear_job.stop();
                                this.sound.stopAll();
                                // this.answers.setviser();
                                // this.exitBtn.visible = false;
                                // this.speakerBtn.visible = false;
                                // // this.speakerBtn.visible = false;
                                // this.speakerOffBtn.visible = false;
                                this.scene.start('End');
                                return;
                            } else {
                                this.sound.stopAll();
                                this.scene.start('Game', { number: this.currentIndex, currentQuestionGroup: this.currentQuestionGroup, stopAll: this.stopAll });
                            }
                        }, 1000
                    )
                });
            } else {
                wrong.play('wrong').on('animationcomplete', () => {
                    setTimeout(
                        () => {
                            this.answers.answerError();
                        }, 1000
                    )

                });
            }
            // let wrong = this.add.sprite(this.getColWidth(3.8), this.getRowHeight(3.7), 'wrong');
            // wrong.setDisplaySize(900,800)
        }
    }

}