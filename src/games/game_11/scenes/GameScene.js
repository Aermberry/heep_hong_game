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
        this.question = undefined

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
        let self = this;
        this.paintGameScene(self);

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

        for (let index = 0; index < question.originalSentence.length; index++) {
            const element = question.originalSentence[index];

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

        console.log(container.getAll());

        return container
    }

    /**
     * paint all game ui element in this scene
     * 绘制GameScene的所有Ui元素
    */
    paintGameScene(self) {

        this.playLayer = this.add.layer().setDepth(2);
        this.uiLayer = this.add.layer().setDepth(1);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.stageSlaverSprite = this.add.image(this.getColWidth(8.5), this.getRowHeight(2.5), 'stageSalver').setScale(0.6);

        var zone = this.add.zone(this.getColWidth(8.5) + 100, this.getRowHeight(2.5) + 100, this.stageSlaverSprite.displayWidth, this.stageSlaverSprite.displayHeight).setRectangleDropZone(this.stageSlaverSprite.displayWidth, this.stageSlaverSprite.displayHeight);

        this.input.on('drop', function (pointer, gameObject, dropZone) {

            console.log(self.question.modifier)
            console.log(gameObject.labelText.text)

            if (self.question.modifier.indexOf(gameObject.labelText.text) > -1) {
                // gameObject.toothTexture.setScale(0.3)
                // gameObject.labelText.style.fontSize = '1px'
                gameObject.changeStyle(0.3, '35px')
                console.log(gameObject)
                console.log("---------")
                console.log(gameObject.getImageWidth())
                console.log(gameObject.labelText.text)
                console.log("---------")
                console.log(gameObject.x);
                let dropPoint = { x: gameObject.x, y: gameObject.y }
                gameObject.x = dropPoint.x
                gameObject.y = dropPoint.y

                console.log(dropZone.displayOriginX)
                console.log(dropZone.displayOriginY)
                console.log(gameObject)
                console.log(dropZone.x)
                console.log(dropZone.y)
                console.log(dropZone)

                gameObject.input.enabled = false;
            } else {
                gameObject.x = gameObject.originPoint.originPointX
                gameObject.y = gameObject.originPoint.originPointY
            }

        })

        this.crocodileMouth = this.add.image(this.getColWidth(9.4), this.getRowHeight(8), 'crocodileMouth').setScale(0.4);

        this.container = this.add.container(0, 0, [
            this.pintTooth(this.question),
            this.crocodileMouth]);




        this.exitButton = new ExitButton(this, 120, 135);
        this.leftMoveButton = new LeftMoveButton(this, this.getColWidth(10), this.getRowHeight(11), this.container);
        this.rightMoveButton = new RightMoveButton(this, this.getColWidth(11), this.getRowHeight(11), this.container);

        this.backgroundLayer.add([this.buildBg('bgProgressGame'), this.exitButton]);
        this.uiLayer.add([this.stageSlaverSprite, zone, this.rightMoveButton, this.leftMoveButton])
        this.playLayer.add([this.container])

    }
}