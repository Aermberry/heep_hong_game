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
    constructor(scene, x, y, checkAnswer = null, speedFactor = 1) {
        super(scene, x, y)

        this.rightSprite = null
        this.leftSprite = null
        this.onCheckAnswerCallback = null
        this.resolve = null
        this.result = false
        this.speedFactor = speedFactor
        this.targetsContainer = null

        this.correctSound = this.scene.sound.add('correct_sound', {volume: 2})
        this.wrongSound = this.scene.sound.add('wrong_sound', {volume: 2})

        // this.setScale(0.4)

        if(checkAnswer != null) this.onCheckAnswerCallback = checkAnswer

    }

    getEndPromise() {
        return new Promise((resolve)=> {
            this.resolve = resolve
            this.blockMoveIn()
        })
    }

    setTarget({rightSprite, leftSprite}) {

        this.rightSprite = rightSprite
        this.leftSprite = leftSprite

        this.targetsContainer = new Phaser.GameObjects.Container(this.scene, 0, 0, [rightSprite, leftSprite])

        this.add(this.targetsContainer)

    }

    blockMoveIn() {

        this.moveInAnime()

    }

    moveInAnime() {
        this.resolve(this.result)
    }

    getMovementDuration() {
        return 8000
    }

    getMovementDurationAfterFactor() {
        return this.getMovementDuration() * this.speedFactor
    }

    /**
     * 
     * @param int   index 
     */
    checkAnswer() {

        let result = false

        if(typeof this.onCheckAnswerCallback == 'function') {

            result = this.onCheckAnswerCallback()

            if(result === true) {
                this.correctSound.play()
            }else {
                this.wrongSound.play()
            }

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

    /**
     * Provide an array for preloadFromArr function
     * @return      {img, atlas, sound}
     */
    static getAssetArray() {

        return {
            img: {

            },
            atlas: {

            },
            sound: {
                
            }
        }

    }

}