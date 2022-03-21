import ExitProgressGameButton from "../components/ExitProgressGameButton";
import StartButton from "../components/StartButton";
import BasicScene from "./BasicScene"
import GameManager from "../components/GameManager";
import GameSprite from "../phaser3_framework/object/GameSprite";
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
       
        this.paintScene();

        await this.gameManager.initGameData();

    }


    paintScene() {

        let uiLayer = this.add.layer().setDepth(0);

        const exitProgressGameButton = new ExitProgressGameButton(this, 100, 120);
        const startButton = new StartButton(this, this.getColWidth(6), this.getRowHeight(10)).setScale(0.8);
        
        uiLayer.add([this.buildBackground('backgroundTutorEnd'), exitProgressGameButton, startButton]);

        this.playTutorAnimation(uiLayer)


    }

   playTutorAnimation(layer) {
       const tutorSprite01 = new GameSprite(this, this.cameras.main.width / 2 - 150, this.cameras.main.height / 2 - 110, 'tutorTexture01').setScale(1.3);
       const tutorSprite02 = new GameSprite(this, this.cameras.main.width / 2 + 220, this.cameras.main.height / 2-120, 'tutorTexture02').setScale(1.3);
       // const tutorSprite03 = new GameSprite(this, this.cameras.main.width / 2 + 390, this.cameras.main.height / 2 - 70, 'tutorTexture03').setScale(0.75);

       layer.add([tutorSprite02, tutorSprite01])

       // tutorSprite01.on('animationcomplete', () => {
       //    tutorSprite02.play('tutorAnimation02');
       // })
       // tutorSprite02.on('animationcomplete', () => {
       //      tutorSprite03.play('tutorAnimation03');
       // })
       // tutorSprite03.on('animationcomplete', () => {
       //     tutorSprite01.play('tutorAnimation01');
       // })

       tutorSprite01.play('tutorAnimation01')
       tutorSprite02.play('tutorAnimation02');
   }


}