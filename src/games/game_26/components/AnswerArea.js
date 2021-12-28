import Phaser from 'phaser'
import PhraseLabelBox from '../components/PhraseLabelBox'
import AnswerPanel from './AnswerPanel';
import PrepositionLabelBox from './PrepositionLabelBox';

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

        this.paintPhraseLabels(scene, this.question.preposition, this.question.phrases);

        
        new AnswerPanel(scene,1000,900);
    }

    paintPhraseLabels(scene, preposition, phrases) {

        const points = [{ x: 1278, y: 178 }, { x: 1696, y: 175 }, { x: 1278, y: 355 }, { x: 1699, y: 390 }, { x: 1500, y: 527 }];

        const prepositionIndexPosition = phrases.indexOf(preposition);
        const prepositionLabelBoxPoint = points[prepositionIndexPosition];

        let phraseLabelBoxPoints = Array.from(points);
        phrases.splice(prepositionIndexPosition, 1);
        phraseLabelBoxPoints.splice(prepositionIndexPosition, 1);

        // console.log({phrases})
        // console.log({ points: points })
        // console.log({ prepositionLabelBoxPoint: prepositionLabelBoxPoint })
        // console.log({ phraseLabelBoxPoints: phraseLabelBoxPoints });

        if (prepositionLabelBoxPoint != null) {
            this.add(new PrepositionLabelBox(scene, prepositionLabelBoxPoint, preposition, this.textStyle));
        }

        if (phraseLabelBoxPoints != null) {
            for (let index = 0; index < phrases.length; index++) {
                const phrase = phrases[index];
                this.add(new PhraseLabelBox(scene, phraseLabelBoxPoints[index], phrase, this.textStyle));
            }
        }

    }

    // paintAnswerPanel(scene){

    // }

}