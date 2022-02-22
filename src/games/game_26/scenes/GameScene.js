import {
    createEggTwistingMachineAnimation
} from '../assets/animations/EggTwistingMachineAnimation';
import {
    createStarAnimation
} from '../assets/animations/StarAnimation';
import AnswerArea from "../components/AnswerArea";
import GameManager from '../components/GameManager';
import GameSprite from '../components/GameSprite';
import LoadProgress from "../components/LoadProgress";
import BasicScene from "./BasicScene";

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

        this.buildBg('backgroundGamePlay');
        this.progressLoader = new LoadProgress(this);

        const soundFiles = {
            "voice0":require("../assets/audio/voice/0.mp3"),
            "voice1":require("../assets/audio/voice/1.mp3"),
            "voice2":require("../assets/audio/voice/2.mp3"),
            "voice3":require("../assets/audio/voice/3.mp3"),
            "voice4":require("../assets/audio/voice/4.mp3"),
            "voice5":require("../assets/audio/voice/5.mp3"),
            "voice6":require("../assets/audio/voice/6.mp3"),
            "voice7":require("../assets/audio/voice/7.mp3"),
            "voice8":require("../assets/audio/voice/8.mp3"),
            "voice9":require("../assets/audio/voice/9.mp3"),
            "voice10":require("../assets/audio/voice/10.mp3"),
            "voice11":require("../assets/audio/voice/11.mp3"),
            "voice12":require("../assets/audio/voice/12.mp3"),
            "voice13":require("../assets/audio/voice/13.mp3"),
            "voice14":require("../assets/audio/voice/14.mp3"),
            "voice15":require("../assets/audio/voice/15.mp3"),
            "voice16":require("../assets/audio/voice/16.mp3"),
            "voice17":require("../assets/audio/voice/17.mp3"),
            "voice18":require("../assets/audio/voice/18.mp3"),
            "voice19":require("../assets/audio/voice/19.mp3"),
        }
        this.preloadFromArr({ sound: soundFiles });
    }

    create() {

        super.create();

        this.sys.game.globals.gtag.event(`game_${this.sys.game.globals.gameStageIndex}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start' });

        createEggTwistingMachineAnimation(this.anims);
        createStarAnimation(this.anims);

        this.paintGameScene();

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


        this.uiLayer.add([this.buildBg('backgroundGamePlay'), eggTwistingMachineSprite]);
        this.gameLayer.add([this.answerArea]);
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
        this.cameras.main.setSize(2180, 1080)
        eggTwistingMachineSprite.on("animationcomplete", () => {
            this.add.tween({
                targets: this.cameras.main.setOrigin(0, 1),
                x: -260,
                zoom: 2.8,
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
                                    this.cameras.main.setSize(1920, 1080)
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
        this.sound.play('voice' + this.questionIndex);
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
            this.answerArea.showCurrentAnswer(this, this.questionIndex);
        }
    }


}