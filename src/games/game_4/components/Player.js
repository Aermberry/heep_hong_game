import Phaser from "phaser";
import GameSprite from "../phaser3_framework/object/GameSprite";
import PlayerButton from "./PlayerButton";
import SoundOnPlayEvent from "../phaser3_framework/event/SoundOnPlayEvent"

export default class Player extends Phaser.GameObjects.Container {

    constructor(scene, point, questionObjectVoice, homophoneVoice) {
        super(scene, point.x, point.y);

        this.init(questionObjectVoice, homophoneVoice);
    }

    init(questionObjectVoice, homophoneVoice) {

        const backgroundTexture = this.scene.add.image(0, 0, 'backgroundPlayer');
        const playerButton = new PlayerButton(this.scene, 130, 10).setName('playerButton');
        this.playerAnimationSprite = new GameSprite(this.scene, -80, 0, 'playerOnPlayingTexture').setScale(0.45);

        this.questionObjectVoice = questionObjectVoice;
        this.homophoneVoice = homophoneVoice;

        this.add([backgroundTexture, this.playerAnimationSprite, playerButton]);

        SoundOnPlayEvent.on("updateEggItemOnPlayStatus", (value) => {
            value ? playerButton.cancelListener() : playerButton.enableListener();
        });
    }

    playAudio(onCompleteCallback) {
        const voiceOver0 = this.scene.sound.add('voiceOver0'); //嘅
        const voiceOver1 = this.scene.sound.add('voiceOver1'); //邊個意思呀？
        const voiceOver4 = this.scene.sound.add('voiceOver4'); //係

        const questionObjectVoiceSprite = this.scene.sound.add(this.questionObjectVoice);
        const homophoneVoiceSprite = this.scene.sound.add(this.homophoneVoice);

        const playerButton = this.getByName('playerButton');

        questionObjectVoiceSprite.on('play', () => {
            this.playAnimation();
            playerButton.cancelListener();
            playerButton.texture.setFrame(0);

            SoundOnPlayEvent.emit("updatePlayerOnPlayStatus", true);
        });

        questionObjectVoiceSprite.on('complete', () => {
            voiceOver0.play();
        });

        homophoneVoiceSprite.on('complete', () => {
            voiceOver4.play();
        });

        voiceOver0.on('complete', () => {
            homophoneVoiceSprite.play();
        });

        voiceOver1.on('complete', () => {
            this.stopAnimation();
            playerButton.enableListener();
            playerButton.texture.setFrame(2);

            SoundOnPlayEvent.emit("updatePlayerOnPlayStatus", false);
            
            if (onCompleteCallback != null) {
                onCompleteCallback();
            }
        });

        voiceOver4.on('complete', () => {
            voiceOver1.play();
        })


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