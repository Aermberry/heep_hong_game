import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import SpeakerBtn from '../objects/SpeakerBtn'
import Answers from "../objects/Answers";
import AnswerBox from "../objects/AnswerBox";
import EndBroad from '../objects/EndGameBroad'
export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game',
        });

    }

    init(data) {
        this.dataModal = this.sys.game.globals.model;
        this.currentIndex = data.number;
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
            frames: this.anims.generateFrameNames('bear_job', { prefix: 'bear1', start: 0, end: 33, zeroPad: 4 }),
            repeat: -1,
            duration: 5000
        });
        this.anims.create({
            key: 'wrong',
            delay: 200,
            frames: this.anims.generateFrameNames('wrong', { prefix: 'wrong', start: 0, end: 24, zeroPad: 4 }),
            // repeat: 1
        });
        this.anims.create({
            key: 'yes',
            delay: 200,
            frames: this.anims.generateFrameNames('yes', { prefix: 'yes', start: 0, end: 24, zeroPad: 4 }),
            // repeat: 1
            duration: 500
        });
        this.anims.create({
            key: 'house_b',
            delay: 200,
            frames: this.anims.generateFrameNames('house_b', { prefix: 'house_b', start: 0, end: 24, zeroPad: 4 }),
            // repeat: 1
            duration: 2000
        });
        this.anims.create({
            key: 'house_a',
            delay: 200,
            frames: this.anims.generateFrameNames('house_a', { prefix: 'house_a', start: 0, end: 24, zeroPad: 4 }),
            // repeat: 1
            duration: 2000
        });
    }

    create() {
        super.create();
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('one_0_short');
            this.music.setLoop(true);
            this.music.play();
        }

        this.buildBg('bg')
        let exitBtn = new ExitBtn(this, 120, 135);
        let speakerBtn = new SpeakerBtn(this, this.getColWidth(11), 135, this.musicPause.bind(this));
        this.bear_job = this.add.sprite(this.getColWidth(8.7), this.getRowHeight(5.8), 'bear_job');
        this.bear_job.play('bearJob');
        this.add.image(this.getColWidth(3.8), this.getRowHeight(8.5), 'home');
        this.answers = new Answers(this, this.getColWidth(7.8), this.getRowHeight(6), this.currentQuestionGroup[this.currentIndex], this.CompleteAnswerAnimation.bind(this));
        this.AnswerBox1 = new AnswerBox(this, this.getColWidth(2.6), this.getRowHeight(7.8),);
        this.AnswerBox2 = new AnswerBox(this, this.getColWidth(5.09), this.getRowHeight(7.8),);
        this.add.existing(this.AnswerBox1);
        this.add.existing(this.AnswerBox2);
        this.add.existing(this.answers)
        this.add.existing(exitBtn);
        this.add.existing(speakerBtn);
    }


    musicPause() {
        this.stopAll = !this.stopAll;
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('one_0_short');
            this.music.setLoop(true);
            this.music.play();
        }
    }

    CompleteAnswerAnimation() {
        this.currentIndex++;
        let house_a = this.add.sprite(this.getColWidth(2.6), this.getRowHeight(5.7), 'house_a');
        let house_b = this.add.sprite(this.getColWidth(5.11), this.getRowHeight(5.7), 'house_b');
        house_a.play('house_a');
        house_b.play('house_b').on('animationcomplete', () => {
            setTimeout(
                () => {
                    if (this.currentIndex == this.currentQuestionGroup.length) {
                        this.music.pause();
                        this.bear_job.stop();
                        this.endBroad = new EndBroad(this, this.getColWidth(6), this.getRowHeight(6)).setDepth(50)
                        this.add.existing(this.endBroad)
                        return;
                    } else {
                        this.scene.start('Game', { number: this.currentIndex, currentQuestionGroup: this.currentQuestionGroup, stopAll: this.stopAll });
                    }
                }, 1000
            )
        });
    }

}