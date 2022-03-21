import Phaser from "phaser";
import BackgroundMusicButton from "../components/BackgroundMusicButton";
import ExitButton from "../components/ExitProgressGameButton";

export default class UIScene extends Phaser.Scene {

    constructor() {
        super('GameUI')
    }

    create() {
        this.sound.stopAll();

        this.uiLayer = this.add.layer().setDepth(0);

        const backgroundMusic = this.sound.add('gamePlaySceneBackgroundMusic', {
            volume: 0.2,
            loop: true
        });

        this.scene.run('Game')

        this.playBackgroundMusic(backgroundMusic);

        this.buildUiObject(this.uiLayer, backgroundMusic);


    }

    buildUiObject(layer, backgroundMusic) {
        const exitButton = new ExitButton(this, 100, 120);
        const backgroundMusicButton = new BackgroundMusicButton(this, 1820, 120, backgroundMusic);

        layer.add([exitButton, backgroundMusicButton]);
    }


     playBackgroundMusic(backgroundMusic) {
         backgroundMusic.play();
     }

}