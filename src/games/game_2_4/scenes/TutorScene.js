import ExitProgressGameButton from "../components/ExitProgressGameButton";
import StartButton from "../components/StartButton";
import BasicScene from "./BasicScene"
import GameManager from "../components/GameManager";
import GameSprite from "../components/GameSprite";
import { createTutorAnimation } from "../assets/animations/TutorAnimation";

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
        await this.gameManager.initGameData();

        this.#paintGameScene();

    }


    #paintGameScene() {

        let buttonLayer = this.add.layer().setDepth(1);
        let animationLayer = this.add.layer().setDepth(2);
        let backgroundLayer = this.add.layer().setDepth(0);

        buttonLayer.add([new ExitProgressGameButton(this, 120, 135), new StartButton(this, this.getColWidth(6), this.getRowHeight(10.8)).setScale(0.8)]);

        const tutorSprite = new GameSprite(this, this.cameras.main.width / 2, this.cameras.main.height / 2-100, 'tutorTexture');

        tutorSprite.play('tutorAnimation');

        animationLayer.add([
            // this.add.image(278 + 250, 500, 'imageTutor01').setScale(0.5),
            // this.add.image(740 + 250, 280, 'imageTutor02').setScale(0.5),
            // this.add.image(1202 + 250, 500, 'imageTutor03').setScale(0.5),
            tutorSprite
            // new GameSprite(this, 740, 280, 'tutor02Animation'),
            // new GameSprite(this, 1202, 500, 'tutor03Animation'),
            // new GameSprite(this, 1662, 280, 'tutor04Animation'),
            // new GameSprite(this, 1662, 700, 'tutor05Animation'),
        ]
        );
        backgroundLayer.add([this.buildBackground('backgroundTutorEnd')]);


    }


}