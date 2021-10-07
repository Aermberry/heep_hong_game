import BasicTarget from "./BasicTargetBlock";
import Iceman from "./Iceman"

export default class IcemanTargets extends BasicTarget {

    constructor(scene, x, y, answerData, { checkAnswer = null, speedFactor = 1}) {
        super(scene, x, y, checkAnswer, speedFactor)

        this.setDepth(1)

        let leftSprite = new Iceman(scene, -this.scene.getColWidth(1), 0, answerData.answers[0])

        let rightSprite = new Iceman(scene, this.scene.getColWidth(1), 0, answerData.answers[1])

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
                y: this.targetsContainer.y + this.scene.getRowHeight(5),
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
                'iceman': require('../../assets/images/stage5/sm.png'),
            },
            atlas: {
                'iceman_correct': { img: require('../../assets/anims/stage5/sm_right.png'), data: require('../../assets/anims/stage5/sm_right.json') },
                'iceman_wrong': { img: require('../../assets/anims/stage5/sm_wrong.png'), data: require('../../assets/anims/stage5/sm_wrong.json') },
            },
            sound: {
                
            }
        }

    }

}