import BasicScene from "./BasicScene"
import ExitButton from '../components/ExitProgressGameButton'
import GameManager from '../components/GameManager';
import {
    createLionLeftRecorderAnimation
} from "../assets/animations/LionLeftRecorderAnimation";
import GameSprite from "../phaser3_framework/object/GameSprite";
import {
    createPenguinAnimation
} from "../assets/animations/PenguinAnimation";
import EggItem from "../components/EggItem";
import EggQuestion from "../components/EggQuestion";
import ClawBox from "../components/ClawBox";
import ComposeSprite from "../components/ComposeSprite";
import Phaser from "phaser";
import TweenAnimation from "../phaser3_framework/util/TweenAnimation";
import LoadProgress from "../components/LoadProgress";
import GameModel from "../game_mode/GameModel";
import Player from "../components/Player";
import { createPlayerAnimation } from "../assets/animations/PlayerAnimation";


export default class GameScene extends BasicScene {

    constructor() {
        super('Game');

        this.uiLayer = undefined;
        this.gameLayer = undefined;

        this.questionIndex = undefined;
        this.questionNumberList = [];

        this.answerArea = undefined;
        this.currentQuestionAnswer = undefined;
        this.questionDisplayDirection = undefined;
        this.positions = undefined;
        this._gameDirection = undefined;
        this.eggItemList = [];
        this.errorItemList = [];
        this.errorImageList = [];
        this.penguinSprite = undefined;

    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // this.preloadFromArr({
        // sound: this.sound.add('drums').setLoop(true).play()
        // });

        this.buildBackground('backgroundGamePlay');

        this.progressLoader = new LoadProgress(this);
        this.progressLoader.create();

        this.load.on('progress', (params) => {
            this.progressLoader.onLoadProgress(params)
        }
        );

        const soundFiles = {
            'voice0': require('../assets/audio/voice/object/0.mp3'),
            'voice1': require('../assets/audio/voice/object/1.mp3'),
            'voice2': require('../assets/audio/voice/object/2.mp3'),
            'voice3': require('../assets/audio/voice/object/3.mp3'),
            'voice4': require('../assets/audio/voice/object/4.mp3'),
            'voice5': require('../assets/audio/voice/object/5.mp3'),
            'voice6': require('../assets/audio/voice/object/6.mp3'),
            'voice7': require('../assets/audio/voice/object/7.mp3'),
            'voice8': require('../assets/audio/voice/object/8.mp3'),
            'voice9': require('../assets/audio/voice/object/9.mp3'),
            'voice10': require('../assets/audio/voice/object/10.mp3'),
            'voice11': require('../assets/audio/voice/object/11.mp3'),
            'voice12': require('../assets/audio/voice/object/12.mp3'),
            'voice13': require('../assets/audio/voice/object/13.mp3'),
            'voice14': require('../assets/audio/voice/object/14.mp3'),
            'voice15': require('../assets/audio/voice/object/15.mp3'),
            'voice16': require('../assets/audio/voice/object/16.mp3'),
            'voice17': require('../assets/audio/voice/object/17.mp3'),
            'voice18': require('../assets/audio/voice/object/18.mp3'),
            'voice19': require('../assets/audio/voice/object/19.mp3'),
            'voice20': require('../assets/audio/voice/object/20.mp3'),
            'voice21': require('../assets/audio/voice/object/21.mp3'),
            'voice23': require('../assets/audio/voice/object/23.mp3'),
            'voice24': require('../assets/audio/voice/object/24.mp3'),
            'voice25': require('../assets/audio/voice/object/25.mp3'),
            'voice26': require('../assets/audio/voice/object/26.mp3'),
            'voice27': require('../assets/audio/voice/object/27.mp3'),
            'voice28': require('../assets/audio/voice/object/28.mp3'),
            'voice29': require('../assets/audio/voice/object/29.mp3'),
            'voice30': require('../assets/audio/voice/object/30.mp3'),
            'voice31': require('../assets/audio/voice/object/31.mp3'),
            'voice32': require('../assets/audio/voice/object/32.mp3'),
            'voice33': require('../assets/audio/voice/object/33.mp3'),
            'voice34': require('../assets/audio/voice/object/34.mp3'),

            'voiceOver0': require('../assets/audio/voice/voice_over/0.mp3'),
            'voiceOver1': require('../assets/audio/voice/voice_over/1.mp3'),
        }

        this.load.spritesheet('eggAnswerItemTexture', require('../assets/images/texture_egg_answer_item.png'), { frameWidth: 612, frameHeight: 770 });
        this.load.spritesheet('eggQuestionTexture', require('../assets/images/texture_egg_question.png'), { frameWidth: 633, frameHeight: 630 });
        this.load.spritesheet('cloudTexture', require('../assets/images/texture_cloud.png'), { frameWidth: 2180, frameHeight: 1980 });

        this.preloadFromArr({ sound: soundFiles });
    }

