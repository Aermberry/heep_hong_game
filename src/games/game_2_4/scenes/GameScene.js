import BasicScene from "./BasicScene"
import ExitButton from '../components/ExitProgressGameButton'
import GameManager from '../components/GameManager';
import {
    createLionLeftRecorderAnimation
} from "../assets/animations/LionLeftRecorderAnimation";
import GameSprite from "../components/GameSprite";
import {
    createPenguinAnimation
} from "../assets/animations/PenguinAnimation";
import EggItem from "../components/EggItem";
import EggQuestion from "../components/EggQuestion";
import ClawBox from "../components/ClawBox";
import ComposeSprite from "../components/ComposeSprite";
import Phaser from "phaser";


export default class GameScene extends BasicScene {

    constructor() {
        super('Game');

        this.uiLayer = undefined;
        this.gameLayer = undefined;

        this.questionIndex = undefined;
        this.questionNumberList = [];

        this.answerArea = undefined;
        this.hasGameChance = undefined;
        this.currentQuestionAnswer = undefined;
        this.questionDisplayDirection = undefined;
        this.positions = undefined;
        this._gameDirection = undefined;
    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // this.preloadFromArr({
        // sound: this.sound.add('drums').setLoop(true).play()
        // });
    }

    create() {

        super.create();

        this.createAnimation(this.anims);
        const question = this.generateQuestion();
        this.setGameDirection(question.direction);
        this.paintScene(question);
    }


    createAnimation(animationManager) {
        createLionLeftRecorderAnimation(animationManager);
        createPenguinAnimation(animationManager);
    }

    setGameDirection(direction) {
        this._gameDirection = direction;
    }

    isRightDirection() {

        return this._gameDirection == "right"

    }



    /**
     * generate a question from the local question data
     * 从题库中随机抽取一道题目
     */
    generateQuestion() {

        let question = null;
        let errorQuestionIndex = JSON.parse(localStorage.getItem('errorQuestionIndex'));

        if (errorQuestionIndex == null) {
            this.hasGameChance = false;
            this.questionIndex = GameManager.getInstance().generateGameQuestionIndex();

        } else {

            if (JSON.parse(localStorage.getItem('gameChance'))) {
                this.hasGameChance = true;
                this.questionIndex = errorQuestionIndex;
            }

        }

        // question = JSON.parse(localStorage.getItem(this.questionIndex));

        question = JSON.parse(localStorage.getItem(17));
        // question = JSON.parse(localStorage.getItem(16));
        console.log("当前抽取的题目:%o", question);

        this.currentQuestionAnswer = question.answer;

        return question;
    }
    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
     */
    paintScene(currentGameQuestion) {

        this.gameLayer = this.add.layer().setDepth(1);
        this.uiLayer = this.add.layer().setDepth(0);

        this.gameLayer.getByName()

        /* UI Object */
        this.buildUiObject(this.uiLayer);

        /* Game Object */
        this.buildGameObject(currentGameQuestion, this.gameLayer);
    }

    buildUiObject(layer) {
        const exitButton = new ExitButton(this, 120, 135);

        const penguinSprite = new GameSprite(this, 1370, 700, "penguinTexture").setOrigin(0);
        const lionLeftRecorderSprite = new GameSprite(this, 0, 620, "lionLeftRecorderTexture").setOrigin(0);
        const uiEgg = this.add.image(710, 890, 'uiEgg').setOrigin(0);
        const uiRecorder = this.add.image(1920, 840, 'uiRecorder').setOrigin(1, 0);
        uiEgg.setScale(0.5);

        lionLeftRecorderSprite.play('lionLeftRecorderAnimation');
        penguinSprite.play('penguinAnimation');

        layer.add([this.buildBackground('backgroundGamePlay'), exitButton, lionLeftRecorderSprite, uiEgg, uiRecorder, penguinSprite]);
    }

    buildGameObject(currentGameQuestion, layer) {
        const phrases = this.shufflePosition(currentGameQuestion.phrases.items);
        const eggQuestion = new EggQuestion(this, {
            x: 0,
            y: 0
        }, "eggQuestionTexture", currentGameQuestion.phrases.main, false);



        let clawBoxPosition;
        let clawAnimationTargetPosition;

        let clawBox = new ClawBox(this, { x: 0, y: 0 }, eggQuestion);

        /* 以右方向为正方向*/
        if (this.isRightDirection()) {
            console.log({ direction: currentGameQuestion.direction });
            clawBoxPosition = {
                x: 2200,
                y: 410
            }
            clawAnimationTargetPosition = 1800;
            clawBox.eggQuestion.setPosition(-200, 0);
        }
        else {
            console.log({ direction: currentGameQuestion.direction });
            clawBoxPosition = { x: 0, y: 410 };
            clawAnimationTargetPosition = 120;

            clawBox.eggQuestion.setPosition(200, 0);

            clawBox.setFlipX();

        }

        clawBox.setPosition(clawBoxPosition.x, clawBoxPosition.y);


        this.generateEggItems(phrases, this.generatePoints(), eggQuestion, this.gameLayer);

        clawBox.showAppearanceAnimation(clawAnimationTargetPosition);

        layer.add([clawBox]);

    }

