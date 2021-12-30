import Phaser from 'phaser'
import PhraseLabelBox from '../components/PhraseLabelBox'
import AnswerPanel from './AnswerPanel';
import PrepositionLabelBox from './PrepositionLabelBox';

export default class AnswerArea extends Phaser.GameObjects.Container {

    constructor(scene, question) {

        super(scene, 0, 0);

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

        this.answerPanel = new AnswerPanel(scene, 3000, 900, question.answer);
        this.phraseLabelsContainer = this.paintPhraseLabels(scene, question.preposition, question.phrases, this);

        this.addOnPhraseClickedEventListener(this, this.answerPanel, question.answer);

        this.add[this.answerPanel];
    }

    paintPhraseLabels(scene, preposition, phrases, gameObject) {

        const points = [{ x: 1278, y: 178 }, { x: 1696, y: 175 }, { x: 1278, y: 355 }, { x: 1699, y: 390 }, { x: 1500, y: 527 }];

        let container = scene.add.container(0, 1200);

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
            container.add(new PrepositionLabelBox(scene, prepositionLabelBoxPoint, preposition, this.textStyle, gameObject));
        }

        if (phraseLabelBoxPoints != null) {
            for (let index = 0; index < phrases.length; index++) {
                const phrase = phrases[index];
                container.add(new PhraseLabelBox(scene, phraseLabelBoxPoints[index], phrase, this.textStyle, gameObject));
            }
        }

        this.add(container);

        return container;

    }

    addOnPhraseClickedEventListener(gameObject, answerPanel, answer) {
        gameObject.on('clickedEvent', (value) => {

            answerPanel.setLabelText(value);
            console.log("answerPanel:%s", answerPanel.getLabelText());

            if (answerPanel.getLabelText().length == answer.length) {
                answerPanel.setConfirmButtonLight();
            }
        })
    }

    showAnswerPanelAnimation(scene) {
        scene.add.tween({
            targets: this.answerPanel,
            x: 1000,
            duration: 5000,
            ease: 'Power2',
        });
        scene.add.tween({
            targets: this.phraseLabelsContainer,
            x: 0,
            y: 0,
            scale: { from: 0.5, to: 1 },
            alpha: { from: 0.5, to: 1 },
            duration: 9000,
            ease: 'Power2',
        });
    }

}