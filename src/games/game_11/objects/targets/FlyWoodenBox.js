import Phaser from 'phaser'

export default class FlyWoodenBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y, answer) {
        super(scene, x, y)

        this.answer = answer;

        scene.anims.create({
            key: 'correct',
            duration: 1500,
            frames: scene.anims.generateFrameNames('box_correct', { prefix: 'flybox_right', start: 0, end: 6, zeroPad: 4 }),
        })
        scene.anims.create({
            key: 'wrong',
            duration: 1500,
            frames: scene.anims.generateFrameNames('box_wrong', { prefix: 'flybox_wrong', start: 0, end: 6, zeroPad: 4 }),
        })

        this.box = scene.add.image(0, 0, 'scene4_box')
        this.correct = scene.add.sprite(this.box.width * 0.16, this.box.height * -0.01, 'box_correct')
        this.wrong = scene.add.sprite(this.box.width * 0.16, this.box.height * -0.01, 'box_wrong')

        // this.correct.setScale(1.05)
        // this.wrong.setScale(1.05)

        this.correct.setAlpha(0)
        this.wrong.setAlpha(0)

        let textPadding = this.box.width * 0.05;

        this.textBlock = scene.add.text(
            this.box.width * 0.1, this.box.height * 0.3, this.answer,
            {
                fontSize: this.setFontSize(this.box.width * 0.35, this.answer.length) + 'px',
                color: '#000000',
                // fontFamily: "Custom-Han-Serif"
            }
        )

        this.textBlock.setOrigin(0.5)
        this.textBlock.setPadding(textPadding, textPadding, textPadding, textPadding)

        this.add([this.box, this.correct, this.wrong, this.textBlock])
    }

    playCorrect() {
        this.box.setAlpha(.5)
        this.textBlock.setAlpha(.5)
        this.correct.setAlpha(1)

        this.correct.play('correct').on('animationcomplete', ()=> {
            // this.correct.setAlpha(0)
        })
    }

    playWrong() {
        this.box.setAlpha(.5)
        this.textBlock.setAlpha(.5)
        this.wrong.setAlpha(1)

        this.wrong.play('wrong').on('animationcomplete', ()=> {
            // this.wrong.setAlpha(0)
        })
    }

    setFlip(isFlap) {
        if(isFlap) {
            // this.box.setFlip(1)
            this.textBlock.setX(this.box.width * 0.1)
            this.correct.setX(this.box.width * 0.16)
            this.wrong.setX(this.box.width * 0.16)
        }
    }

    getAnswerValue() {
        return this.answer;
    }

    setFontSize(defaultSize, fontLength, exceptedLength = 2) {

        let loopTime = fontLength > exceptedLength ? fontLength - exceptedLength : 0;

        while(loopTime-- > 0) defaultSize = defaultSize * 0.75

        return defaultSize;

    }

}