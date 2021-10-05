import BasicTarget from "./BasicTargetBlock";
import WoodenBox from "./WoodenBox"

export default class Scene1Block extends BasicTarget {

    constructor(scene, x, y, answerData, { checkAnswer = null, speedFactor = 1}) {
        super(scene, x, y, checkAnswer, speedFactor)

        let leftSprite = new WoodenBox(scene, 0, 0, answerData.answers[0])

        let rightSprite = new WoodenBox(scene, 0, 0, answerData.answers[1])

        rightSprite.setFlip(1)

        this.setTarget({leftSprite, rightSprite})

    }

    getMovementDuration() {
        return 7000
    }

}