import BasicScene from "./BasicScene"
import ExitButton from '../components/ExitButton'
import LeftMoveButton from '../components/LeftMoveButton'
import RightMoveButton from '../components/RightMoveButton'
import BigTooth from "../components/BigTooth"
import SmallTooth from "../components/SmallTooth"
import LocalRepository from "../repository/local_repository"
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

        // console.log(this.questions)
        // console.log(this.questions.length)

        // console.log(this.generateQuestion(this.questions))

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
        let container = this.add.container(-150, 0);
        let previousToothWidth = 0;
        let currentToothWidth = 0;
        let currentTooth = undefined;
        let OffsetFromTheFirst = 0;

        // originalSentence.map(value => console.log(value + ":" + value.length))
        originalSentence.map(value => {
            // if (value.length > 3) {
            //     // new BigTooth(this, 500, 680, value, 'stageBigTooth');
            //     // console.log(value);
            //     // var big = new BigTooth(this, 500, 680, value, 'stageBigTooth');
            //     // currentToothWidth=big.getImageWidth();
            //     // console.log(big.getImageWidth())
            //     // container.add(big);
            //     currentTooth = new BigTooth(this, 500, 680, value, 'stageBigTooth');
            // }
            // else {

            //     // console.log(value)
            //     // var small = new SmallTooth(this, 1000, 680, value, 'stageSmallTooth')
            //     // container.add(small);
            //     currentTooth = new SmallTooth(this, 1000, 680, value, 'stageSmallTooth');
            // }

            currentTooth = value.length > 3 ? new BigTooth(this, 500 + OffsetFromTheFirst, 680, value, 'stageBigTooth') : new SmallTooth(this, 500 + OffsetFromTheFirst, 680, value, 'stageSmallTooth');
            currentToothWidth = currentTooth.getImageWidth();
            previousToothWidth = currentToothWidth;
            OffsetFromTheFirst += previousToothWidth

        })

        // for(var i=0;i<originalSentence.length;i++){



        // if(originalSentence[i]>3){
        //     new BigTooth(this, 500, 680, value, 'stageBigTooth');
        // }else{

        // }

        // container.add(new BigTooth(this, 500, 680, value, 'stageBigTooth'));
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

        this.exitButton = new ExitButton(this, 120, 135);
        this.leftMoveButton = new LeftMoveButton(this, this.getColWidth(10), this.getRowHeight(11), this.crocodileMouth);
        this.rightMoveButton = new RightMoveButton(this, this.getColWidth(11), this.getRowHeight(11), this.crocodileMouth);

        // this.bigTooth = new BigTooth(this, 500, 500, 'dssdsd', 'stageBigTooth');
        // this.smallTooth = new SmallTooth(this, 1000, 500, 'dssdsd', 'stageSmallTooth')
        // console.log(this.bigTooth)
        var dd = this.pintTooth(this.questions);

        console.log(dd.getAll())

        this.backgroundLayer.add([this.buildBg('bgProgressGame'), this.exitButton]);
        this.uiLayer.add([this.stageSlaverSprite, this.rightMoveButton, this.leftMoveButton])
        this.playLayer.add([dd, this.crocodileMouth])

    }

    /**
     * 生成题目
     * generate a question from question json file
      */
}