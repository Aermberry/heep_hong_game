import BasicTarget from "./BasicTargetBlock";
import FlyWoodenBox from "./FlyWoodenBox"

export default class BalloonTargets extends BasicTarget {

    constructor(scene, x, y, answerData, { checkAnswer = null, speedFactor = 1}) {
        super(scene, x, y, checkAnswer, speedFactor)

        this.setDepth(1)

        let leftSprite = new FlyWoodenBox(scene, -this.scene.getColWidth(1.5), 0, answerData.answers[0])

        let rightSprite = new FlyWoodenBox(scene, this.scene.getColWidth(1.5), 0, answerData.answers[1])

        rightSprite.setFlip(1)

        this.setTarget({leftSprite, rightSprite})

        this.targetsContainer.setScale(0.4)

        this.targetsContainer.setY(this.scene.getRowHeight(-6))

    }

    getMovementDuration() {
        return 7000
    }

    moveInAnime() {
        this.scene.tweens.add({
            targets: this.targetsContainer,
            y: this.targetsContainer.y + this.scene.getRowHeight(2),
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
                    y: this.targetsContainer.y + this.scene.getRowHeight(8),
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
                'scene4_box': require('../../assets/images/stage4/scene4_box.png')
            },
            atlas: {
                'box_correct': { img: require('../../assets/anims/stage4/flybox_right.png'), data: require('../../assets/anims/stage4/flybox_right.json') },
                'box_wrong': { img: require('../../assets/anims/stage4/flybox_wrong.png'), data: require('../../assets/anims/stage4/flybox_wrong.json') },
            },
            sound: {
                
            }
        }

    }

}