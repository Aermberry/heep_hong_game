import Phaser from "phaser";
import Colors from "../styles/Colors";

export default class TextDropBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y, data, clip) {

        super(scene, 0, 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.textConfig = {
            fontSize: '64px',
            fontFamily: 'Arial',
            color: Colors.darkGray,
            align: 'center',
        }

        this.paintTextUI(scene, x, y, data);

        clip.addListener('onCollided', (value) => this.onCollideHandler(value, scene), this);
        clip.addListener('onCompleteAnimation', (gameObject) => this.onCompleteAnimationHandler(gameObject, scene, data.answer), this);
    }

    paintTextUI(scene, x, y, data) {
        let backgroundImage = scene.add.image(x, y, 'bgQuestionText');
        this.setSize(backgroundImage.width, backgroundImage.height);

        let singleWorldSize = this.getSingleWorldSize(scene, x, y, data);

        let firstText = scene.add.text(x, y, data.question, this.textConfig).setOrigin(0);
            let displayHeight = backgroundImage.displayHeight;
            let displayWidth = backgroundImage.displayWidth;

            let textSplitList = data.question.split('@')

            let holeImage = scene.add.image(x + singleWorldSize.width * textSplitList[0].length, y, "hole").setOrigin(0, 0.2);

            let holeImageDisplayWidth = holeImage.displayWidth;

            firstText.setText(textSplitList[0]);

            let secondText = scene.add.text(x + singleWorldSize.width * (textSplitList[0].length) + holeImageDisplayWidth, y, textSplitList[1], this.textConfig).setOrigin(0);

            /* 设置居中对齐 */
            let alignX = (-displayWidth/2 + singleWorldSize.width * 3.5) / 2;
            let alignY = -(displayHeight + singleWorldSize.height) / 8;

            let container = scene.add.container(alignX, alignY, [firstText, holeImage, secondText]);

            localStorage.setItem('holeImagePosition', JSON.stringify({ 'x': holeImage.x + holeImage.width / 2 + alignX, 'y': holeImage.y + alignY }));

            this.add([backgroundImage, container]);
    }

    getSingleWorldSize(scene, x, y, data) {

        let templeText = scene.add.text(x, y, data.question, this.textConfig).setOrigin(0);

        let width = templeText.width / data.question.length;
        let height = templeText.height;

        templeText.destroy();

        return {
            "width": width,
            "height": height
        }
    }

    addSuccessEventListener(scene) {
        console.log(scene)
    }

    addFailedEventListener() {

    }

    onCollideHandler(gameObject) {
        this.clipBox = gameObject;
    }

    onCompleteAnimationHandler(gameObject, scene, answer) {

        let doll = gameObject.list[1];

        if (this.checkAnswer(doll, answer)) {

            scene.paintGameSuccess(doll);
        }
        else {
            scene.paintGameFailed(gameObject);
        }
    }

    checkAnswer(doll, answer) {
        return answer == doll.name
    }

}