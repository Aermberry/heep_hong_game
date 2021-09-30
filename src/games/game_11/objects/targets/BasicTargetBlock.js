import Phaser from 'phaser'

export default class BasicTargetBlock extends Phaser.GameObjects.Container {

    /**
     * 
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} onComplete 
     * 
     */
    constructor(scene, x, y, checkAnswer = null) {
        super(scene, x, y)

        this.rightSprite = null
        this.leftSprite = null
        this.onCheckAnswerCallback = null
        this.resolve = null
        this.result = false

        this.setScale(0.4)

        this.moveInAnime()

        this.setDepth(1)

        if(checkAnswer != null) this.onCheckAnswerCallback = checkAnswer

    }

    getEndPromise() {
        return new Promise((resolve)=> {
            this.resolve = resolve
        })
    }

    setTarget({rightSprite, leftSprite}) {

        this.rightSprite = rightSprite
        this.leftSprite = leftSprite

        rightSprite.setPosition(this.scene.getColWidth(1),0)
        leftSprite.setPosition(-this.scene.getColWidth(1),0)

        this.add([rightSprite, leftSprite])

    }

    moveInAnime() {

        this.scene.tweens.add({
            targets: this,
            y: this.y - this.scene.getRowHeight(2),
            scale: 0.6,
            duration: this.getMovementDuration() * 0.25,
        }).on('complete', ()=> {

            this.setDepth(4)

            this.scene.tweens.add({
                targets: this,
                y: this.y + this.scene.getRowHeight(6),
                scale: 1.2,
                duration: this.getMovementDuration() * 0.8
            }).on('complete', ()=> {

                this.result = this.checkAnswer()

                this.setDepth(6)

                this.scene.tweens.add({
                    targets: this,
                    y: this.y + this.scene.getRowHeight(6),
                    scale: 1.5,
                    duration: this.getMovementDuration() * 0.4
                }).on('complete', ()=> {
                    
                    this.resolve(this.result)

                })

            })

        })

    }

    getMovementDuration() {
        return 8000
    }

    /**
     * 
     * @param int   index 
     */
    checkAnswer() {

        let result = false

        if(typeof this.onCheckAnswerCallback == 'function') {

                result = this.onCheckAnswerCallback()

        }

        return result;

    }

    getItem(direction) {

        if(direction === 'left') {
            return this.leftSprite
        }else if(direction === 'right') {
            return this.rightSprite
        }

    }

}