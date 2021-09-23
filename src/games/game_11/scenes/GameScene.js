import BasicScene from "./BasicScene"
import ExitButton from '../components/ExitButton'
import LeftMoveButton from '../components/LeftMoveButton'
import RightMoveButton from '../components/RightMoveButton'
import BigTooth from "../components/BigTooth"
import SmallTooth from "../components/SmallTooth"
import LocalRepository from "../repository/LocalRepository"
import Phaser from 'phaser'

import AnswerDropZone from "../components/AnswerDropZone"
import RetryBtn from "../components/RetryButton"

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
        this.localRepository = new LocalRepository()
        this.question = undefined
        this.dragContainer = undefined
        this.dropContainer = undefined
    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        this.preloadFromArr({
            sound: this.sound.add('drums').setLoop(true).play()
        });

        this.question = this.generateQuestion(this.localRepository.loadData());

        this.createProgressBar();

    }

    create() {

        super.create();

        this.paintGameScene(this);
    }

    /**
     * generate a question from the local question data
     * 从题库中随机抽取一道题目
      */
    generateQuestion(data) {
        if (data != undefined) {
            return data[Phaser.Math.Between(0, data.length)];
        } else {
            console.log('ddddddd')
        }
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

        bigTooth.destroy();
        smallTooth.destroy();

        console.log(bigToothWidth);
        console.log(smallToothWidth);


        for (let index = 0; index < question.length; index++) {

            const element = question[index];

            if (element.length > 3) {
                currentToothWidth = bigToothWidth;

            } else {
                currentToothWidth = smallToothWidth;
            }

            if (container.getAll().length > 0) {
                console.log(index);
                console.log(container.getAll().length);
                if (currentToothWidth != container.getAll()[index - 1].displayWidth) {
                    currentOffsetX += (currentToothWidth + container.getAll()[index - 1].displayWidth) / 2;
                }
                else {
                    currentOffsetX += currentToothWidth;
                }
            }
            else {
                currentOffsetX += currentToothWidth / 2
            }

            if (element.length > 3) {
                currentTooth = new BigTooth(this, currentOffsetX, 680, element)
            }
            else {
                currentTooth = new SmallTooth(this, currentOffsetX, 680, element)
            }

            container.add(currentTooth);
        }
        console.log(container.getAll());

        return container
    }

    paintGameSuccess() {
        this.dragContainer.removeAt(0,true)
        this.dragContainer.addAt(this.pintTooth(this.question.answer), 0);
    }

    paintGameFailed() {

        this.playLayer.setVisible(false);
        this.uiLayer.setVisible(false);

        this.buildBg('bgProgressGame')

        this.retryButton = new RetryBtn(this, this.cameras.main.width / 2 + 80, this.cameras.main.height / 2 + 180);
        this.gameFailedLayer = this.add.layer().setDepth(1);
        this.gameFailed = this.add.image(1450, 350, 'bgGameFailed').setScale(0.35);

        this.failedText = this.make.text({
            x: this.cameras.main.width / 2,
            y: this.cameras.main.height / 2,
            text: '失败了',
            style: {
                font: '60px',
                fill: '#fff'
            }
        });
        console.log(this.cameras.main.width / 2);
        console.log(this.cameras.main.height / 2);

        this.gameFailedLayer.add([this.gameFailed, this.retryButton, this.failedText, this.exitButton]);
    }


    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
    */
    paintGameScene() {

        this.playLayer = this.add.layer().setDepth(1);
        this.uiLayer = this.add.layer().setDepth(2);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.crocodileMouth = this.add.image(this.getColWidth(9.4), this.getRowHeight(8), 'crocodileMouth').setScale(0.4);


        this.dropContainer = new AnswerDropZone(this, this.getColWidth(8.5), this.getRowHeight(2.5), this.question)
        this.dragContainer = this.add.container(0, 0, [
            this.pintTooth(this.question.originalSentence),
            this.crocodileMouth]);

        this.exitButton = new ExitButton(this, 120, 135);
        this.leftMoveButton = new LeftMoveButton(this, this.getColWidth(10), this.getRowHeight(11), this.dragContainer);
        this.rightMoveButton = new RightMoveButton(this, this.getColWidth(11), this.getRowHeight(11), this.dragContainer);


        this.backgroundLayer.add([this.buildBg('bgProgressGame'), this.exitButton]);
        this.playLayer.add([this.dropContainer, this.dragContainer])
        this.uiLayer.add([this.rightMoveButton, this.leftMoveButton])
    }
}