    generatePoints() {
        let points = [];
        if (this.isRightDirection()) {
            points = [{
                x: 276,
                y: 498
            }, {
                x: 390,
                y: 168
            }, {
                x: 531,
                y: 441
            }, {
                x: 766,
                y: 216
            }, {
                x: 841,
                y: 569
            }, {
                x: 1053,
                y: 350
            }, {
                x: 1207,
                y: 569
            }, {
                x: 1334,
                y: 265
            }];
        } else {
            points = [{
                x: 622,
                y: 503
            }, {
                x: 794,
                y: 285
            }, {
                x: 894,
                y: 629
            }, {
                x: 1114,
                y: 404
            }, {
                x: 1352,
                y: 292
            }, {
                x: 1341,
                y: 606
            }, {
                x: 1588,
                y: 411
            }, {
                x: 1754,
                y: 212
            }, {
                x: 1720,
                y: 662
            }];
        }
        return this.shufflePosition(points);

    }

    generateEggItems(phrases, points, eggQuestion, layer) {
        let eggItemList = [];
        let colliderList = [];
        for (let index = 0; index < phrases.length; index++) {
            const phrase = phrases[index];
            const eggItem = new EggItem(this, points[index], "eggAnswerItemTexture", phrase, true);

            const collider = this.physics.add.collider(eggItem, eggQuestion, (dragItem, targetItem) => {
                colliderList.forEach(collider => this.physics.world.removeCollider(collider));
                eggItemList.forEach(eggItem => eggItem.input.draggable = false);

                this.playVoice(dragItem, targetItem, this.checkAnswer(dragItem, targetItem, this.currentQuestionAnswer));
            });

            colliderList.push(collider);

            eggItemList.push(eggItem);

            layer.add(eggItem);

        }

        if (!this.isRightDirection()) {
            eggItemList.forEach((item) => {
                item.getAll().forEach(gameObject => {
                    // gameObject.setFlipX(true);


                    if (gameObject.name == "background") {
                        gameObject.setFlipX(true);
                        gameObject.setX(-20);
                    }
                })
            });
        }
    }

    shufflePosition(arr) {
        var result = [],
            random;
        while (arr.length > 0) {
            random = Math.floor(Math.random() * arr.length);
            result.push(arr[random])
            arr.splice(random, 1)
        }
        return result;
    }

    paintGameSuccess(currentQuestionAnswer) {
        GameManager.getInstance().updateGameQuestionNumberList(this.questionIndex);
        GameManager.getInstance().updateGamePlayTotal((value) => {
            this.time.addEvent({
                delay: 1000,
                callback: () => this.scene.start(value ? 'Game' : 'End')
            })
        });

        // const 
        // this.sound.add('starEffectSound').play();
        let composeSprite = new ComposeSprite(this, 1000, 200, 'cloudTexture', 'textureAnswerObject' + currentQuestionAnswer.answerTextureIndex);

        Phaser.Display.Align.In.Center(composeSprite, this.uiLayer.getByName("background"));

        composeSprite.showSuccessfulAnimation();
        this.uiLayer.add(composeSprite);
    }


    paintGameFailed(currentQuestionAnswer) {

        let _isFirstError = null;

        GameManager.getInstance().setGameQuestionError(this.questionIndex, (isFirstError, value) => {

            _isFirstError = isFirstError;
            console.log({
                isLastQuestion: value
            })
            this.time.addEvent({
                delay: isFirstError ? 2000 : 5000,
                callback: () => value ? this.scene.start('End') : this.scene.restart('Game')
            });
        });


        if (!_isFirstError) {
            this.answerArea.showCurrentAnswer(this);

            let composeSprite = new ComposeSprite(this, 1000, 200, 'cloudTexture', 'textureAnswerObject' + currentQuestionAnswer.answerTextureIndex);

            Phaser.Display.Align.In.Center(composeSprite, this.uiLayer.getByName("background"));

            composeSprite.showSuccessfulAnimation();
            this.uiLayer.add(composeSprite);
        }
    }

    checkAnswer(dragItem, targetItem, currentQuestionAnswer) {

        const composeWords = dragItem.objectName + targetItem.objectName;

        // textureAnswerObject0

        composeWords == currentQuestionAnswer.objectName ? this.paintGameSuccess(currentQuestionAnswer) : this.paintGameFailed(currentQuestionAnswer);

    }

    playVoice(leftVoice, rightVoice, callback) {
        this.sound.stopAll();

        const leftVoicePlayer = this.sound.add(leftVoice);
        const rightVoicePlayer = this.sound.add(rightVoice);

        leftVoicePlayer.on('complete', () => {
            this.sound.play(rightVoice);
            leftVoicePlayer.destroy();
        })

        rightVoicePlayer.on('complete', () => {
            callback;
        })

        leftVoicePlayer.play();

    }


}