import BasicTarget from "./BasicTargetBlock";
import WoodenBox from "./WoodenBox"

export default class Scene1Block extends BasicTarget {

    constructor(scene, x, y, answerData, { checkAnswer = null, speedFactor = 1}) {
        super(scene, x, y, checkAnswer, speedFactor)

        this.setDepth(1)

        let leftSprite = new WoodenBox(scene, -this.scene.getColWidth(1), 0, answerData.answers[0])

        let rightSprite = new WoodenBox(scene, this.scene.getColWidth(1), 0, answerData.answers[1])

        rightSprite.setFlip(1)

        this.setTarget({leftSprite, rightSprite})

        this.targetsContainer.setScale(0.4)

    }

    getMovementDuration() {
        return 7000
    }

    moveInAnime() {
        this.scene.tweens.add({
            targets: this.targetsContainer,
            y: this.targetsContainer.y - this.scene.getRowHeight(2),
            scale: 0.6,
            duration: this.getMovementDurationAfterFactor() * 0.25,
        }).on('complete', ()=> {

            this.setDepth(4)

            this.scene.tweens.add({
                targets: this.targetsContainer,
                y: this.targetsContainer.y + this.scene.getRowHeight(6),
                scale: 1.2,
                duration: this.getMovementDurationAfterFactor() * 0.8
            }).on('complete', ()=> {

                this.result = this.checkAnswer()

                this.setDepth(6)

                this.scene.tweens.add({
                    targets: this.targetsContainer,
                    y: this.targetsContainer.y + this.scene.getRowHeight(6),
                    scale: 1.5,
                    duration: this.getMovementDurationAfterFactor() * 0.4
                }).on('complete', ()=> {
                    
                    this.resolve(this.result)

                })

            })

        })
    }
    
    static getAssetArray() {

        return {
            img: {
                'scene1_box': require('../../assets/images/stage1/scene1_box.png'),
            },
            atlas: {
                'scene1_correct': { img: require('../../assets/anims/stage1/right.png'), data: require('../../assets/anims/stage1/right.json') },
                'scene1_wrong': { img: require('../../assets/anims/stage1/wrong.png'), data: require('../../assets/anims/stage1/wrong.json') },
            },
            sound: {
                
            }
        }

    }

}