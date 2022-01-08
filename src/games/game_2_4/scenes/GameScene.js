import BasicScene from "./BasicScene"
import ExitButton from '../components/ExitProgressGameButton'
import GameManager from '../components/GameManager';
import { createLionLeftRecorderAnimation } from "../assets/animations/LionLeftRecorderAnimation";
import { createClawAnimation } from "../assets/animations/ClawAnimation";
import GameSprite from "../components/GameSprite";
import { createPenguinAnimation } from "../assets/animations/PenguinAnimation";
import EggAnswerItem from "../components/EggAnswerItem";
import EggQuestion from "../components/EggQuestion";
import ClawBox from "../components/ClawBox";


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
        this.questionDisplayDirection = undefined;

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

        this.createAnimation(this.anims);

        this.paintScene();

        this.generateQuestion();

    }


    createAnimation(animationManager) {
        createLionLeftRecorderAnimation(animationManager);
        createClawAnimation(animationManager);
        createPenguinAnimation(animationManager);
        createClawAnimation(animationManager);
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

        // question = JSON.parse(localStorage.getItem(17));
        console.log("当前抽取的题目:%o", question);

        this.currentQuestionAnswer = question.answer;

        return question;
    }
    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
     */
    paintScene() {

        this.gameLayer = this.add.layer().setDepth(1);
        this.uiLayer = this.add.layer().setDepth(0);

        let exitButton = new ExitButton(this, 120, 135);

        const penguinSprite = new GameSprite(this, 1370, 700, "penguinTexture").setOrigin(0);
        const lionLeftRecorderSprite = new GameSprite(this, 0, 620, "lionLeftRecorderTexture").setOrigin(0);

        const uiEgg = this.add.image(710, 890, 'uiEgg').setOrigin(0);
        const uiRecorder = this.add.image(1920, 840, 'uiRecorder').setOrigin(1, 0);
        uiEgg.setScale(0.5);

        // eggTexture.setFlipX(true);
        const eggAnswerItem = new EggAnswerItem(this, 800, 400, "eggAnswerItemTexture", true);
        console.log(eggAnswerItem);

        const eggQuestion = new EggQuestion(this, 1720, 410, "eggQuestionTexture", false);
        console.log(eggQuestion);

        const clawBox = new ClawBox(this, { x: 500, y: 800 })
        clawBox.showAppearanceAnimation();
        console.log(clawBox);



        this.physics.add.collider(eggAnswerItem, eggQuestion, () => {
            console.log("sdsdsd");
        });

        lionLeftRecorderSprite.play('lionLeftRecorderAnimation');
        penguinSprite.play('penguinAnimation');

        this.uiLayer.add([this.buildBackground('backgroundGamePlay'), lionLeftRecorderSprite, uiEgg, uiRecorder, penguinSprite]);
        this.gameLayer.add([exitButton, eggQuestion, eggAnswerItem, clawBox]);
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
                delay: isFirstError ? 2000 : 5000,
                callback: () => value ? this.scene.start('End') : this.scene.restart('Game')
            });
        }
        );


        if (!_isFirstError) {
            this.answerArea.showCurrentAnswer(this);
        }

        console.log({ _isFirstError });
    }


}