import Phaser from 'phaser'

export default class WoodenBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y, answer) {
        super(scene, x, y)

        this.answer = answer;

        scene.anims.create({
            key: 'correct',
            duration: 1500,
            frames: scene.anims.generateFrameNames('scene1_correct', { prefix: 'correct', start: 0, end: 14, zeroPad: 4 }),
        })
        scene.anims.create({
            key: 'wrong',
            duration: 1500,
            frames: scene.anims.generateFrameNames('scene1_wrong', { prefix: 'wrong', start: 0, end: 14, zeroPad: 4 }),
        })

        this.box = scene.add.image(0, 0, 'scene1_box')
        this.correct = scene.add.sprite(0, this.box.height * -0.2, 'scene1_correct')
        this.wrong = scene.add.sprite(0, this.box.height * -0.2, 'scene1_wrong')

        this.correct.setAlpha(0)
        this.wrong.setAlpha(0)

        this.add([this.box, this.correct, this.wrong])
    }

    playCorrect() {
        this.box.setAlpha(0)
        this.correct.setAlpha(1)

        this.correct.play('correct').on('animationcomplete', ()=> {
            this.correct.setAlpha(0)
        })
    }

    playWrong() {
        this.box.setAlpha(0)
        this.wrong.setAlpha(1)

        this.wrong.play('wrong').on('animationcomplete', ()=> {
            this.wrong.setAlpha(0)
        })
    }

    setFlip(isFlap) {
        if(isFlap) {
            this.box.setFlip(1)
            this.correct.setX(this.box.width * 0.3)
            this.wrong.setX(this.box.width * 0.3)
        }
    }

    getAnswerValue() {
        return this.answer;
    }

}