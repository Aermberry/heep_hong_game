import Phaser from 'phaser'
import ConfirmButton from './ConfirmButton';
import GameSprite from './GameSprite';
import ResetButton from './ResetButton';


export default class AnswerPanel extends Phaser.GameObjects.Container {

    constructor(scene, x, y, answer, answerArea) {

        super(scene, x, y);
        scene.add.existing(this);
        this._text = '';

        this._answer = answer;
        this.texture = scene.add.sprite(0, 0, 'backgroundLabelAnswer').setScale(0.5);

        this.resetButton = new ResetButton(scene, 650, 0, answerArea);
        this.labelText = this.scene.make.text({
            x: -this.texture.displayWidth / 2 + 20,
            y: -10,
            text: this.text,
            style: {
                fontSize: '55px',
                fontFamily: 'Arial',
                // backgroundColor:'#fb022b',
                align: 'justify',
                color: '#fff',
                padding: {
                    left: 50,
                    right: 50,
                    top: 20,
                    bottom: 10,
                }

            }
        }).setOrigin(0, 0.5).setName('labelText');
        this.confirmButton = new ConfirmButton(scene, 820, 0, answer, this.labelText);

        this.setSize(this.texture.width, this.texture.height);

        this.addOnConfirmButtonClickedEventListener(scene, this.confirmButton);



        this.add([this.texture, this.labelText, this.confirmButton, this.resetButton]);

        // this.showStarAnimation(scene);

    }


    setLabelText(value) {
        this._text += value;
        this.labelText.setText(this._text);
    }

    getLabelText() {
        return this.labelText.text;
    }

    clearLabelText() {
        this._text = '';
        this.labelText.setText(this._text);
    }

    setConfirmButtonLight() {
        this.confirmButton.showLight();
    }

    showStarAnimation(scene) {

        let firstStarAnimation = new GameSprite(scene, this.labelText.x, this.labelText.y - this.texture.displayHeight / 2, 'starTexture');
        firstStarAnimation.setScale(0.5);
        firstStarAnimation.play('starAnimation');


        let secondStarAnimation = new GameSprite(scene, this.labelText.x + this.labelText.displayWidth, this.labelText.y + this.texture.displayHeight / 2, 'starTexture');
        secondStarAnimation.setScale(0.3);
        secondStarAnimation.play('starAnimation');


        this.add([firstStarAnimation, secondStarAnimation]);
    }

    showErrorAnimation(scene) {
        let errorSprite =
            new GameSprite(scene, this.labelText.x + this.labelText.displayWidth / 2, this.labelText.y, 'uiError');
        errorSprite.setScale(0.8);

        console.log("errorSprite:%o", this.errorSprite);

        scene.time.addEvent({
            delay: 2000,
            callback: () => {
                errorSprite.setVisible(false);
            },
        });

        this.add(errorSprite);
    }

    addOnConfirmButtonClickedEventListener(scene, gameObject) {
        gameObject.on('OnConfirmedEvent', (result) => {

            this.resetButton.input.enabled = false;
            this.confirmButton.input.enabled = false;

            if (result) {
                scene.paintGameSuccess();
                this.showStarAnimation(scene);

            } else {
                scene.paintGameFailed();
                this.showErrorAnimation(scene);
            }

        })
    }

    setCurrentAnswer(scene) {

        scene.time.addEvent({
            delay: 2000,
            callback: () => {
                this._text = this._answer;
                this.labelText.setText(this._text);
            },
        });

    }


}