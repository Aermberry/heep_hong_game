import BasicScene from "./BasicScene"
import StartButton from "../components/StartButton"
import ExitButton from '../components/ExitProgressGameButton'
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
    }


    #paintGameScene() {

        let buttonLayer = this.add.layer().setDepth(1);
        let backgroundLayer = this.add.layer().setDepth(0);

        buttonLayer.add([
            new ExitButton(this, 100, 120), 
            new StartButton(this, this.cameras.main.displayWidth/2+50, 
                this.getRowHeight(10)).setScale(0.8)]);

        backgroundLayer.add([this.buildBg('bgTutor')]);

        this.playTutorAnimation(backgroundLayer);
    }


    playTutorAnimation(layer) {

        let tutor01Sprite = new TutorSprite(this, this.cameras.main.width/2-300, 500, 'tutorTexture01').setScale(0.7);
        let tutor02Sprite = new TutorSprite(this, this.cameras.main.width/2, 280, 'tutorTexture02').setScale(0.7);
        let tutor03Sprite = new TutorSprite(this, this.cameras.main.width/2+tutor02Sprite.displayWidth-43, 500, 'tutorTexture03').setScale(0.7);

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