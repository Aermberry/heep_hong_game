import {
    createLionLeftRecorderAnimation
} from "../assets/animations/LionLeftRecorderAnimation";
import {
    createPenguinAnimation
} from "../assets/animations/PenguinAnimation";
import {
    createPlayerAnimation
} from "../assets/animations/PlayerAnimation";
import ClawBox from "../components/ClawBox";
import EggItem from "../components/EggItem";
import EggQuestion from "../components/EggQuestion";
import GameManager from '../components/GameManager';
import LoadProgress from "../components/LoadProgress";
import Player from "../components/Player";
import GameModel from "../game_mode/GameModel";
import GameSprite from "../phaser3_framework/object/GameSprite";
import TweenAnimation from "../phaser3_framework/util/TweenAnimation";
import BasicScene from "./BasicScene";


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

        this.load.spritesheet('eggAnswerItemTexture', require('../assets/images/texture_egg_answer_item.png'), {
            frameWidth: 612,
            frameHeight: 770
        });
        this.load.spritesheet('eggQuestionTexture', require('../assets/images/texture_egg_question.png'), {
            frameWidth: 633,
            frameHeight: 630
        });
        this.load.spritesheet('cloudTexture', require('../assets/images/texture_cloud.png'), {
            frameWidth: 2180,
            frameHeight: 1980
        });

        this.preloadFromArr({
            sound: soundFiles
        });
    }

    create() {

        super.create();

        this.sys.game.globals.gtag.event(`game_${this.sys.game.globals.gameStageIndex}_start`, {
            'event_category': 'js_games',
            'event_label': 'Game Start'
        });

        this.createAnimation(this.anims);
        const question = this.generateQuestion();
        this.setGameDirection("right");

        this.setWorldBounds();

        this.paintScene(question);



    }

    setWorldBounds() {
        let x = 0;

        let width = null;
        let height = null;

        if (this.isRightDirection()) {
            x = 5;
            width = this.cameras.main.width;
            height = this.cameras.main.height - 20;


        } else {
            x = 10;
            width = this.cameras.main.width + 19;
            height = this.cameras.main.height - 20;
        }

        this.physics.world.setBounds(x, 0, width, height);
    }

    playBackgroundMusic(startSound, backgroundMusic) {
        const clipDollTableEffectSound = this.sound.add(startSound);

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

        // question = JSON.parse(localStorage.getItem(19));
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

        this.penguinSprite = new GameSprite(this, 1375, 720, "penguinTexture").setOrigin(0);
        const lionLeftRecorderSprite = new GameSprite(this, 0, 620, "lionLeftRecorderTexture").setOrigin(0);
        const uiEgg = this.add.image(710, 890, 'uiEgg').setOrigin(0);
        const uiRecorder = this.add.image(1920, 840, 'uiRecorder').setOrigin(1, 0);
        uiEgg.setScale(0.5);

        lionLeftRecorderSprite.play('lionLeftRecorderAnimation');
        this.penguinSprite.play('penguinIdle');

        layer.add([this.buildBackground('backgroundGamePlay'), lionLeftRecorderSprite, uiEgg, uiRecorder, this.penguinSprite]);
    }

    buildGameObject(currentGameQuestion, layer) {
        const phrases = this.shufflePosition(currentGameQuestion.phrases.items);

        const eggQuestion = new EggQuestion(this, {
            x: 0,
            y: 0
        }, "eggQuestionTexture", currentGameQuestion.phrases.main, false);

        let clawBoxPosition;
        let clawAnimationTargetPosition;

        let clawBox = new ClawBox(this, {
            x: 0,
            y: 0
        }, eggQuestion);

        let player = new Player(this, {
            x: 1000,
            y: 940
        }, 'voice' + currentGameQuestion.phrases.main.index, 'voice' + currentGameQuestion.keywordVoiceIndex);

        /* 以右方向为正方向*/
        if (this.isRightDirection()) {
            clawBoxPosition = {
                x: 2200,
                y: 410
            }
            clawAnimationTargetPosition = 1800;
            clawBox.eggQuestion.setPosition(-200, 0);
        } else {
            clawBoxPosition = {
                x: 0,
                y: 410
            };
            clawAnimationTargetPosition = 120;

            clawBox.eggQuestion.setPosition(200, 0);

            clawBox.setFlipX();

        }

        clawBox.setPosition(clawBoxPosition.x, clawBoxPosition.y);

        layer.add([clawBox, player]);

        this.eggItemList = this.generateEggItems(phrases, this.generatePoints(), eggQuestion, player, this.gameLayer);

        clawBox.showAppearanceAnimation(clawAnimationTargetPosition, () => {
            player.playAudio(() => {
                this.eggItemList.forEach(eggItem => {
                    eggItem.setEnableListener()
                    eggItem.body.collideWorldBounds = true;
                    eggItem.body.bounce.set(0);
                });
                eggQuestion.setEnableListener();
            });
        });

    }

    generatePoints() {
        let points = [];
        if (this.isRightDirection()) {
            points = [{
                x: 522,
                y: 423
            }, {
                x: 1005,
                y: 450
            }];
        } else {
            points = [{
                x: 522,
                y: 423
            }, {
                x: 1005,
                y: 450
            }];
        }
        return this.shufflePosition(points);

    }

    generateEggItems(phrases, points, eggQuestion, player, layer) {
        let eggItemList = [];
        let colliderList = [];

        for (let index = 0; index < phrases.length; index++) {

            const phrase = phrases[index];

            const eggItem = new EggItem(this, points[index], "eggAnswerItemTexture", phrase, true);
            this.time.addEvent({
                delay: index * 500,
                callback: () => eggItem.playFLoatTweenAnimation()
            });

            const collider = this.physics.add.collider(eggItem, eggQuestion, (dragItem, targetItem) => {
                let leftItem;
                let rightItem;

                eggItemList.forEach(eggItem => {
                    eggItem.setRemoveListener();
                });

                player.disableListener();
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

                console.log({
                    leftItem
                });
                console.log({
                    rightItem
                });

                this.playVoice(leftItem.index, rightItem.index, this.checkAnswer(dragItem, targetItem, this.currentQuestionAnswer, eggItemList));
                console.log({
                    "GameModel": GameModel.questionCount
                })
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

    paintGameSuccess(leftItem, rightItem, currentQuestionAnswer) {
        leftItem.showSuccessStatus();
        rightItem.showSuccessStatus();

        this.penguinSprite.play("penguinHappy");
        const correctSoundEffect = this.sound.add('correctSoundEffect');
        this.setCorrectSprite(leftItem);
        correctSoundEffect.on('complete', () => {
            GameManager.getInstance().getGameSuccess(this.questionIndex, (isLastQuestion) => {
                this.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        const winSoundEffect = this.sound.add("winSoundEffect");

                        winSoundEffect.on('complete', () => {
                            const leftVoicePlayer = this.sound.add("voice" + currentQuestionAnswer.index);

                            leftVoicePlayer.on('complete', () => {
                                this.time.addEvent({
                                    delay: 1000, // ms
                                    callback: () =>
                                        this.scene.start(isLastQuestion ? 'End' : 'Game')
                                });
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


    paintGameFailed(dragItem, targetItem, currentAnswerItem, currentQuestionAnswer) {

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
                            this.errorItemList.forEach((errorItem) => errorItem.resetStatue());
                            this.errorImageList.forEach((errorImage) => {
                                errorImage.setVisible(false);
                                errorImage.destroy()
                            });
                            currentAnswerItem.showSuccessStatus();

                            const currentQuestionAnswerPlayer = this.sound.add("voice" + currentQuestionAnswer.index);

                            currentQuestionAnswerPlayer.on('complete', () => {
                                this.time.addEvent({
                                    delay: 1000, // ms
                                    callback: () => {
                                        value ? this.scene.start('End') : this.scene.restart('Game');
                                    }

                                });
                            })
                            currentQuestionAnswerPlayer.play();

                        }
                    });

                });
            });
        });
    }

    setCorrectSprite(dragItem) {
        let correctImage = this.add.image(dragItem.x + 100, dragItem.y - 200, "correctTexture");
        const eggItemsContainer = this.gameLayer.getByName("eggItemsContainer");

        eggItemsContainer.add(correctImage);

    }

    setErrorSprite(dragItem, targetItem, eggItems, callback) {
        let errorImagePoint;
        if (this.isRightDirection()) {
            errorImagePoint = {
                x: dragItem.x + 50,
                y: dragItem.y - 150
            }
        } else {
            errorImagePoint = {
                x: dragItem.x - 100,
                y: dragItem.y - 150
            }
        }


        let errorImage = this.add.image(errorImagePoint.x, errorImagePoint.y, "errorTexture");

        this.errorImageList.push(errorImage);

        const eggItemsContainer = this.gameLayer.getByName("eggItemsContainer");

        eggItemsContainer.add(errorImage)

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
                                ease: 'Cubic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                                duration: 800,
                                loop: 0,
                                tweens: [{
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
                                            this.sound.add("loseSoundEffect").play();
                                            errorImage.setVisible(true);
                                            targetItem.resetStatue();
                                            this.penguinSprite.play("penguinIdle");
                                            callback();

                                        }
                                    }
                                ]
                            });
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

        const composeWords = leftItem.objectName;

        let currentAnswerItem = eggItemList.find((egg) => {
            return egg.objectName == currentQuestionAnswer.objectName
        });

        composeWords == currentQuestionAnswer.objectName ? this.paintGameSuccess(leftItem, rightItem, currentQuestionAnswer) : this.paintGameFailed(dragItem, targetItem, currentAnswerItem, currentQuestionAnswer);

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