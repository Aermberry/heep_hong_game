import BasicScene from "./BasicScene"
import ExitButton from '../components/ExitProgressGameButton'
import {
    createEggTwistingMachineAnimation
} from '../assets/animations/EggTwistingMachineAnimation';
import {
    createStarAnimation
} from '../assets/animations/StarAnimation';
import GameSprite from '../components/GameSprite';
import GameManager from '../components/GameManager';
import AnswerArea from "../components/AnswerArea";

export default class GameScene extends BasicScene {

    constructor() {
        super('Game');

        this.gameLayer = undefined
        this.questionNumberList = []

        this.questionIndex = undefined
        this.uiLayer = undefined
        this.gameFailedLayer = undefined
        this.hasGameChance = undefined;
        this.answerArea = undefined;

        this.currentQuestionAnswer = undefined
    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
    }

    create() {

        super.create();

        this.sound.stopAll();

        createEggTwistingMachineAnimation(this.anims);
        createStarAnimation(this.anims);
        this.paintGameScene(this);

        this.playBackgroundMusic('gamePlaySceneBGM');
    }

    playBackgroundMusic(backgroundSound) {

        const backgroundMusic = this.sound.add(backgroundSound, {
            volume: 0.2,
            loop: true
        });
        backgroundMusic.play();
    }

    /**
     * generate a question from the local question data
     * 从题库中随机抽取一道题目
     */
    generateQuestion() {

        let question = null;
        let errorQuestionIndex = JSON.parse(localStorage.getItem('errorQuestionIndex'));

        if (errorQuestionIndex == null) {
            this.questionIndex = GameManager.getInstance().generateGameQuestionIndex();
            this.hasGameChance = false;

        } else {

            if (JSON.parse(localStorage.getItem('gameChance'))) {
                this.questionIndex = errorQuestionIndex;
                this.hasGameChance = true;
            }

        }

        question = JSON.parse(localStorage.getItem(this.questionIndex));

        // question = JSON.parse(localStorage.getItem(12));
        // this.questionIndex=12;
        // console.log("当前抽取的题目:%o", question);

        this.currentQuestionAnswer = question.answer;

        return question;
    }
    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
     */
    paintGameScene() {

        this.gameLayer = this.add.layer().setDepth(1);
        this.uiLayer = this.add.layer().setDepth(0);

        this.answerArea = new AnswerArea(this, this.generateQuestion());

        let eggTwistingMachineSprite = new GameSprite(this, 960, 540, 'eggTwistingMachineTexture');

        if (this.hasGameChance == undefined) {
            this.playEggAnimation(eggTwistingMachineSprite, this.answerArea, this.questionIndex);
        } else {
            if (this.hasGameChance) {
                this.add.image(583, 372, 'questionPicture' + this.questionIndex).setScale(0.5);
                this.answerArea.showDisplay();
            }
            else {
                this.playEggAnimation(eggTwistingMachineSprite, this.answerArea, this.questionIndex);
            }
        }



        let exitButton = new ExitButton(this, 120, 135);

        this.uiLayer.add([this.buildBg('backgroundGamePlay'), eggTwistingMachineSprite]);
        this.gameLayer.add([exitButton, this.answerArea]);
    }


    playEggAnimation(eggTwistingMachineSprite, answerArea, questionIndex) {

        const colorEgg = GameManager.getInstance().getRandomColorEgg();

        let eggSprite = new GameSprite(this, 400, 720, colorEgg.name);
        eggSprite.setScale(0.5);

        const shape = this.make.graphics();
        shape.fillStyle(0xffffff);
        shape.beginPath();
        shape.fillRect(100, 870, 500, 600);

        const mask = shape.createGeometryMask();
        eggSprite.setMask(mask);
        const ballSpinEffectSound = this.sound.add('ballSpinEffectSound');
        ballSpinEffectSound.play();
        this.cameras.main.setBounds(0, 0, 20, 80);
        eggTwistingMachineSprite.on("animationcomplete", () => {
            this.add.tween({
                targets: this.cameras.main.setOrigin(0, 1),
                x: 0,
                zoom: 2.6,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    ballSpinEffectSound.stop();
                    this.add.tween({
                        targets: eggSprite,
                        y: 1200,
                        angle: 60,
                        duration: 2000,
                        ease: 'Power2',
                        onComplete: () => {
                            this.add.tween({
                                targets: this.cameras.main.setOrigin(0, 1),
                                x: 0,
                                zoom: 1,
                                duration: 5000,
                                ease: 'Power2',
                                onComplete: () => {

                                }
                            });
                            answerArea.showAnswerPanelAnimation(this);
                            const questionPicture = this.add.image(583, 372, 'questionPicture' + questionIndex).setScale(0.5);
                            const eggStatus = this.add.image(1500, 700, colorEgg.status).setScale(0.5);

                            this.uiLayer.add([questionPicture, eggSprite, eggStatus]);
                        }
                    });
                }
            });
        });

        eggTwistingMachineSprite.play('eggTwistingMachineAnimation');

    }

    paintGameSuccess() {
        GameManager.getInstance().updateGameQuestionNumberList(this.questionIndex);
        GameManager.getInstance().updateGamePlayTotal((value) => {
            this.time.addEvent({
                delay: 10000,
                callback: () => this.scene.start(value ? 'Game' : 'End')
            })
        });


        this.sound.play('answerCorrectEffectSound');
        this.sound.play('gameWinEffectSound')
        this.sound.play('voice'+this.questionIndex);
    }


    paintGameFailed() {

        let _isFirstError = null;

        GameManager.getInstance().setGameQuestionError(this.questionIndex, (isFirstError, value) => {

            _isFirstError = isFirstError;
            console.log({ isLastQuestion: value })
            this.time.addEvent({
                delay: isFirstError ? 2000 : 10000,
                callback: () => value ? this.scene.start('End') : this.scene.restart('Game')
            });
        }
        );

        this.sound.play('answerErrorEffectSound');
        if (!_isFirstError) {
            this.sound.play('gameLoseEffectSound');
            this.answerArea.showCurrentAnswer(this,this.questionIndex);
        }
    }


}