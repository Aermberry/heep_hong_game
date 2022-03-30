import Phaser from 'phaser'
// import DialogWrongBox from "../components/DialogWrongBox"
import {
    createStarAnimations
} from "../assets/animations/StarAnimation"
import AnswerDropZone from "../components/AnswerDropZone"
import BigTooth from "../components/BigTooth"
import CrocodileMouthLow from "../components/CrocodileMouthLow"
import GameManager from '../components/GameManager'
import GameSprite from "../components/GameSprite"
import LeftMoveButton from '../components/LeftMoveButton'
import LoadProgress from "../components/LoadProgress"
import RightMoveButton from '../components/RightMoveButton'
import SmallTooth from "../components/SmallTooth"
import BasicScene from "./BasicScene"

// import FF from '../assets/images/cursor_hand1.png'
export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

        this.leftMoveButton = undefined
        this.rightMoveButton = undefined
        this.stageSlaverSprite = undefined
        this.backgroundLayer = undefined
        this.buttonControllerLayer = undefined
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
        this.background = undefined

    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // this.preloadFromArr({
        // sound: this.sound.add('drums').setLoop(true).play()
        // });

        this.background = this.buildBg('bgProgressGame');
        this.progressLoader = new LoadProgress(this);

        this.cursorHandIcon = require('../assets/images/cursor_hand.png');

        const crocodileColors = {
            'brn': {
                'croco_low_1': require('../assets/images/croco/a_brn_low_long1.png'),
                'croco_low_2': require('../assets/images/croco/a_brn_low_long2.png'),
                'croco_low_3': require('../assets/images/croco/a_brn_low_long3.png'),
                'croco_low_4': require('../assets/images/croco/a_brn_low_long4.png'),
            },
            'grn': {
                'croco_low_1': require('../assets/images/croco/a_grn_low_long1.png'),
                'croco_low_2': require('../assets/images/croco/a_grn_low_long2.png'),
                'croco_low_3': require('../assets/images/croco/a_grn_low_long3.png'),
                'croco_low_4': require('../assets/images/croco/a_grn_low_long4.png'),
            },
            'gry': {
                'croco_low_1': require('../assets/images/croco/a_gry_low_long1.png'),
                'croco_low_2': require('../assets/images/croco/a_gry_low_long2.png'),
                'croco_low_3': require('../assets/images/croco/a_gry_low_long3.png'),
                'croco_low_4': require('../assets/images/croco/a_gry_low_long4.png'),
            },
            'org': {
                'croco_low_1': require('../assets/images/croco/a_org_low_long1.png'),
                'croco_low_2': require('../assets/images/croco/a_org_low_long2.png'),
                'croco_low_3': require('../assets/images/croco/a_org_low_long3.png'),
                'croco_low_4': require('../assets/images/croco/a_org_low_long4.png'),
            },
            'pur': {
                'croco_low_1': require('../assets/images/croco/a_pur_low_long1.png'),
                'croco_low_2': require('../assets/images/croco/a_pur_low_long2.png'),
                'croco_low_3': require('../assets/images/croco/a_pur_low_long3.png'),
                'croco_low_4': require('../assets/images/croco/a_pur_low_long4.png'),
            }
        }

        const colors = [
            'brn', 'grn', 'gry', 'org', 'pur'
        ];

        const crocoColorName = colors[Math.round(Math.random() * 4)]

        const currentCrocodileColor = crocodileColors[crocoColorName]

        const imageFiles = {
            'crocoBed': require('../assets/images/croco/bed.png')
        };

        Object.keys(currentCrocodileColor).forEach((key) => {
            imageFiles[key] = currentCrocodileColor[key]
        })

        this.preloadFromArr({
            'img': imageFiles
        });
    }

    create() {

        super.create();

        this.sys.game.globals.gtag.event(`game_${this.sys.game.globals.gameStageIndex}_start`, {
            'event_category': 'js_games',
            'event_label': 'Game Start'
        });


        createStarAnimations(this.anims);

        // this.input.setDefaultCursor(`url(${FF}), pointer`);
        this.input.setDefaultCursor(`url(${this.cursorHandIcon}), pointer`);

        this.question = this.generateQuestion();

        this.paintGameScene();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {

        if (this.leftMoveButton && this.rightMoveButton)

            if (this.cursors.left.isDown) {
                this.leftMoveButton.onDownClicked();
            } else {
                this.leftMoveButton.onUpClicked();
            }

            if (this.cursors.right.isDown) {
            this.rightMoveButton.onDownClicked();
            } else {
                this.rightMoveButton.onUpClicked();
            }
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
            // this.questionIndex = 10;

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

            currentTooth.enableGestureEventListener();

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


        if (this.buttonControllerLayer.count() != 0) {
            this.buttonControllerLayer.setVisible(false);
            this.buttonControllerLayer.getChildren().forEach((button) => {
                button.unableTouchEventListener();
            })

        }

        GameManager.getInstance().updateGameQuestionNumberList(this.questionIndex);

        GameManager.getInstance().updateGamePlayTotal(() => {

            this.showCorrectAnswer(true);

            this.sound.play('popOffEffectSound');

            this.time.addEvent({
                delay: 500,
                callback: () => this.sound.play('childClapEffectSound')
            })

            let currentAnswerVoice = this.sound.add('voiceAnswer' + this.questionIndex);

            currentAnswerVoice.on('complete', () => {
                // console.log("currentAnswerVoice");
                this.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        GameManager.getInstance().isLastQuestion ? this.scene.get('GameUI').scene.start() : this.scene.get('GameUI').scene.start('EndUI')
                    }
                })
            });

            currentAnswerVoice.play();
        });
    }

    showStarAnimation(x, y) {
        let startAnimation = new GameSprite(this, x, y, 'star_idleStateAnimation').setScale(0.4);
        this.dragContainer.add(startAnimation);
    }

    paintGameFailed(gameObject) {
        GameManager.getInstance().setGameQuestionError(this.questionIndex, (isFirstError, value) => {
            if (isFirstError) {

                gameObject.showErrorStatues();

                const firstErrorEffectSound = this.sound.add('firstErrorEffectSound');

                firstErrorEffectSound.once('complete', () => {

                    gameObject.hideErrorStatues();
                })

                firstErrorEffectSound.play();

            } else {
                this.scene.run('SecondError');

                this.scene.sleep();

                this.events.once('wake', () => {

                    const currentAnswerVoice = this.sound.add('voiceAnswer' + this.questionIndex);

                    currentAnswerVoice.once('complete', () => {
                        this.time.addEvent({
                            delay: 1000,
                            callback: () => {
                                value ? this.scene.get('GameUI').scene.start('EndUI') : this.scene.start('Game')

                            }
                        })
                    });

                    this.showCorrectAnswer(false);
                    currentAnswerVoice.play();
                })
            }
        });
    }

    showCorrectAnswer(isSuccess) {
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

        this.dragContainer.x = 0; //将dragContainer放置回初始位置

        this.dragContainer.addAt(paintToothContainer, 0);
    }

    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
     */
    paintGameScene() {

        this.playLayer = this.add.layer().setDepth(1);
        0
        this.buttonControllerLayer = this.add.layer().setDepth(2);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.crocodileMouthContainer = new CrocodileMouthLow(this, this.getColWidth(4.6), this.getRowHeight(6.75))

        this.data.set("crocodileMouthContainerOriginPosition", {
            x: this.crocodileMouthContainer.x,
            y: this.crocodileMouthContainer.y
        });

        let toothsContainer = this.pintTooth(this.question.originalSentence);

        this.dragContainer = this.add.container(0, 0, [
            toothsContainer,
            this.crocodileMouthContainer
        ]);

        this.dropContainer = new AnswerDropZone(this, this.getColWidth(8.5), this.getRowHeight(2.5), this.question);

        this.buildControllerButtons(this.isDisplayDirectionButtonControllers(toothsContainer));

        this.backgroundLayer.add([this.background]);
        this.playLayer.add([this.dropContainer, this.dragContainer]);
    }

    buildControllerButtons(isBuild) {
        if (isBuild) {
            this.leftMoveButton = new LeftMoveButton(this, this.getColWidth(10), this.getRowHeight(11), this.dragContainer, this.moveStep, );
            this.rightMoveButton = new RightMoveButton(this, this.getColWidth(11), this.getRowHeight(11), this.dragContainer, this.moveStep);
            this.buttonControllerLayer.add([this.rightMoveButton, this.leftMoveButton])
        }
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