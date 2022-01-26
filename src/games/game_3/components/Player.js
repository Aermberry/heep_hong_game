import Phaser from "phaser";
import GameSprite from "../phaser3_framework/object/GameSprite";
import PlayerButton from "./PlayerButton";

export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, point,questionObjectVoice, homophoneVoice) {
        super(scene, point.x, point.y);

        this.init(questionObjectVoice, homophoneVoice);
    }

    init(questionObjectVoice, homophoneVoice) {

        const backgroundTexture = this.scene.add.image(0, 0, 'backgroundPlayer');
        const playerButton = new PlayerButton(this.scene, 130, 10).setName('playerButton');
        this.playerAnimationSprite = new GameSprite(this.scene, -80, 0, 'playerOnPlayingTexture').setScale(0.45);

        this.questionObjectVoice=questionObjectVoice;
        this.homophoneVoice=homophoneVoice;

        this.add([backgroundTexture, this.playerAnimationSprite, playerButton]);
    }

    playAudio(onCompleteCallback) {
        const voiceOver0 = this.scene.sound.add('voiceOver0'); //嘅
        const voiceOver1 = this.scene.sound.add('voiceOver1'); //係邊個
        const voiceOver2 = this.scene.sound.add('voiceOver2'); //呀？

        const questionObjectVoiceSprite = this.scene.sound.add(this.questionObjectVoice);
        const homophoneVoiceSprite1 = this.scene.sound.add(this.homophoneVoice);
        const homophoneVoiceSprite2 = this.scene.sound.add(this.homophoneVoice);

        const playerButton=this.getByName('playerButton');

        questionObjectVoiceSprite.on('play', () => {
            this.playAnimation();
            playerButton.cancelListener();
            playerButton.texture.setFrame(0);
        });

        questionObjectVoiceSprite.on('complete', () => {
            voiceOver0.play();
        });

        homophoneVoiceSprite1.on('complete', () => {
            voiceOver1.play();
        });

        voiceOver0.on('complete', () => {
            homophoneVoiceSprite1.play();
        });

        voiceOver1.on('complete', () => {
            homophoneVoiceSprite2.play();
        });

        homophoneVoiceSprite2.on('complete',()=>{
            voiceOver2.play();
        });

        voiceOver2.on('complete',()=>{
            this.stopAnimation();
            playerButton.enableListener();
            playerButton.texture.setFrame(2);
            onCompleteCallback();
        });


        questionObjectVoiceSprite.play();
       
    }

    playAnimation() {
        this.playerAnimationSprite.play('playerOnPlayingAnimation');
    }

    stopAnimation() {
        this.playerAnimationSprite.stop();
    }

    disableListener() {
        const playerButton = this.getByName('playerButton');
        playerButton.cancelListener();
    }

    enableListener() {
        const playerButton = this.getByName('playerButton');
        playerButton.enableListener();
    }

}