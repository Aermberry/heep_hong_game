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
import TweenAnimation from "../phaser3_framework/util/TweenAnimation";
import LoadProgress from "../components/LoadProgress";
import GameModel from "../game_mode/GameModel";
import BackgroundMusicButtonButton from "../components/BackgroundMusicButton";


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

        this.load.spritesheet('eggAnswerItemTexture', require('../assets/images/texture_egg_answer_item.png'), { frameWidth: 612, frameHeight: 770 });
        this.load.spritesheet('eggQuestionTexture', require('../assets/images/texture_egg_question.png'), { frameWidth: 633, frameHeight: 630 });
        this.load.spritesheet('cloudTexture', require('../assets/images/texture_cloud.png'), { frameWidth: 2180, frameHeight: 1980 });

        this.load.spritesheet("textureAnswerObject0", require('../assets/images/objects/texture_answer_objects/texture_answer_object_0.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject1", require('../assets/images/objects/texture_answer_objects/texture_answer_object_1.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject2", require('../assets/images/objects/texture_answer_objects/texture_answer_object_2.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject3", require('../assets/images/objects/texture_answer_objects/texture_answer_object_3.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject4", require('../assets/images/objects/texture_answer_objects/texture_answer_object_4.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject5", require('../assets/images/objects/texture_answer_objects/texture_answer_object_5.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject6", require('../assets/images/objects/texture_answer_objects/texture_answer_object_6.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject7", require('../assets/images/objects/texture_answer_objects/texture_answer_object_7.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject8", require('../assets/images/objects/texture_answer_objects/texture_answer_object_8.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject9", require('../assets/images/objects/texture_answer_objects/texture_answer_object_9.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject10", require('../assets/images/objects/texture_answer_objects/texture_answer_object_10.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject11", require('../assets/images/objects/texture_answer_objects/texture_answer_object_11.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject12", require('../assets/images/objects/texture_answer_objects/texture_answer_object_12.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject13", require('../assets/images/objects/texture_answer_objects/texture_answer_object_13.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject14", require('../assets/images/objects/texture_answer_objects/texture_answer_object_14.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject15", require('../assets/images/objects/texture_answer_objects/texture_answer_object_15.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject16", require('../assets/images/objects/texture_answer_objects/texture_answer_object_16.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject17", require('../assets/images/objects/texture_answer_objects/texture_answer_object_17.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject18", require('../assets/images/objects/texture_answer_objects/texture_answer_object_18.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject19", require('../assets/images/objects/texture_answer_objects/texture_answer_object_19.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject20", require('../assets/images/objects/texture_answer_objects/texture_answer_object_20.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject21", require('../assets/images/objects/texture_answer_objects/texture_answer_object_21.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject22", require('../assets/images/objects/texture_answer_objects/texture_answer_object_22.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject23", require('../assets/images/objects/texture_answer_objects/texture_answer_object_23.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject24", require('../assets/images/objects/texture_answer_objects/texture_answer_object_24.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject25", require('../assets/images/objects/texture_answer_objects/texture_answer_object_25.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject26", require('../assets/images/objects/texture_answer_objects/texture_answer_object_26.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject27", require('../assets/images/objects/texture_answer_objects/texture_answer_object_27.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject28", require('../assets/images/objects/texture_answer_objects/texture_answer_object_28.png'), { frameWidth: 636, frameHeight: 630 });
        this.load.spritesheet("textureAnswerObject29", require('../assets/images/objects/texture_answer_objects/texture_answer_object_29.png'), { frameWidth: 636, frameHeight: 630 });

        this.preloadFromArr({ sound: soundFiles });
    }

    create() {

        super.create();

        this.sys.game.globals.gtag.event(`game_${this.sys.game.globals.gameStageIndex}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start' });

        this.sound.stopAll();

        console.log({ "eachQuestionChance": GameModel.eachQuestionChance })
        console.log({ "currentQuestionErrorCount": GameModel.currentQuestionErrorCount })

        this.createAnimation(this.anims);
        const question = this.generateQuestion();
        this.setGameDirection(question.direction);

        this.setWorldBounds();

        const backgroundMusic = this.sound.add('gamePlaySceneBackgroundMusic', {
            volume: 0.2,
            loop: true
        });

        this.paintScene(question,backgroundMusic);

        this.playBackgroundMusic('robotArmAppearSoundEffect', backgroundMusic);

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
            x=10;
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
            this.questionIndex = GameManager.getInstance().generateGameQuestionIndex();

        } else {

            if (JSON.parse(localStorage.getItem('gameChance'))) {
                this.questionIndex = errorQuestionIndex;
            }

        }

        question = JSON.parse(localStorage.getItem(this.questionIndex));

        // question = JSON.parse(localStorage.getItem(2));
        // question = JSON.parse(localStorage.getItem(9));
        console.log("当前抽取的题目:%o", question);
        console.log("当前抽取的题目Index:%o", this.questionIndex)

        this.currentQuestionAnswer = question.answer;

        return question;
    }
    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
     */
    paintScene(currentGameQuestion,backgroundMusic) {

        this.gameLayer = this.add.layer().setDepth(1);
        this.uiLayer = this.add.layer().setDepth(0);



        /* UI Object */
        this.buildUiObject(this.uiLayer,backgroundMusic);

        /* Game Object */
        this.buildGameObject(currentGameQuestion, this.gameLayer);
    }

    buildUiObject(layer,backgroundMusic) {
        const exitButton = new ExitButton(this, 120, 135);
        const backgroundMusicButton = new BackgroundMusicButtonButton(this, 1800, 135, backgroundMusic);
        

        this.penguinSprite = new GameSprite(this, 1375, 720, "penguinTexture").setOrigin(0);
        const lionLeftRecorderSprite = new GameSprite(this, 0, 620, "lionLeftRecorderTexture").setOrigin(0);
        const uiEgg = this.add.image(710, 890, 'uiEgg').setOrigin(0);
        const uiRecorder = this.add.image(1920, 840, 'uiRecorder').setOrigin(1, 0);
        uiEgg.setScale(0.5);

        lionLeftRecorderSprite.play('lionLeftRecorderAnimation');
        this.penguinSprite.play('penguinIdle');

        layer.add([this.buildBackground('backgroundGamePlay'), exitButton, lionLeftRecorderSprite, uiEgg, uiRecorder, this.penguinSprite,backgroundMusicButton]);
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

        this.eggItemList = this.generateEggItems(phrases, this.generatePoints(), eggQuestion, this.gameLayer);

        clawBox.showAppearanceAnimation(clawAnimationTargetPosition, () => {
            this.eggItemList.forEach(eggItem => {
                eggItem.setEnableListener();

                eggItem.body.collideWorldBounds = true;
                eggItem.body.bounce.set(0);

            })

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
            this.time.addEvent({ delay: index * 500, callback: () => eggItem.playFLoatTweenAnimation() });

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




                this.playVoice(leftItem.index, rightItem.index, this.checkAnswer(dragItem, targetItem, this.currentQuestionAnswer, eggItemList));

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
                            const leftVoicePlayer = this.sound.add("voiceItemObject" + leftItem.index);
                            const rightVoicePlayer = this.sound.add("voiceItemObject" + rightItem.index);

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
        const leftVoicePlayer = this.sound.add("voiceItemObject" + leftVoice);
        const rightVoicePlayer = this.sound.add("voiceItemObject" + rightVoice);

        leftVoicePlayer.on('complete', () => {
            rightVoicePlayer.play();

        })

        rightVoicePlayer.on('complete', () => {
            callback;
        })

        leftVoicePlayer.play();

    }


}