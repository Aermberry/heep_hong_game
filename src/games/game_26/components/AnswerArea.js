import Phaser from 'phaser'
import PhraseLabelBox from '../components/PhraseLabelBox'
// import Colors from "../styles/Colors";

export default class AnswerArea extends Phaser.GameObjects.Container {

    constructor(scene, question) {

        super(scene, 0, 0);

        this.question = question;
        this.textStyle = {
            fontSize: '55px',
            fontFamily: 'Arial',
            // backgroundColor:'#fb022b',
            align: 'justify',
            color: '#000',
            padding: {
                left: 50,
                right: 50,
                top: 20,
                bottom: 10,
            }

        }


        scene.add.existing(this);

        this.paintPhraseLabels(scene, this.question.phrases);
    }

    paintPhraseLabels(scene, phrases) {

        // phrases.forEach((value, index) => {


        // });

        const labelText00 = new PhraseLabelBox(scene, 1278, 178, phrases[0], this.textStyle);

        const labelText01 = new PhraseLabelBox(scene, 1696, 175, phrases[1], this.textStyle);

        const labelText02 = new PhraseLabelBox(scene, 1278, 355, phrases[2], this.textStyle);

        const labelText03 = new PhraseLabelBox(scene, 1699, 390, phrases[3], this.textStyle);

        const labelText04 = new PhraseLabelBox(scene, 1500, 527, phrases[4], this.textStyle);

        this.add(labelText00, labelText01, labelText02, labelText03, labelText04);

        console.log(this);

    }

}