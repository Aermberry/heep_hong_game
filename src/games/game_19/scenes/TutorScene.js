import BasicScene from "./BasicScene"
import StartButton from "../components/StartButton"
import ExitButton from '../components/ExitButton'
import GameManager from "../components/GameManager";
import { createTutorAnimations } from "../assets/animations/TutorAnimation";
import GameSprite from "../components/GameSprite";

export default class TutorScene extends BasicScene {

    constructor() {
        super({
            key: "Tutor"
        })

        this.buttonLayer = undefined;
        this.backgroundLayer = undefined;

        this.gameManager = new GameManager()
    }

    async create() {

        super.create();

        this.input.setDefaultCursor(`url(), auto`);

        createTutorAnimations(this.anims);

        //Stop all sound, because game will return to this scene on retry.
        this.sound.stopAll();

        this.#paintGameScene();

        await this.gameManager.initGameData();
    }


    #paintGameScene() {

        this.buttonLayer = this.add.layer().setDepth(1);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.buttonLayer.add([new ExitButton(this, 120, 135), new StartButton(this, this.getColWidth(6), this.getRowHeight(10.5))]);

        let tutor = new GameSprite(this, this.getColWidth(6), this.getRowHeight(5), 'tutor_Animation').setScale(0.8);

        this.backgroundLayer.add([this.buildBg('bgTutor'), tutor]);
    }


}