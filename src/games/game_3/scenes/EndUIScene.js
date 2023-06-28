import Phaser from "phaser";
import BackgroundMusicButton from "../components/BackgroundMusicButton";

export default class EndUIScene extends Phaser.Scene {

    constructor() {
        super('EndUI')
    }

    create() {
        this.sound.stopAll();

        this.uiLayer = this.add.layer().setDepth(0);

        const backgroundMusic = this.sound.add('gameEndSceneBackgroundMusic', {
            volume: 0.2,
            loop: true
        });

        this.scene.run('End');

        this.playBackgroundMusic(backgroundMusic);

        this.buildUiObject(this.uiLayer, backgroundMusic);

    }

    buildUiObject(layer, backgroundMusic) {
        const backgroundMusicButton = new BackgroundMusicButton(this, 1820, 120, backgroundMusic);

        layer.add([backgroundMusicButton]);
    }


    playBackgroundMusic(backgroundMusic) {
        backgroundMusic.play();
    }

}