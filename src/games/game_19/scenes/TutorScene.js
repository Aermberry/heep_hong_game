import BasicScene from "./BasicScene"
import StartButton from "../components/StartButton"
import ExitButton from '../components/ExitButton'
import GameManager from "../components/GameManager";
import { createTutorAnimations } from "../assets/animations/TutorAnimation";
import TutorSprite from '../components/TutorSprite';


export default class TutorScene extends BasicScene {

    constructor() {
        super({
            key: "Tutor"
        })

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

        this.scene.start('Game')
    }


    #paintGameScene() {

        let buttonLayer = this.add.layer().setDepth(1);
        let backgroundLayer = this.add.layer().setDepth(0);

        buttonLayer.add([
            new ExitButton(this, 120, 135), 
            new StartButton(this, this.getColWidth(6), 
            this.getRowHeight(10.5))]);

        backgroundLayer.add([this.buildBg('bgTutor')]);

        this.playTutorAnimation(backgroundLayer);
    }


    playTutorAnimation(layer) {
        let tutor01Sprite = new TutorSprite(this, 300, 500, 'tutorTexture01');
        let tutor02Sprite = new TutorSprite(this, 930, 280, 'tutorTexture02');
        let tutor03Sprite = new TutorSprite(this, 1600, 500, 'tutorTexture03');

        layer.add([tutor01Sprite])

        tutor01Sprite.on('animationcomplete', (dd) => {
            console.log("dsdsds");
            console.log(dd)
            tutor02Sprite.play('tutor02Animation')
        })
        tutor02Sprite.on('animationcomplete', () => {
            tutor03Sprite.play('tutor03Animation')
        })
        tutor03Sprite.on('animationcomplete', () => {
            tutor01Sprite.play('tutor01Animation')
        })

        tutor01Sprite.play('tutor01Animation');
        
    }
}