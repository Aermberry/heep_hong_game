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

    static getAssetArray() {

        return {
            img: {
                'scene1_1': require('../../assets/images/stage1/scene1_1.png'),
                'scene1_2': require('../../assets/images/stage1/scene1_2.png'),
                'scene1_box': require('../../assets/images/stage1/scene1_box.png'),
            },
            atlas: {
                'road': { img: require('../../assets/anims/stage1/road.png'), data: require('../../assets/anims/stage1/road.json')},
                'scene1_correct': { img: require('../../assets/anims/stage1/right.png'), data: require('../../assets/anims/stage1/right.json') },
                'scene1_wrong': { img: require('../../assets/anims/stage1/wrong.png'), data: require('../../assets/anims/stage1/wrong.json') },
            },
            sound: {
                
            }
        }

    }

}