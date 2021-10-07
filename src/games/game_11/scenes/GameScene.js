import BasicScene from "./BasicScene"

import Truck from "../objects/players/Truck"
import Ship from "../objects/players/Ship"

import Scene1Block from "../objects/targets/Scene1Block"
import ShipTargets from "../objects/targets/ShipTargets"
import UfoTargets from "../objects/targets/UfoTargets"

import TruckBg from "../objects/backgrounds/TruckBg"
import ShipBg from "../objects/backgrounds/ShipBg"

import TruckFg from "../objects/foregrounds/TruckFg"
import ShipFg from "../objects/foregrounds/ShipFg"

import Untils from "../../common/Untils"
import ToLeftBtn from "../objects/buttons/ToLeftBtn"
import ToRightBtn from "../objects/buttons/ToRightBtn"
import Ufo from "../objects/players/Ufo"
import UfoBg from "../objects/backgrounds/UfoBg"
import UfoFg from "../objects/foregrounds/UfoFg"
import BalloonBg from "../objects/backgrounds/BalloonBg"
import IcemanBg from "../objects/backgrounds/IcemanBg"
import BalloonFg from "../objects/foregrounds/BalloonFg"
import IcemanFg from "../objects/foregrounds/IcemanFg"
import BalloonTargets from "../objects/targets/BalloonTargets"
import IcemanTargets from "../objects/targets/IcemanTargets"
import FlyPen from "../objects/players/FlyPen"
import SkiPen from "../objects/players/SkiPen"
export default class GameScene extends BasicScene {


    constructor() {
        super('Game')

        // this.dataModal = this.sys.game.globals.model;
        this.cursorKeys = null
        this.playerOnLeft = true
        this.totalSocre = 0
        
        this.blockClassMap = {
            'Scene1Block': Scene1Block,
            'ShipTargets': ShipTargets,
            'UfoTargets': UfoTargets,
            'BalloonTargets': BalloonTargets,
            'IcemanTargets': IcemanTargets
        }
        this.playerClassMap = {
            'Truck': Truck,
            'Ship': Ship,
            'Ufo': Ufo,
            'FlyPen': FlyPen,
            'SkiPen': SkiPen
        }
        this.bgClassMap = {
            'TruckBg':TruckBg,
            'ShipBg': ShipBg,
            'UfoBg': UfoBg,
            'BalloonBg': BalloonBg,
            'IcemanBg': IcemanBg
        }
        this.fgClassMap = {
            'TruckFg': TruckFg,
            'ShipFg': ShipFg,
            'UfoFg': UfoFg,
            'BalloonFg': BalloonFg,
            'IcemanFg': IcemanFg
        }

        this.itemBlockClass = null
        this.playerClass = null
        this.bgClass = null

    }

    init() {

        this.roadBlock = null

        this.dataModel = this.sys.game.globals.model;

        this.itemBlockClass = this.blockClassMap[this.dataModel.blockItem]
        this.playerClass = this.playerClassMap[this.dataModel.playerItem]
        this.bgClass = this.bgClassMap[this.dataModel.backgroundItem]
        this.fgClass = this.fgClassMap[this.dataModel.foregroundItem]


        // this.anims.create({
        //     key: 'road',
        //     repeat: -1,
        //     frames: this.anims.generateFrameNames('road', { prefix: 'road_move', start: 0, end: 5, zeroPad: 4 }),
        // });

    }

    preload() {

        this.buildBg('bg_title')


        let blockAssets = this.itemBlockClass.getAssetArray()
        let playerAssets = this.playerClass.getAssetArray()
        let bgAssets = this.bgClass.getAssetArray()
        let fgAssets = this.fgClass.getAssetArray()

        const imageFiles = {
            'end_box': require('../assets/images/end_box.png'),
            ...blockAssets.img,
            ...playerAssets.img,
            ...bgAssets.img,
            ...fgAssets.img
        }

        const atlasFiles = {
            'end_pic': { img: require('../assets/anims/end_pic.png'), data: require('../assets/anims/end_pic.json') },

            ...blockAssets.atlas,
            ...playerAssets.atlas,
            ...bgAssets.atlas,
            ...fgAssets.atlas
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        })

        this.createProgressBar();


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

        let bg = new this.bgClass(this, 0, 0);

        this.add.existing(bg)

        let fg = new this.fgClass(this, 0, 0)

        this.add.existing(fg)

        // road.play('road')

        this.player = new this.playerClass(this, this.getColWidth(4.5), this.getRowHeight(9.5), this.dataModel.gameQuestion)

        this.player.setDepth(5)

        this.add.existing(this.player)


        this.cursorKeys = this.input.keyboard.createCursorKeys()


        const correctAns = [...this.dataModel.gameAnswers.correct]

        const miscAns = [...this.dataModel.gameAnswers.misc]


        let gameData = this._handleGameData(Untils.shuffle(correctAns), Untils.shuffle(miscAns))

        this.recurringAnswerBlock(gameData)

        
        this.toLeftBtn = new ToLeftBtn(this, this.getColWidth(9.5), this.getRowHeight(10), this._playerToLeft.bind(this, 500))
        this.toRightBtn = new ToRightBtn(this, this.getColWidth(11), this.getRowHeight(10), this._playerToRight.bind(this, 500))

        this.toLeftBtn.setDepth(2)
        this.toRightBtn.setDepth(2)

        this.add.existing(this.toLeftBtn)
        this.add.existing(this.toRightBtn)

    }


    update() {

        if (this.cursorKeys.left.isDown) {
            this._playerToLeft(500)
        }

        if (this.cursorKeys.right.isDown) {
            this._playerToRight(500)
        }

    }

    _playerToLeft(distance) {
        if(this.playerOnLeft) return
        this.player.toLeft(this.player.x - distance).then(()=> this.playerOnLeft = true)
    }

    _playerToRight(distance) {
        if(!this.playerOnLeft) return
        this.player.toRight(this.player.x + distance).then(() => this.playerOnLeft = false)
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