import BasicScene from "./BasicScene"
import ExitButton from '../components/ExitButton'
import LeftMoveButton from '../components/LeftMoveButton'
import RightMoveButton from '../components/RightMoveButton'

export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });

        this.exitBtn = undefined
        this.leftMoveBtn = undefined
        this.rightMoveBtn = undefined
        this.stageSlaver = undefined
        this.backgroundLayer = undefined
        this.uiLayer = undefined
        this.playLayer = undefined
        this.crocodileMouth = undefined

    }

    init() {

        this.dataModal = this.sys.game.globals.model;
        console.log("dataModal:")
        console.log(this.dataModal.gameItems);

    }

    preload() {

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        this.preloadFromArr({
            sound: this.sound.add('drums').setLoop(true).play()
        });

        this.createProgressBar();

    }

    create() {

        super.create();




        const items = this.dataModal.gameItems

        let itemInd = Math.floor(Math.random() * items.length)

        this.item = items[itemInd]

        this.answers = [];

        this.allAnswers = this.dataModal.gameAnswers

        this.allAnswers.some((answer, ind) => {

            if (answer.index === this.item.answer) {

                this.answers.push(this.allAnswers.splice(ind, 1)[0])

                return true;

            }

        })

        this.answers.push(this.allAnswers[Math.floor(this.allAnswers.length * Math.random())])

        this.paintGameScene();

    }

    /**
     * load question data
     * 生成题目

      */
    generateQuestion() {

    }

    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
    */
    paintGameScene() {

        this.playLayer = this.add.layer().setDepth(1);
        this.uiLayer = this.add.layer().setDepth(2);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.stageSlaverSprite = this.add.image(this.getColWidth(9), this.getRowHeight(2.5), 'stageSalver').setScale(0.5)
        this.crocodileMouth = this.add.image(this.getColWidth(9.4), this.getRowHeight(8), 'crocodileMouth').setScale(0.4)

        this.exitButton = new ExitButton(this, 120, 135);
        this.leftMoveButton = new LeftMoveButton(this, this.getColWidth(10), this.getRowHeight(11), this.crocodileMouth);
        this.rightMoveButton = new RightMoveButton(this, this.getColWidth(11), this.getRowHeight(11), this.crocodileMouth);

        this.backgroundLayer.add([this.buildBg('bgProgressGame'), this.exitButton]);
        this.uiLayer.add([this.stageSlaverSprite, this.rightMoveButton, this.leftMoveButton])
        this.playLayer.add([this.crocodileMouth])

    }

    /**
     * 生成题目
     * generate a question from question json file
      */
}