import BasicScene from "./BasicScene"
import ExitButton from '../components/ExitButton'
import LeftMoveButton from '../components/LeftMoveButton'
import RightMoveButton from '../components/RightMoveButton'
import BigTooth from "../components/BigTooth"
import SmallTooth from "../components/SmallTooth"
import AnswerDropZone from "../components/AnswerDropZone"
import GameManager from '../components/GameManager';
import DialogWrongBox from "../components/DialogWrongBox"
import {
    createStarAnimations
} from "../assets/animations/StarAnimation"
import GameSprite from "../components/GameSprite"
import Phaser from 'phaser'
// import FF from '../assets/images/cursor_hand1.png'
export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

        this.exitButton = undefined
        this.leftMoveButton = undefined
        this.rightMoveButton = undefined
        this.retryButton = undefined
        this.stageSlaverSprite = undefined
        this.backgroundLayer = undefined
        this.uiLayer = undefined
        this.playLayer = undefined
        this.crocodileMouth = undefined
        this.gameFailed = undefined
        this.gameFailedLayer = undefined
        this.question = undefined
        this.dragContainer = undefined
        this.dropContainer = undefined
        this.moveStep = undefined
        this.questionIndex = undefined
        this.questionNumberList = []
        this.cursorHandIcon = undefined
        this.backgroundMusic = undefined

    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // this.preloadFromArr({
        // sound: this.sound.add('drums').setLoop(true).play()
        // });


        this.cursorHandIcon = require('../assets/images/cursor_hand.png');

        this.createProgressBar();
    }

    create() {

        super.create();

        this.sound.stopAll();

        this.question = this.generateQuestion();
        this.paintGameScene(this);

        this.sound.play('ahhEffectSound');

        // if (this.sys.game.globals.bgMusic == null) {
        //     let bgMusic = this.sound.add('gameSceneBgm', {
        //         volume: 0.2,
        //         loop: true
        //     });

        //     bgMusic.play();
        //     this.sys.game.globals.bgMusic = bgMusic;
        // }

        this.backgroundMusic = this.sound.add('gameSceneBgm', {
            volume: 0.2,
            loop: true
        });

        this.backgroundMusic.play();

        createStarAnimations(this.anims);

        // this.input.setDefaultCursor(`url(${FF}), pointer`);
        this.input.setDefaultCursor(`url(${this.cursorHandIcon}), pointer`);

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
            this.questionIndex = 10;

        } else {

            if (JSON.parse(localStorage.getItem('gameChance'))) {
                this.questionIndex = errorQuestionIndex;
            }

        }

        question = JSON.parse(localStorage.getItem(this.questionIndex));

        this.currentQuestionAnswer = question.answer;

        return question;
    }

    /* 
     * paint tooth
     * 绘制牙齿
     * 
     */
    pintTooth(question) {
        let container = this.add.container(0, 0);

        let currentToothWidth = 0;
        let currentTooth = undefined;

        let currentOffsetX = 120;

        let bigTooth = this.add.image(0, 0, 'stageBigTooth').setScale(0.5);
        let smallTooth = this.add.image(0, 0, 'stageSmallTooth').setScale(0.5);

        let bigToothWidth = bigTooth.displayWidth;
        let smallToothWidth = smallTooth.displayWidth;

        this.moveStep = (bigToothWidth + smallToothWidth) / 2

        bigTooth.destroy();
        smallTooth.destroy();

        for (let index = 0; index < question.length; index++) {

            const element = question[index];

            if (element.length > 3) {
                currentToothWidth = bigToothWidth;

            } else {
                currentToothWidth = smallToothWidth;
            }

            if (container.getAll().length > 0) {

                if (currentToothWidth != container.getAll()[index - 1].displayWidth) {
                    currentOffsetX += (currentToothWidth + container.getAll()[index - 1].displayWidth) / 2 - 20;
                } else {
                    currentOffsetX += currentToothWidth - 10;
                }
            } else {
                currentOffsetX += currentToothWidth / 2
            }

            if (element.length > 3) {
                currentTooth = new BigTooth(this, currentOffsetX, this.produceToothYValue(currentOffsetX), element)

            } else {
                currentTooth = new SmallTooth(this, currentOffsetX, this.produceToothYValue(currentOffsetX), element)
            }

            container.add(currentTooth);
        }

        return container
    }

    produceToothYValue(value) {
        let y = 0;
        let x = 0;

        if (value < 1920) {
            x = value / 1920;
            const a = 1.09723441576348;
            const b = -8.16263542409481;
            const c = 51.3152050661493;
            const d = -145.528057940444;
            const e = 203.373112722683;
            const f = -137.101168402638;
            const g = 35.6243684276349;

            y = (a + b * x + c * x ** 2 + d * x ** 3 + e * x ** 4 + f * x ** 5 + g * x ** 6) * 1080;
        } else {
            x = value / 3200;
            const a = 102.851018665803;
            const b = -661.121156931237;
            const c = 1690.11508991998;
            const d = -2135.31468738288;
            const e = 1333.5120728099;
            const f = -329.410351673766;

            y = (a + b * x + c * x ** 2 + d * x ** 3 + e * x ** 4 + f * x ** 5) * 1080;
        }

        return y;
    }


    paintGameSuccess() {
        this.backgroundMusic.stop();
        this.uiLayer.setVisible(false);
        GameManager.getInstance().updateGameQuestionNumberList(this.questionIndex);

        GameManager.getInstance().updateGamePlayTotal(() => {
            this.setDragContainerToOriginPosition();
            this.showAnswer(true);

            this.sound.play('popOffEffectSound');

            this.time.addEvent({
                delay: 500,
                callback: () => this.sound.play('childClapEffectSound')
            })

            let currentAnswerVoice = this.sound.add('voiceAnswer' + this.questionIndex);

            currentAnswerVoice.on('complete', () => {
                console.log("currentAnswerVoice");
                this.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        this.scene.start(GameManager.getInstance().isLastQuestion ? 'Game' : 'End')
                    }
                })
            });

            currentAnswerVoice.play();
        });
    }

    setDragContainerToOriginPosition() {
        this.dragContainer.x = 0;
    }


    showStarAnimation(x, y) {
        let startAnimation = new GameSprite(this, x, y, 'star_idleStateAnimation').setScale(0.4);
        this.dragContainer.add(startAnimation);
    }

    paintGameFailed() {
        this.backgroundMusic.stop();
        this.uiLayer.setVisible(false);
        GameManager.getInstance().setGameQuestionError(this.questionIndex, (isFirstError, value) => {

            if (isFirstError) {
                this.sound.play('biteCrunchEffectSound');
                this.showGameFailedTipBox();
                this.playLayer.setVisible(false);
                this.uiLayer.setVisible(false);
                this.input.setDefaultCursor(`url(), auto`);

            } else {
                this.showAnswer(false);
                this.sound.play('gameSceneYouLose');
                this.sound.play('dentistDrillEnvironmentSound');
                this.time.addEvent({
                    delay: 5000,
                    callback: () => {
                        this.scene.start(value ? 'End' : 'Game');
                    }
                })
            }

        });
    }

    showAnswer(isSuccess) {
        this.dragContainer.removeAt(0, true)

        let paintToothContainer = this.pintTooth(this.question.answer);

        if (isSuccess) {
            let toothIndex = paintToothContainer.list.indexOf(Phaser.Math.RND.pick(paintToothContainer.list));

            for (let index = 0; index < paintToothContainer.list.length; index++) {
                const tooth = paintToothContainer.list[index];
                tooth.input.enabled = false;

                if (index == 0) {
                    let x = tooth.x - tooth.displayWidth / 2;
                    let y = tooth.y - tooth.displayHeight / 2;
                    this.showStarAnimation(x, y);
                }

                if (index == paintToothContainer.list.length - 1) {
                    let x = tooth.x + tooth.displayWidth / 2;
                    let y = tooth.y - tooth.displayHeight / 2;
                    this.showStarAnimation(x, y);

                }

                if (index == toothIndex) {
                    let x = tooth.x;
                    let y = tooth.y - tooth.displayHeight / 2;
                    this.showStarAnimation(x, y);
                }

            }
        } else {
            paintToothContainer.list.forEach((tooth) => {
                tooth.input.enabled = false;
            })
        }

        this.dragContainer.addAt(paintToothContainer, 0);
    }

    showGameFailedTipBox() {
        let dialogWrongBox = new DialogWrongBox(this, 0, 0);
        dialogWrongBox.setAlignCenter();

        this.sound.play('dentistDrillEnvironmentSound');
    }



    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
     */
    paintGameScene() {

        this.playLayer = this.add.layer().setDepth(1);
        this.uiLayer = this.add.layer().setDepth(2);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.crocodileMouth = this.add.image(
            this.getColWidth(13.8),
            this.getRowHeight(8),
            'crocodileLongMouth').setScale(0.4);

        let toothsContainer = this.pintTooth(this.question.originalSentence);

        this.dragContainer = this.add.container(0, 0, [
            toothsContainer,
            this.crocodileMouth
        ]);

        this.dropContainer = new AnswerDropZone(this, this.getColWidth(8.5), this.getRowHeight(2.5), this.question);

        this.exitButton = new ExitButton(this, 120, 135);
        this.leftMoveButton = new LeftMoveButton(this, this.getColWidth(10), this.getRowHeight(11), this.dragContainer, this.moveStep,);
        this.rightMoveButton = new RightMoveButton(this, this.getColWidth(11), this.getRowHeight(11), this.dragContainer, this.moveStep);

        this.backgroundLayer.add([this.buildBg('bgProgressGame'), this.exitButton]);
        this.playLayer.add([this.dropContainer, this.dragContainer])
        this.uiLayer.add([this.rightMoveButton, this.leftMoveButton])

        this.uiLayer.setVisible(this.isDisplayDirectionButtonControllers(toothsContainer));
    }

    isDisplayDirectionButtonControllers(toothsContainer) {

        let amountToothsLength = 0;
        let viewWith = this.cameras.main.displayWidth - 200

        toothsContainer.list.forEach(element => {
            let width = element.getByName('toothTexture').displayWidth;
            amountToothsLength += width;
        });

        return amountToothsLength > viewWith;

    }
}