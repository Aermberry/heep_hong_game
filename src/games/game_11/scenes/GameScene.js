import BasicScene from "./BasicScene"
import Truck from "../objects/players/Truck"
import Scene1Block from "../objects/targets/Scene1Block"
import Untils from "../../common/Untils";
export default class GameScene extends BasicScene {


    constructor() {
        super('Game');

        // this.dataModal = this.sys.game.globals.model;
        this.cursorKeys = null
        this.playerOnLeft = true
        this.totalSocre = 0
        this.blockClassMap = {
            'Scene1Block': Scene1Block
        }
        this.playerClassMap = {
            'Truck': Truck
        }


        this.itemBlockClass = null
        this.playerClass = null

    }

    init() {

        this.roadBlock = null

        this.dataModel = this.sys.game.globals.model;

        this.itemBlockClass = this.blockClassMap[this.dataModel.blockItem]
        this.playerClass = this.playerClassMap[this.dataModel.playerItem]

        this.anims.create({
            key: 'road',
            repeat: -1,
            frames: this.anims.generateFrameNames('road', { prefix: 'road_move', start: 0, end: 5, zeroPad: 4 }),
        });

    }

    preload() {

        let blockAssets = this.itemBlockClass.getAssetArray()
        let playerAssets = this.playerClass.getAssetArray()

        const imageFiles = {
            'end_box': require('../assets/images/end_box.png'),
            ...blockAssets.img,
            ...playerAssets.img
        }

        const atlasFiles = {
            'end_pic': { img: require('../assets/anims/end_pic.png'), data: require('../assets/anims/end_pic.json') },
            ...blockAssets.atlas,
            ...playerAssets.atlas
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        })

    }

    _handleGameData(correctArr = [], wrongArr = []) {

        let result = []

        let index = 0
        let curCorrect = null
        let curWrong = null
        while (correctArr.length > 0) {
            curCorrect = correctArr.pop()
            if (typeof wrongArr[index] == 'undefined') index = 0
            curWrong = wrongArr[index++]
            result.push(
                {
                    answers: Math.random() > 0.5 ? [curCorrect, curWrong] : [curWrong, curCorrect],
                    correctAnswer: curCorrect
                }
            )
        }

        return result

    }

    create() {

        super.create()

        let backGround = this.add.image(this.getColWidth(6), this.getRowHeight(3), 'scene1_1')
        let foreGround = this.add.image(this.getColWidth(0), this.getRowHeight(4), 'scene1_2')
        let road = this.add.sprite(this.getColWidth(6), this.getRowHeight(9.4), 'road')

        backGround.setDepth(0)
        foreGround.setDepth(2)
        road.setDepth(3)


        // this.add.image(this.getColWidth(6), this.getRowHeight(6), 'scene1_box')

        foreGround.setOrigin(0)
        backGround.setOrigin(0.5)
        road.setOrigin(0.5)

        road.play('road')

        this.player = new this.playerClass(this, this.getColWidth(4.5), this.getRowHeight(9.5), this.dataModel.gameQuestion)

        this.player.setDepth(5)

        this.add.existing(this.player)


        this.cursorKeys = this.input.keyboard.createCursorKeys()





        let gameData = this._handleGameData(Untils.shuffle(this.dataModel.gameAnswers.correct), Untils.shuffle(this.dataModel.gameAnswers.misc))

        this.recurringAnswerBlock(gameData)

    }


    update() {

        if (this.cursorKeys.left.isDown && !this.playerOnLeft) {
            this.player.toLeft(this.player.x - 500).then(() => this.playerOnLeft = true)
        }

        if (this.cursorKeys.right.isDown && this.playerOnLeft) {
            this.player.toRight(this.player.x + 500).then(() => this.playerOnLeft = false)

        }

    }

    recurringAnswerBlock(gameDataArr = []) {


        gameDataArr.reduce((lastPromise, nextAnswer, ind) => {

            return lastPromise.then(() => {

                if (this.roadBlock != null && typeof this.roadBlock.destroy == 'function') this.roadBlock.destroy()

                this.roadBlock = new this.itemBlockClass(
                    this,
                    this.getColWidth(5.95),
                    this.getRowHeight(5),
                    nextAnswer,
                    {
                        checkAnswer: () => {
                            let attempedItem = this.roadBlock.getItem(this.playerOnLeft ? 'left' : 'right')

                            let currentResult = attempedItem.getAnswerValue() === nextAnswer.correctAnswer

                            if (currentResult) {
                                attempedItem.playCorrect()
                                this.totalSocre++;
                            } else {
                                attempedItem.playWrong()
                            }
                        },
                        speedFactor: 1 - (0.07 * ind)
                    }
                )

                this.add.existing(this.roadBlock)

                return this.roadBlock.getEndPromise()

            })

        }, Promise.resolve())
        .then(() => this.scene.start('End'))


    }

}