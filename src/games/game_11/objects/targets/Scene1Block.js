import BasicTarget from "./BasicTargetBlock";
import WoodenBox from "./WoodenBox"

export default class Scene1Block extends BasicTarget {

    constructor(scene, x, y, checkAnswer = null, answerData) {
        super(scene, x, y, checkAnswer)

        let leftSprite = new WoodenBox(scene, 0, 0, answerData.answers[0])

        let rightSprite = new WoodenBox(scene, 0, 0, answerData.answers[1])

        rightSprite.setFlip(1)

        this.setTarget({leftSprite, rightSprite})

    }

    getMovementDuration() {
        return 7000
    }

}