
import BasicScene from "./BasicScene"
import Doll from '../components/Doll';
import Clip from '../components/Clip';
import ExitButton from '../components/ExitButton'
import TextDropBox from '../components/TextDropBox';
import ContainerBox from "../components/ContainerBox";
import LeftControllerButton from '../components/LeftControllerButton';
import RightControllerButton from '../components/RightControllerButton';
import DownControllerButton from '../components/DownControllerButton';
import {
    createClipAnimations
} from '../assets/animations/ClipAnimation';
import {
    createGameStatusAnimations
} from '../assets/animations/GameStatusAnimation';
import GameSprite from '../components/GameSprite';
import GameManager from '../components/GameManager';
// import Colors from "../styles/Colors";


export default class GameScene extends BasicScene {

    constructor() {
        super('Game');

        this.dolls = []
        this.lights = []
        this.playLayer = undefined
        this.questionNumberList = []
        this.retryButton = undefined
        this.questionIndex = undefined
        this.backgroundLayer = undefined
        this.gameFailedLayer = undefined
        this.currentDollIndex = undefined;
        this.currentQuestionAnswer = undefined
    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // this.preloadFromArr({
        // sound: this.sound.add('drums').setLoop(true).play()
        // });

        this.currentDollIndex = 1;

    }

    update(){
        console.log(this.currentDollIndex);
    }

    create() {

        super.create();
        
        this.sound.stopAll();

        createClipAnimations(this.anims);
        createGameStatusAnimations(this.anims);
        this.paintGameScene(this);
        // Phaser.physics.add.overlap(this.clip, this.yellowDoll);

        this.playBackgroundMusic('clipDollTableEffectSound', 'gamePlaySceneBackgroundMusic');

    }

    playBackgroundMusic(startSound, backgroundSound) {

        const clipDollTableEffectSound = this.sound.add(startSound);
        const backgroundMusic = this.sound.add(backgroundSound, {
            volume: 0.2,
            loop: true
        });

        clipDollTableEffectSound.on('complete', () => {
            backgroundMusic.play();
        })

        clipDollTableEffectSound.play();
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
        // question = JSON.parse(localStorage.getItem(8));
        this.currentQuestionAnswer = question.answer;

        return question;
    }
    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
     */
    paintGameScene() {
        this.playLayer = this.add.layer().setDepth(1);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.dolls = [
            new Doll(this, this.getColWidth(3.5), this.getRowHeight(3.8), "yellowDoll", "的"),
            new Doll(this, this.getColWidth(6), this.getRowHeight(4), "blueDoll", "地"),
            new Doll(this, this.getColWidth(8.5), this.getRowHeight(4), "pinkDoll", "得")
        ];

        let exitButton = new ExitButton(this, 120, 135);

        let clip = new Clip(this, 970, -250, this.dolls);

        let textDropBox = new TextDropBox(this, this.getColWidth(6), this.getRowHeight(8.2), this.generateQuestion(), clip);

        let buttonMoveLeftControl = new LeftControllerButton(this, this.getColWidth(0.6), this.getRowHeight(1.1), 20, clip, this.dolls);
        let buttonMoveDownControl = new DownControllerButton(this, this.getColWidth(1.8), this.getRowHeight(1.1), 20, clip);
        let buttonMoveRightControl = new RightControllerButton(this, this.getColWidth(3.0), this.getRowHeight(1.1), 20, clip, this.dolls);

        let gameButtonControllers = new ContainerBox({
            "scene": this,
            "x": this.getColWidth(7.2),
            "y": this.getRowHeight(9.84),
            "width": 580,
            "height": 188,
        });

        gameButtonControllers.add([buttonMoveLeftControl, buttonMoveDownControl, buttonMoveRightControl]);

        this.backgroundLayer.add([this.buildBg('bgProgressGame')]);
        this.playLayer.add([textDropBox, gameButtonControllers, exitButton]);
    }

    paintGameSuccess(doll) {

        GameManager.getInstance().updateGameQuestionNumberList(this.questionIndex);
        GameManager.getInstance().updateGamePlayTotal((value) => {
            this.time.addEvent({
                delay: 2000,
                callback: () => this.scene.start(value ? 'Game' : 'End')
            })
        });

        let targetPosition = JSON.parse(localStorage.getItem('targetPosition'));
        this.playLayer.add(new GameSprite(this, targetPosition.x + doll.x, targetPosition.y + doll.y - 500, "gameSuccessAnimation"));
        this.sound.add('starEffectSound').play();
    }


    paintGameFailed(clipBox) {

        let doll = clipBox.list[1];


        let errorSprite = null;
        let _isFirstError = null;
        let targetPosition = JSON.parse(localStorage.getItem('targetPosition'));


        GameManager.getInstance().setGameQuestionError(this.questionIndex, (isFirstError, value) => {

            _isFirstError = isFirstError;
            console.log({ isLastQuestion: value })
            this.time.addEvent({
                delay: isFirstError ? 2000 : 10000,
                callback: () => value ? this.scene.start('End') : this.scene.restart('Game')
            });
        }
        );

        errorSprite = new GameSprite(this, targetPosition.x + doll.x, targetPosition.y + doll.y - 500, "gameFailAnimation")

        errorSprite.on('animationcomplete', () => {
            if (!_isFirstError) {
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.resetClipBox(clipBox);

                        this.showLightToCorrectDoll();
                    }
                })
            }
        })

        this.sound.add('electricShockEffectSound').play();

        this.playLayer.add(errorSprite);
    }

    resetClipBox(clipBox) {
        let doll = clipBox.list[1];
        let clip = clipBox.list[0];

        clipBox.removeAll();
        clipBox.destroy(true);

        clip.x = 1600;
        clip.y = -250;

        clip.setFrame(0);

        doll.x = doll.originX;
        doll.y = doll.originY;
    }

    showLightToCorrectDoll() {

        let lights = [
            this.add.image(this.getColWidth(3.5), this.getRowHeight(2.5), 'light'),
            this.add.image(this.getColWidth(6), this.getRowHeight(2.5), 'light'),
            this.add.image(this.getColWidth(8.5), this.getRowHeight(2.5), 'light'),
        ];

        let index = this.dolls.findIndex((element) => element.name == this.currentQuestionAnswer);

        lights.forEach((light) => light.setAlpha(0));
        this.sound.play('spotlightFocusEffectSound');

        this.tweens.add(
            {
                targets: lights[index],
                alpha: 1,
                ease: 'Bounce',
                duration: 1000
            });
    }
}