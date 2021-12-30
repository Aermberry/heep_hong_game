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
// import TweenAnimation from "../components/TweenAnimation";

export default class GameScene extends BasicScene {

    constructor() {
        super('Game');

        this.gameLayer = undefined
        this.questionNumberList = []

        this.questionIndex = undefined
        this.backgroundLayer = undefined
        this.gameFailedLayer = undefined

        this.currentQuestionAnswer = undefined
    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // this.preloadFromArr({
        // sound: this.sound.add('drums').setLoop(true).play()
        // });


    }

    create() {

        super.create();



        createEggTwistingMachineAnimation(this.anims);
        createStarAnimation(this.anims);
        this.paintGameScene(this);




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
        console.log("当前抽取的题目:%o", question);
        // question = JSON.parse(localStorage.getItem(8));
        this.currentQuestionAnswer = question.answer;

        return question;
    }
    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
     */
    paintGameScene() {
        this.gameLayer = this.add.layer().setDepth(1);
        this.backgroundLayer = this.add.layer().setDepth(0);

        let egg = new GameSprite(this, 400, 720, 'eggOrange');
        egg.setScale(0.5);

        const shape = this.make.graphics();
        shape.fillStyle(0xffffff);
        shape.beginPath();
        shape.fillRect(100, 870, 500, 600);
        
        const mask = shape.createGeometryMask();
        egg.setMask(mask);

        let eggTwistingMachineAnimation = new GameSprite(this, 960, 540, 'eggTwistingMachineTexture');
        eggTwistingMachineAnimation.on("animationcomplete", () => {
            this.add.tween({
                targets: this.cameras.main.setOrigin(0, 1),
                x: -400,
                zoom: 2.6,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.add.tween({
                        targets: egg,
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
                        }
                    });


                }
            });
        });
        eggTwistingMachineAnimation.play('eggTwistingMachineAnimation');

        let answerArea = new AnswerArea(this, this.generateQuestion());


        let exitButton = new ExitButton(this, 120, 135);

        this.backgroundLayer.add([this.buildBg('backgroundGamePlay'), eggTwistingMachineAnimation, answerArea]);
        this.gameLayer.add([exitButton]);
    }

    paintGameSuccess() {
        GameManager.getInstance().updateGameQuestionNumberList(this.questionIndex);
        GameManager.getInstance().updateGamePlayTotal((value) => {
            this.time.addEvent({
                delay: 1000,
                callback: () => this.scene.start(value ? 'Game' : 'End')
            })
        });


        // this.sound.add('starEffectSound').play();
    }


    paintGameFailed() {

        let _isFirstError = null;

        GameManager.getInstance().setGameQuestionError(this.questionIndex, (isFirstError, value) => {

            _isFirstError = isFirstError;
            console.log({ isLastQuestion: value })
            this.time.addEvent({
                delay: isFirstError ? 1000 : 2000,
                callback: () => value ? this.scene.start('End') : this.scene.restart('Game')
            });
        }
        );

        console.log({ _isFirstError });
    }


}