    create() {

        super.create();

        this.createAnimation(this.anims);
        const question = this.generateQuestion();
        this.setGameDirection("right");
        this.paintScene(question);

        this.playBackgroundMusic('robotArmAppearSoundEffect', 'gamePlaySceneBackgroundMusic');

    }

    playBackgroundMusic(startSound, backgroundSound) {
        const clipDollTableEffectSound = this.sound.add(startSound);
        const backgroundMusic = this.sound.add(backgroundSound, {
            volume: 0.1,
            loop: true
        });

        clipDollTableEffectSound.on('complete', () => {
            backgroundMusic.play();

        })

        clipDollTableEffectSound.play();
    }


    createAnimation(animationManager) {
        createLionLeftRecorderAnimation(animationManager);
        createPenguinAnimation(animationManager);
        createPlayerAnimation(animationManager);
    }

    setGameDirection(direction) {
        this._gameDirection = direction;
    }

    isRightDirection() {

        return this._gameDirection == "right";

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

        } else {

            if (JSON.parse(localStorage.getItem('gameChance'))) {
                this.questionIndex = errorQuestionIndex;
            }

        }

        question = JSON.parse(localStorage.getItem(this.questionIndex));

        // question = JSON.parse(localStorage.getItem(2));
        // question = JSON.parse(localStorage.getItem(16));
        console.log("当前抽取的题目:%o", question);
        console.log("当前抽取的题目Index:%o", this.questionIndex)

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

        /* UI Object */
        this.buildUiObject(this.uiLayer);

