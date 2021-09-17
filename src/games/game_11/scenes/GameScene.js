import BasicScene from "./BasicScene"
import ExitButton from '../components/ExitButton'
import LeftMoveButton from '../components/LeftMoveButton'
import RightMoveButton from '../components/RightMoveButton'
import BigTooth from "../components/BigTooth"
import SmallTooth from "../components/SmallTooth"
import LocalRepository from "../repository/LocalRepository"
import Phaser from 'phaser'

export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

        this.exitButton = undefined
        this.leftMoveButton = undefined
        this.rightMoveButton = undefined
        this.stageSlaverSprite = undefined
        this.backgroundLayer = undefined
        this.uiLayer = undefined
        this.playLayer = undefined
        this.crocodileMouth = undefined
        this.localRepository = new LocalRepository()
        this.questions = undefined

    }

    init() {

        // this.dataModal = this.sys.game.globals.model;
        // console.log("dataModal:")
        // console.log(this.dataModal.gameItems);

    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        this.preloadFromArr({
            sound: this.sound.add('drums').setLoop(true).play()
        });

        this.questions = this.localRepository.loadData();

        this.createProgressBar();

    }

    create() {

        super.create();

        // const items = this.dataModal.gameItems

        // let itemInd = Math.floor(Math.random() * items.length)

        // this.item = items[itemInd]

        // this.answers = [];

        // this.allAnswers = this.dataModal.gameAnswers

        // this.allAnswers.some((answer, ind) => {

        //     if (answer.index === this.item.answer) {

        //         this.answers.push(this.allAnswers.splice(ind, 1)[0])

        //         return true;

        //     }

        // })

        // this.answers.push(this.allAnswers[Math.floor(this.allAnswers.length * Math.random())])

        this.paintGameScene();

    }

    /**
     * generate a question from the local question data
     * 从题库中随机抽取一道题目
      */
    generateQuestion(data) {
        if (data != undefined) {
            return data[Phaser.Math.Between(0, this.questions.length)];
        } else {
            console.log('ddddddd')
        }
    }

    /* 
     * paint tooth
     * 绘制牙齿
     * 
     */
    pintTooth(value) {
        const originalSentence = this.generateQuestion(value).originalSentence;
        let container = this.add.container(0, 0);
        let previousToothWidth = 0;
        let currentToothWidth = 0;
        let currentTooth = undefined;
        let nextToothOffsetX = 280;

        // originalSentence.map(value => {
        //     currentTooth = value.length > 3 ? new BigTooth(this, nextToothOffsetX, 680, value, 'stageBigTooth') : new SmallTooth(this, nextToothOffsetX, 680, value, 'stageSmallTooth');
        //     currentToothWidth = currentTooth.getImageWidth();
        //     previousToothWidth = currentToothWidth;
        //     nextToothOffsetX += previousToothWidth

        // })
        // originalSentence.map(value => {

        //     if (previousTooth != undefined) {
        //         console.log(currentTooth.type);
        //         console.log(previousTooth.type);
        //         console.log('dsdsdsdsd')
        //         if (currentTooth.type != previousTooth.type) {
        //             nextToothOffsetX += 70
        //         }
        //     }

        //     currentTooth = value.length > 3 ? new BigTooth(this, nextToothOffsetX, 680, value, 'stageBigTooth') : new SmallTooth(this, nextToothOffsetX, 680, value, 'stageSmallTooth');
        //     // currentTooth= new BigTooth(this, nextToothOffsetX, 680, value, 'stageBigTooth')
        //     container.add(currentTooth);

        //     currentToothWidth = currentTooth.getImageWidth();
        //     previousToothWidth = currentToothWidth;
        //     previousTooth = currentTooth;

        //     console.log(container.count('visible', true))

        //     nextToothOffsetX += previousToothWidth
        // })

        for (let index = 0; index < originalSentence.length; index++) {
            const element = originalSentence[index];

            // console.log(container.getAll())

            if (element.length > 3) {
                currentTooth = new BigTooth(this, nextToothOffsetX, 680, element, 'stageBigTooth')

            } else {
                currentTooth = new SmallTooth(this, nextToothOffsetX, 680, element, 'stageBigTooth')
            }



            container.add(currentTooth);

            currentToothWidth = currentTooth.getImageWidth();



            if (index != 0) {
                console.log(container.getAll()[index - 1])


                if (currentToothWidth != container.getAll()[index - 1].getImageWidth()) {
                    let offsetValue = Math.abs(currentToothWidth - container.getAll()[index - 1].getImageWidth())
                    if (currentToothWidth > container.getAll()[index - 1].getImageWidth()) {

                        previousToothWidth = currentToothWidth + offsetValue;
                    }
                    else if (currentToothWidth < container.getAll()[index - 1].getImageWidth()) {
                        previousToothWidth = currentToothWidth - offsetValue;
                    }
                }
                else {
                    previousToothWidth = currentToothWidth;
                }
            }

            nextToothOffsetX += previousToothWidth
        }

        // 216 352.5
        // // for (let i = 0; i < originalSentence.length; i++) {

        // //     if (i == 0) {
        // //         if (originalSentence[i].length > 3) {
        // //             currentTooth = new BigTooth(this, nextToothOffsetX, 680, originalSentence[i], 'stageBigTooth');
        // //         }
        // //         else {
        // //             currentTooth = new SmallTooth(this, nextToothOffsetX, 680, originalSentence[i], 'stageSmallTooth');
        // //         }
        // //         previousToothWidth = currentToothWidth = currentTooth.getImageWidth();

        // //         console.log(i)
        // //         console.log(i + ":" + previousToothWidth)
        // //         console.log("nextToothOffsetX:" + nextToothOffsetX)
        // //         console.log('-------')
        // //     }
        // //     // previousTooth = currentTooth;
        // //     if (originalSentence[i].length > 3) {
        // //         console.log("index:" + i)
        // //         console.log("bigTooth:")
        // //         console.log("previousToothWidth:" + previousToothWidth)
        // //         console.log("offset:" + nextToothOffsetX)
        // //         currentTooth = new BigTooth(this, nextToothOffsetX, 680, originalSentence[i]);
        // //         console.log("第" + i + "个的With:" + currentTooth.getImageWidth())
        // //         console.log(currentTooth.originX)
        // //         console.log(currentTooth.displayOriginX)

        // //     }
        // //     else {
        // //         console.log("index:" + i)
        // //         console.log("smallTooth:")
        // //         console.log("previousToothWidth:" + previousToothWidth)
        // //         console.log("offset:" + nextToothOffsetX)
        // //         currentTooth = new SmallTooth(this, nextToothOffsetX, 680, originalSentence[i]);
        // //         console.log("第" + i + "个的With:" + currentTooth.getImageWidth())
        // //         console.log(currentTooth.originX)
        // //         console.log(currentTooth.displayOriginX)
        // //     }

        // //     if (currentToothWidth != previousToothWidth) {
        // //         nextToothOffsetX = nextToothOffsetX + currentToothWidth - 70;
        // //         previousToothWidth = currentToothWidth
        // //     } else {

        // //         //下一个的坐标
        // //         currentToothWidth = currentTooth.getImageWidth();
        // //         nextToothOffsetX += currentToothWidth;
        // //         console.log("nextToothOffsetX:" + nextToothOffsetX)
        // //         console.log('..');
        // //     }

        //     container.add(currentTooth);

        // }

        return container
    }

    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
    */
    paintGameScene() {

        this.playLayer = this.add.layer().setDepth(1);
        this.uiLayer = this.add.layer().setDepth(2);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.stageSlaverSprite = this.add.image(this.getColWidth(9), this.getRowHeight(2.5), 'stageSalver').setScale(0.5);
        this.crocodileMouth = this.add.image(this.getColWidth(9.4), this.getRowHeight(8), 'crocodileMouth').setScale(0.4);

        this.container = this.add.container(0, 0, [
            this.pintTooth(this.questions),
            this.crocodileMouth]);

        this.exitButton = new ExitButton(this, 120, 135);
        this.leftMoveButton = new LeftMoveButton(this, this.getColWidth(10), this.getRowHeight(11), this.container);
        this.rightMoveButton = new RightMoveButton(this, this.getColWidth(11), this.getRowHeight(11), this.container);

        this.backgroundLayer.add([this.buildBg('bgProgressGame'), this.exitButton]);
        this.uiLayer.add([this.stageSlaverSprite, this.rightMoveButton, this.leftMoveButton])
        this.playLayer.add([this.container])

    }

    /**
     * 生成题目
     * generate a question from question json file
      */
}