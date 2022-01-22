import ExitProgressGameButton from "../components/ExitProgressGameButton";
import StartButton from "../components/StartButton";
import BasicScene from "./BasicScene"
import GameManager from "../components/GameManager";
import GameSprite from "../components/GameSprite";
import { createTutorAnimation } from "../assets/animations/TutorAnimation";
// import Phaser from "phaser";

export default class TutorScene extends BasicScene {

    constructor() {
        super("Tutor")

        this.gameManager = new GameManager()
    }

    async create() {

        super.create();
        
        //Stop all sound, because game will return to this scene on retry.
        this.sound.stopAll();

        createTutorAnimation(this.anims);
       
        this.#paintScene();

        await this.gameManager.initGameData();

    }


    #paintScene() {

        let uiLayer = this.add.layer().setDepth(0);

        const tutorSprite = new GameSprite(this, this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'tutorTexture');
        const exitProgressGameButton = new ExitProgressGameButton(this, 120, 135);
        const startButton = new StartButton(this, this.getColWidth(6), this.getRowHeight(10)).setScale(0.8);

        tutorSprite.play('tutorAnimation');

        uiLayer.add([this.buildBackground('backgroundTutorEnd'), tutorSprite, exitProgressGameButton, startButton]);


    }


}