        /* Game Object */
        this.buildGameObject(currentGameQuestion, this.gameLayer);
    }

    buildUiObject(layer) {
        const exitButton = new ExitButton(this, 120, 135);

        this.penguinSprite = new GameSprite(this, 1370, 700, "penguinTexture").setOrigin(0);
        const lionLeftRecorderSprite = new GameSprite(this, 0, 620, "lionLeftRecorderTexture").setOrigin(0);
        const uiEgg = this.add.image(710, 890, 'uiEgg').setOrigin(0);
        const uiRecorder = this.add.image(1920, 840, 'uiRecorder').setOrigin(1, 0);
        uiEgg.setScale(0.5);

        lionLeftRecorderSprite.play('lionLeftRecorderAnimation');
        this.penguinSprite.play('penguinIdle');

        layer.add([this.buildBackground('backgroundGamePlay'), exitButton, lionLeftRecorderSprite, uiEgg, uiRecorder, this.penguinSprite]);
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

        let player = new Player(this, { x: 1000, y: 940 }, 'voice' + currentGameQuestion.phrases.main.index, 'voice' + currentGameQuestion.keywordVoiceIndex);

        /* 以右方向为正方向*/
        if (this.isRightDirection()) {
            clawBoxPosition = {
                x: 2200,
                y: 410
            }
            clawAnimationTargetPosition = 1800;
            clawBox.eggQuestion.setPosition(-200, 0);
        }
        else {
            clawBoxPosition = { x: 0, y: 410 };
            clawAnimationTargetPosition = 120;

            clawBox.eggQuestion.setPosition(200, 0);

            clawBox.setFlipX();

        }

        clawBox.setPosition(clawBoxPosition.x, clawBoxPosition.y);

        layer.add([clawBox, player]);

        this.eggItemList = this.generateEggItems(phrases, this.generatePoints(), eggQuestion, this.gameLayer);

        clawBox.showAppearanceAnimation(clawAnimationTargetPosition, () => {
            this.eggItemList.forEach(eggItem => eggItem.setEnableListener());
            player.playAudio();
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
                let leftItem;
                let rightItem;

                eggItemList.forEach(eggItem => {
                    eggItem.setRemoveListener();
                });

                targetItem.setRemoveListener()

                this.physics.world.removeCollider(collider);
                collider.destroy();

                if (this.isRightDirection()) {
                    leftItem = dragItem;
                    rightItem = targetItem;
                } else {
                    leftItem = targetItem;
                    rightItem = dragItem;
                }

                console.log({leftItem});
                console.log({rightItem});

                this.playVoice(leftItem.index, rightItem.index, this.checkAnswer(dragItem, targetItem, this.currentQuestionAnswer, eggItemList));
                console.log({ "GameModel": GameModel.questionCount })
            });

            colliderList.push(collider);

            eggItemList.push(eggItem);
        }

        const eggItemsContainer = this.add.container(0, 0, eggItemList).setName("eggItemsContainer");
        layer.add(eggItemsContainer);

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

    paintGameSuccess(leftItem, rightItem, composeSprite) {
        leftItem.showSuccessStatus();
        rightItem.showSuccessStatus();

        this.penguinSprite.play("penguinHappy");
        const correctSoundEffect = this.sound.add('correctSoundEffect');

        correctSoundEffect.on('complete', () => {
            GameManager.getInstance().getGameSuccess(this.questionIndex, (isLastQuestion) => {
                this.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        const winSoundEffect = this.sound.add("winSoundEffect");
                        Phaser.Display.Align.In.Center(composeSprite, this.uiLayer.getByName("background"));

                        composeSprite.setVisible(true);
                        composeSprite.showColorStatus();

                        this.gameLayer.add(composeSprite);

                        winSoundEffect.on('complete', () => {
                            // this.sound.stopAll();
                            const leftVoicePlayer = this.sound.add("voice" + leftItem.index);
                            const rightVoicePlayer = this.sound.add("voice" + rightItem.index);

                            leftVoicePlayer.on('complete', () => {
                                rightVoicePlayer.play();

                            })

                            rightVoicePlayer.on('complete', () => {
                                this.scene.start(isLastQuestion ? 'End' : 'Game')
                            })
                            leftVoicePlayer.play();
                        })

                        winSoundEffect.play();
                    }
                })
            });
        });
        correctSoundEffect.play();
    }


    paintGameFailed(dragItem, targetItem, composeSprite, currentAnswer) {

        targetItem.showErrorStatue();

        dragItem.showErrorStatue(() => {
            this.setErrorSprite(dragItem, targetItem, this.eggItemList, () => {

                GameManager.getInstance().getGameFail(this.questionIndex, (isFirstError, value) => {
                    console.log({
                        isLastQuestion: value
                    })

                    this.time.addEvent({
                        delay: 2000,
                        callback: () => {

                            Phaser.Display.Align.In.Center(composeSprite, this.uiLayer.getByName("background"));

                            this.gameLayer.add(composeSprite);



                            if (isFirstError) {
                                composeSprite.setVisible(true);
                                composeSprite.showMaskStatus();
                                this.sound.add("loseSoundEffect").play();

                                this.time.addEvent({
                                    delay: 2000,
                                    callback: () => {
                                        composeSprite.setVisible(false);
                                        this.eggItemList.forEach(eggItem => {
                                            eggItem.setEnableListener();
                                        });
                                        targetItem.setEnableListener();
                                    }
                                })

                            } else {
                                this.errorItemList.forEach((errorItem) => errorItem.resetStatue());
                                this.errorImageList.forEach((errorImage) => { errorImage.setVisible(false); errorImage.destroy() });
                                currentAnswer.showSuccessStatus();

                                this.time.addEvent({
                                    delay: 4000,
                                    callback: () => {
                                        let leftItem;
                                        let rightItem;

                                        composeSprite.setVisible(true);
                                        composeSprite.showColorStatus();
                                        this.sound.add("loseSoundEffect").play();


                                        if (this.isRightDirection()) {
                                            leftItem = currentAnswer;
                                            rightItem = targetItem;
                                        } else {
                                            leftItem = targetItem;
                                            rightItem = currentAnswer;
                                        }

                                        // this.sound.stopAll();
                                        const leftVoicePlayer = this.sound.add("voiceItemObject" + leftItem.index);
                                        const rightVoicePlayer = this.sound.add("voiceItemObject" + rightItem.index);

                                        leftVoicePlayer.on('complete', () => {
                                            rightVoicePlayer.play();

                                        })

                                        rightVoicePlayer.on('complete', () => {
                                            composeSprite.setVisible(false);
                                            value ? this.scene.start('End') : this.scene.restart('Game');
                                        })
                                        leftVoicePlayer.play();
                                    }
                                });
                            }
                        }
                    });

                });
            });
        });
    }

    setErrorSprite(dragItem, targetItem, eggItems, callback) {
        let errorImagePoint;
        if (this.isRightDirection()) {
            errorImagePoint = {
                x: dragItem.x + 50,
                y: dragItem.y - 150
            }
        }
        else {
            errorImagePoint = {
                x: dragItem.x - 100,
                y: dragItem.y - 150
            }
        }



        let errorImage = this.add.image(errorImagePoint.x, errorImagePoint.y, "errorTexture");
        this.gameLayer.add(errorImage);

        this.errorImageList.push(errorImage);

        this.penguinSprite.play("penguinFallDown");

        this.errorItemList.push(dragItem);
        eggItems.splice(eggItems.indexOf(dragItem), 1);

        const errorSoundEffect = this.sound.add('errorSoundEffect');

        errorSoundEffect.on('complete', () => {
            errorSoundEffect.destroy();
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    errorImage.setVisible(false);
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            TweenAnimation.setTweenAnimation({
                                targets: dragItem,
                                ease: 'Cubic',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                                duration: 800,
                                loop: 0,
                                tweens: [
                                    {
                                        x: dragItem.x + 10,
                                        ease: 'Bounce',
                                        duration: 50,
                                        repeat: 5,
                                        yoyo: true
                                    },
                                    {
                                        x: dragItem.originPoint.x,
                                        y: dragItem.originPoint.y,
                                        onComplete: () => {
                                            errorImage.setPosition(dragItem.x, dragItem.y);
                                            errorImage.setVisible(true);
                                            targetItem.resetStatue();
                                            this.penguinSprite.play("penguinIdle");
                                            callback();

                                        }
                                    }]
                            }
                            );
                            TweenAnimation.play(this);
                        }
                    })
                }
            })
        })

        errorSoundEffect.play();


    }

    checkAnswer(dragItem, targetItem, currentQuestionAnswer, eggItemList) {


        let leftItem;
        let rightItem;

        if (this.isRightDirection()) {
            leftItem = dragItem;
            rightItem = targetItem;
        } else {
            leftItem = targetItem;
            rightItem = dragItem;
        }

        const composeWords = leftItem.objectName + rightItem.objectName;

        let currentAnswer = eggItemList.find((egg) => {
            return egg.objectName == currentQuestionAnswer.currentItemName
        });

        let composeSprite = new ComposeSprite(this, 1000, 200, 'cloudTexture', 'textureAnswerObject' + currentQuestionAnswer.answerTextureIndex);

        composeSprite.setVisible(false);

        composeWords == currentQuestionAnswer.objectName ? this.paintGameSuccess(leftItem, rightItem, composeSprite) : this.paintGameFailed(dragItem, targetItem, composeSprite, currentAnswer, eggItemList);

    }

    playVoice(leftVoice, rightVoice, callback) {
        // this.sound.stopAll();
        const leftVoicePlayer = this.sound.add("voice" + leftVoice);
        const rightVoicePlayer = this.sound.add("voice" + rightVoice);

        leftVoicePlayer.on('complete', () => {
            rightVoicePlayer.play();

        })

        rightVoicePlayer.on('complete', () => {
            callback;
        })

        leftVoicePlayer.play();

    }


}