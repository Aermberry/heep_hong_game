import BasicScene from "./BasicScene"
import StartButton from "../components/StartButton"
import ExitButton from '../components/ExitButton'
import { createTutorAnimations } from '../assets/animations/TutorAnimation';
import GameSprite from '../components/GameSprite';
import GameManager from "../components/GameManager";

export default class TutorScene extends BasicScene {

    constructor() {
        super("Tutor")

        this.gameManager = new GameManager()
    }

    async create() {

        super.create();

        createTutorAnimations(this.anims);

        //Stop all sound, because game will return to this scene on retry.
        this.sound.stopAll();

        this.#paintGameScene();

        await this.gameManager.initGameData();
        
    }


    #paintGameScene() {

        let buttonLayer = this.add.layer().setDepth(1);
        let animationLayer = this.add.layer().setDepth(2);
        let backgroundLayer = this.add.layer().setDepth(0);

        buttonLayer.add([new ExitButton(this, 120, 135), new StartButton(this, this.getColWidth(6), this.getRowHeight(10.8)).setScale(0.8)]);
        animationLayer.add([
            new GameSprite(this, 278, 500, 'tutor01Animation'),
            new GameSprite(this, 740, 280, 'tutor02Animation'),
            new GameSprite(this, 1202, 500, 'tutor03Animation'),
            new GameSprite(this, 1662, 280, 'tutor04Animation'),
            new GameSprite(this, 1662, 700, 'tutor05Animation'),
        ]
        );
        backgroundLayer.add([this.buildBg('bgTutor')]);

    
    }


}