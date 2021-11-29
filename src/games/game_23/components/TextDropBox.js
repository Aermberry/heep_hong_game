import Phaser from "phaser";
import Colors from "../styles/Colors";

export default class TextDropBox extends Phaser.GameObjects.Container {

    constructor(scene, x, y, data, clip) {

        super(scene, 0, 0);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.textConfig = {
            fontSize: '54px',
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
        let textSplitList = null;
        let text = null;

        this.setSize(backgroundImage.width, backgroundImage.height);

        let singleWorldSize = this.getSingleWorldSize(scene, x, y, data);

        let question = data.question;
        console.log({ question })

        /* 
            檢測是否需要分行處理
         */
        if (question.length < 23) {
            /* 單行文字處理 */

            let firstText = scene.add.text(x, y, data.question, this.textConfig).setOrigin(0);
            let displayHeight = backgroundImage.displayHeight;
            let displayWidth = backgroundImage.displayWidth;

            let textSplitList = data.question.split('@')

            let holeImage = scene.add.image(x + singleWorldSize.width * textSplitList[0].length, y, "hole").setOrigin(0, 0.2);

            let holeImageDisplayWidth = holeImage.displayWidth;

            firstText.setText(textSplitList[0]);

            let secondText = scene.add.text(x + singleWorldSize.width * (textSplitList[0].length) + holeImageDisplayWidth, y, textSplitList[1], this.textConfig).setOrigin(0);

            /* 设置居中对齐 */
            let alignX = (-displayWidth / 2 + singleWorldSize.width);
            let alignY = -(displayHeight + singleWorldSize.height) / 8;

            let container = scene.add.container(alignX, alignY, [firstText, holeImage, secondText]);

            localStorage.setItem('holeImagePosition', JSON.stringify({ 'x': holeImage.x + holeImage.width / 2 + alignX, 'y': holeImage.y + alignY - 30 }));

            this.add([backgroundImage, container]);

        }
        else {
            /* 雙行文字處理 */

            /* 分行处理 

            @代表需要插入holdImage， 一个@相当于3.5个字；
            -行最多能容纳25个字
            题库中最长的句子有46个字


           1.检测前25个字是否带有@
             - 带有@的行,该行的最大容纳字数量为22个字
             - 不带@的行，该行的最大容纳字数量为25个字
          
        */

            let branchText = this.rowTextStringHandle(data.question);

            /* 绘制图片文字行 */

            textSplitList = branchText.rowString[branchText.identifierRowPosition].split('@');
            text = branchText.rowString[branchText.textRowPosition];

            let textDropWidget = this.produceTextDropWidget(scene, x, y, branchText.identifierRowPosition, textSplitList, text, singleWorldSize, backgroundImage);

            let holeImagePosition = this.getHoleImagePosition(branchText, textDropWidget);

            console.log({ holeImagePosition })

            localStorage.setItem('holeImagePosition', JSON.stringify({ 'x': holeImagePosition.x, 'y': holeImagePosition.y }));

            this.add([backgroundImage, textDropWidget]);
        }




    }

    getHoleImagePosition(branchText, textDropWidget) {

        let holeImage;
        let holeImageLine;

        switch (branchText.identifierRowPosition) {
            case 0:
                holeImageLine = "firstLine";
                break;

            case 1:
                holeImageLine = "secondLine";
                break;
        }

        holeImage = textDropWidget.getByName(holeImageLine).getByName('holeImage');

        return {
            "x": holeImage.x + holeImage.width / 2 + textDropWidget.x,
            "y": holeImage.y + textDropWidget.y - 30
        };
    }

    rowTextStringHandle(testString) {

        let index = testString.indexOf('@');
        let tempFirstLineString;
        let tempSecondLineString;
        let identifierRowPosition;
        let textRowPosition;

        if (index < 25) {
            // @ 在第一行
            tempFirstLineString = testString.slice(0, 23);
            tempSecondLineString = testString.slice(23);
            identifierRowPosition = 0;
            textRowPosition = 1;

        }
        else {
            // @ 在第二行
            tempFirstLineString = testString.slice(0, 25);
            console.log(tempFirstLineString);
            tempSecondLineString = testString.slice(25);
            identifierRowPosition = 1;
            textRowPosition = 0;
        }

        return {
            "rowString": [tempFirstLineString, tempSecondLineString],
            "identifierRowPosition": identifierRowPosition,
            "textRowPosition": textRowPosition
        }
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

    produceTextDropWidget(scene, x, y, identifierRowPosition, textSplitList, text, singleWorldSize, backgroundImage) {

        let firstLine;
        let secondLine;

        let displayHeight = backgroundImage.displayHeight;
        let displayWidth = backgroundImage.displayWidth;

        switch (identifierRowPosition) {
            case 0:
                firstLine = this.produceTextImageRow(scene, textSplitList, x, y, singleWorldSize, identifierRowPosition).setName("firstLine");
                secondLine = this.produceTextRow(scene, text, x, y, singleWorldSize, identifierRowPosition).setName("secondLine");

                break;

            case 1:
                firstLine = this.produceTextRow(scene, text, x, y, singleWorldSize, identifierRowPosition).setName("firstLine");

                console.log('');
                secondLine = this.produceTextImageRow(scene, textSplitList, x, y, singleWorldSize, identifierRowPosition).setName("secondLine");

                break;
        }

        // /* 设置居中对齐 */
        let alignTextDropWidgetPosition = this.alignTextDropWidgetToCenter(displayWidth, displayHeight, singleWorldSize, identifierRowPosition);

        return scene.add.container(alignTextDropWidgetPosition.x, alignTextDropWidgetPosition.y, [firstLine, secondLine]);
    }


    alignTextDropWidgetToCenter(displayWidth, displayHeight, singleWorldSize, identifierRowPosition) {
        let x;
        let y;
        switch (identifierRowPosition) {
            case 0:
                x = (-displayWidth + singleWorldSize.width / 3) / 2;
                y = -(displayHeight + singleWorldSize.height) / 4;
                break;

            case 1:
                x = x = (-displayWidth + singleWorldSize.width) / 2;
                y = -(displayHeight + singleWorldSize.height) / 3;
                break;
        }

        return {
            "x": x,
            "y": y
        }


    }

    produceTextImageRow(scene, textSplitList, x, y, singleWordSize, identifierRowPosition) {

        let holeImage = scene.add.image(x, y, "hole").setOrigin(0, 0.2).setName("holeImage");

        let textImageFirstText = scene.add.text(x, y, '', this.textConfig).setOrigin(0).setName("textImageRowFirstText");

        let textImageSecondText = scene.add.text(x, y, '', this.textConfig).setOrigin(0).setName("textImageRowSecondText");

        let holeImageDisplayWidth;

        if (textSplitList.length == 1) {
            textSplitList.unshift('')
            console.log({ textSplitList })
        }

        holeImageDisplayWidth = holeImage.displayWidth;

        textImageFirstText.setText(textSplitList[0]);
        textImageSecondText.setText(textSplitList[1]);

        switch (identifierRowPosition) {
            case 0:
                holeImage.x = x + singleWordSize.width * textSplitList[0].length;
                holeImage.y = y;

                textImageSecondText.x = x + singleWordSize.width * (textSplitList[0].length) + holeImageDisplayWidth;
                textImageSecondText.y = y;

                break;
            case 1:
                holeImage.x = x + singleWordSize.width * textSplitList[0].length;
                holeImage.y = y + singleWordSize.height + 55;

                textImageFirstText.y = y + singleWordSize.height + 55;

                textImageSecondText.x = x + singleWordSize.width * (textSplitList[0].length) + holeImageDisplayWidth;
                textImageSecondText.y = y + singleWordSize.height + 55;

                break;

            default:
                break;
        }




        return scene.add.container(0, 0, [textImageFirstText, holeImage, textImageSecondText]);
    }

    produceTextRow(scene, textString, x, y, singleWordSize, identifierRowPosition) {
        let text = scene.add.text(x, y, textString, this.textConfig).setOrigin(0).setName("textImageRowSecondText");

        switch (identifierRowPosition) {
            case 0:
                text.x = x;
                text.y = y + singleWordSize.height + 55;

                break;

            case 1:
                text.x = x;
                text.y = y;

                break;

            default:
                break;
        }



        return scene.add.container(0, 0, text);
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