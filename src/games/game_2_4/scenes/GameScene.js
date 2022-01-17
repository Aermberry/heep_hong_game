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

        const soundFiles = {
            'voiceAnswerObject0': require('../assets/audio/voice/answer_objects/voice_answer_object_0.mp3'),
            'voiceAnswerObject1': require('../assets/audio/voice/answer_objects/voice_answer_object_1.mp3'),
            'voiceAnswerObject2': require('../assets/audio/voice/answer_objects/voice_answer_object_2.mp3'),
            'voiceAnswerObject3': require('../assets/audio/voice/answer_objects/voice_answer_object_3.mp3'),
            'voiceAnswerObject4': require('../assets/audio/voice/answer_objects/voice_answer_object_4.mp3'),
            'voiceAnswerObject5': require('../assets/audio/voice/answer_objects/voice_answer_object_5.mp3'),
            'voiceAnswerObject6': require('../assets/audio/voice/answer_objects/voice_answer_object_6.mp3'),
            'voiceAnswerObject7': require('../assets/audio/voice/answer_objects/voice_answer_object_7.mp3'),
            'voiceAnswerObject8': require('../assets/audio/voice/answer_objects/voice_answer_object_8.mp3'),
            'voiceAnswerObject9': require('../assets/audio/voice/answer_objects/voice_answer_object_9.mp3'),
            'voiceAnswerObject10': require('../assets/audio/voice/answer_objects/voice_answer_object_10.mp3'),
            'voiceAnswerObject11': require('../assets/audio/voice/answer_objects/voice_answer_object_11.mp3'),
            'voiceAnswerObject12': require('../assets/audio/voice/answer_objects/voice_answer_object_12.mp3'),
            'voiceAnswerObject13': require('../assets/audio/voice/answer_objects/voice_answer_object_13.mp3'),
            'voiceAnswerObject14': require('../assets/audio/voice/answer_objects/voice_answer_object_14.mp3'),
            'voiceAnswerObject15': require('../assets/audio/voice/answer_objects/voice_answer_object_15.mp3'),
            'voiceAnswerObject16': require('../assets/audio/voice/answer_objects/voice_answer_object_16.mp3'),
            'voiceAnswerObject17': require('../assets/audio/voice/answer_objects/voice_answer_object_17.mp3'),
            'voiceAnswerObject18': require('../assets/audio/voice/answer_objects/voice_answer_object_18.mp3'),
            'voiceAnswerObject19': require('../assets/audio/voice/answer_objects/voice_answer_object_19.mp3'),
            'voiceAnswerObject20': require('../assets/audio/voice/answer_objects/voice_answer_object_20.mp3'),
            'voiceAnswerObject21': require('../assets/audio/voice/answer_objects/voice_answer_object_21.mp3'),
            'voiceAnswerObject22': require('../assets/audio/voice/answer_objects/voice_answer_object_22.mp3'),
            'voiceAnswerObject23': require('../assets/audio/voice/answer_objects/voice_answer_object_23.mp3'),
            'voiceAnswerObject24': require('../assets/audio/voice/answer_objects/voice_answer_object_24.mp3'),
            'voiceAnswerObject25': require('../assets/audio/voice/answer_objects/voice_answer_object_25.mp3'),
            'voiceAnswerObject26': require('../assets/audio/voice/answer_objects/voice_answer_object_26.mp3'),
            'voiceAnswerObject27': require('../assets/audio/voice/answer_objects/voice_answer_object_27.mp3'),
            'voiceAnswerObject28': require('../assets/audio/voice/answer_objects/voice_answer_object_28.mp3'),
            'voiceAnswerObject29': require('../assets/audio/voice/answer_objects/voice_answer_object_29.mp3'),

            'voiceItemObject0': require('../assets/audio/voice/item_objects/voice_item_object_0.mp3'),
            'voiceItemObject1': require('../assets/audio/voice/item_objects/voice_item_object_1.mp3'),
            'voiceItemObject2': require('../assets/audio/voice/item_objects/voice_item_object_2.mp3'),
            'voiceItemObject3': require('../assets/audio/voice/item_objects/voice_item_object_3.mp3'),
            'voiceItemObject4': require('../assets/audio/voice/item_objects/voice_item_object_4.mp3'),
            'voiceItemObject5': require('../assets/audio/voice/item_objects/voice_item_object_5.mp3'),
            'voiceItemObject6': require('../assets/audio/voice/item_objects/voice_item_object_6.mp3'),
            'voiceItemObject7': require('../assets/audio/voice/item_objects/voice_item_object_7.mp3'),
            'voiceItemObject8': require('../assets/audio/voice/item_objects/voice_item_object_8.mp3'),
            'voiceItemObject9': require('../assets/audio/voice/item_objects/voice_item_object_9.mp3'),
            'voiceItemObject10': require('../assets/audio/voice/item_objects/voice_item_object_10.mp3'),
            'voiceItemObject11': require('../assets/audio/voice/item_objects/voice_item_object_11.mp3'),
            'voiceItemObject12': require('../assets/audio/voice/item_objects/voice_item_object_12.mp3'),
            'voiceItemObject13': require('../assets/audio/voice/item_objects/voice_item_object_13.mp3'),
            'voiceItemObject14': require('../assets/audio/voice/item_objects/voice_item_object_14.mp3'),
            'voiceItemObject15': require('../assets/audio/voice/item_objects/voice_item_object_15.mp3'),
            'voiceItemObject16': require('../assets/audio/voice/item_objects/voice_item_object_16.mp3'),
            'voiceItemObject17': require('../assets/audio/voice/item_objects/voice_item_object_17.mp3'),
            'voiceItemObject18': require('../assets/audio/voice/item_objects/voice_item_object_18.mp3'),
            'voiceItemObject19': require('../assets/audio/voice/item_objects/voice_item_object_19.mp3'),
            'voiceItemObject20': require('../assets/audio/voice/item_objects/voice_item_object_20.mp3'),
            'voiceItemObject21': require('../assets/audio/voice/item_objects/voice_item_object_21.mp3'),
            'voiceItemObject22': require('../assets/audio/voice/item_objects/voice_item_object_22.mp3'),
            'voiceItemObject23': require('../assets/audio/voice/item_objects/voice_item_object_23.mp3'),
            'voiceItemObject24': require('../assets/audio/voice/item_objects/voice_item_object_24.mp3'),
            'voiceItemObject25': require('../assets/audio/voice/item_objects/voice_item_object_25.mp3'),
            'voiceItemObject26': require('../assets/audio/voice/item_objects/voice_item_object_26.mp3'),
            'voiceItemObject27': require('../assets/audio/voice/item_objects/voice_item_object_27.mp3'),
            'voiceItemObject28': require('../assets/audio/voice/item_objects/voice_item_object_28.mp3'),
            'voiceItemObject29': require('../assets/audio/voice/item_objects/voice_item_object_29.mp3'),
            'voiceItemObject30': require('../assets/audio/voice/item_objects/voice_item_object_30.mp3'),
            'voiceItemObject31': require('../assets/audio/voice/item_objects/voice_item_object_31.mp3'),
            'voiceItemObject32': require('../assets/audio/voice/item_objects/voice_item_object_32.mp3'),
            'voiceItemObject33': require('../assets/audio/voice/item_objects/voice_item_object_33.mp3'),
            'voiceItemObject34': require('../assets/audio/voice/item_objects/voice_item_object_34.mp3'),
            'voiceItemObject35': require('../assets/audio/voice/item_objects/voice_item_object_35.mp3'),
            'voiceItemObject36': require('../assets/audio/voice/item_objects/voice_item_object_36.mp3'),
        }

        this.preloadFromArr({ sound: soundFiles });
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

        layer.add([clawBox]);

        const eggItemList = this.generateEggItems(phrases, this.generatePoints(), eggQuestion, this.gameLayer);

        clawBox.showAppearanceAnimation(clawAnimationTargetPosition,()=>{
            eggItemList.forEach(eggItem=>eggItem.setDraggable(true))
        });

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
                this.input.enabled = false;

                eggItemList.forEach(eggItem => {
                    // eggItem.input.draggable = false;
                    console.log({ eggItem });

                });

                colliderList.forEach(collider => {
                    this.physics.world.removeCollider(collider)
                    collider.destroy();
                });

                this.playVoice(dragItem.index, targetItem.index, this.checkAnswer(dragItem, targetItem, this.currentQuestionAnswer));
            });

            colliderList.push(collider);

            eggItemList.push(eggItem);

            layer.add(eggItem);
        }

        if (!this.isRightDirection()) {
            eggItemList.forEach((item) => {
                item.getAll().forEach(gameObject => {
                    if (gameObject.name == "background") {
                        gameObject.setFlipX(true);
                        gameObject.setX(-20);
                    }
                })
            });
        }

        return eggItemList;
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

    paintGameSuccess(dragItem, targetItem, currentQuestionAnswer) {
        GameManager.getInstance().updateGameQuestionNumberList(this.questionIndex);
        GameManager.getInstance().updateGamePlayTotal((value) => {
            this.time.addEvent({
                delay: 1000,
                callback: () => this.scene.start(value ? 'Game' : 'End')
            })
        });

        dragItem.showSuccessStatus();
        targetItem.showSuccessStatus()

        let composeSprite = new ComposeSprite(this, 1000, 200, 'cloudTexture', 'textureAnswerObject' + currentQuestionAnswer.answerTextureIndex);

        Phaser.Display.Align.In.Center(composeSprite, this.uiLayer.getByName("background"));

        composeSprite.showSuccessfulAnimation();
        this.gameLayer.add(composeSprite);
    }


    paintGameFailed(dragItem, targetItem, currentQuestionAnswer) {

        let _isFirstError = null;

        dragItem.showErrorStatue();
        targetItem.showErrorStatue();

        this.add.image(targetItem.x,targetItem.y,'errorTexture');
        console.log(dragItem.x);
        console.log(dragItem.y)

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
            // this.answerArea.showCurrentAnswer(this);

            let composeSprite = new ComposeSprite(this, 1000, 200, 'cloudTexture', 'textureAnswerObject' + currentQuestionAnswer.answerTextureIndex);

            Phaser.Display.Align.In.Center(composeSprite, this.uiLayer.getByName("background"));

            this.gameLayer.add(composeSprite);


            composeSprite.showFailedAnimation();

        }else{
            console.log('dsd');
        }
    }

    checkAnswer(dragItem, targetItem, currentQuestionAnswer) {

        const composeWords = dragItem.objectName + targetItem.objectName;

        composeWords == currentQuestionAnswer.objectName ? this.paintGameSuccess(dragItem, targetItem, currentQuestionAnswer) : this.paintGameFailed(dragItem, targetItem, currentQuestionAnswer);

    }

    playVoice(leftVoice, rightVoice, callback) {
        this.sound.stopAll();
        const leftVoicePlayer = this.sound.add("voiceItemObject" + leftVoice);
        const rightVoicePlayer = this.sound.add("voiceItemObject" + rightVoice);

        leftVoicePlayer.on('complete', () => {
            rightVoicePlayer.play();
            leftVoicePlayer.destroy();
        })

        rightVoicePlayer.on('complete', () => {
            callback;
        })

        leftVoicePlayer.play();

    }


}