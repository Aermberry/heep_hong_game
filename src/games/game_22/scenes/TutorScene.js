import BasicScene from "./BasicScene"
import StartButton from "../components/StartButton"
import ExitButton from '../components/ExitButton'
import { createTutorAnimations } from '../assets/animations/TutorAnimation';
import TutorSprite from '../components/TutorSprite';
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

        this.playTutorAnimation(animationLayer);

        backgroundLayer.add([this.buildBg('bgTutor')]);
    }


    playTutorAnimation(layer) {
        let tutor01Sprite = new TutorSprite(this, 278, 500, 'tutor01Texture');
        let tutor02Sprite = new TutorSprite(this, 740, 280, 'tutor02Texture');
        let tutor03Sprite = new TutorSprite(this, 1202, 500, 'tutor03Texture');
        let tutor04Sprite = new TutorSprite(this, 1662, 280, 'tutor04Texture');
        let tutor05Sprite = new TutorSprite(this, 1662, 700, 'tutor05Texture');

        layer.add([tutor01Sprite,tutor02Sprite,tutor03Sprite,tutor04Sprite,tutor05Sprite])

        tutor01Sprite.on('animationcomplete', () => {
            tutor02Sprite.play('tutor02Animation')
        })
        tutor02Sprite.on('animationcomplete', () => {
            tutor03Sprite.play('tutor03Animation')
        })
        tutor03Sprite.on('animationcomplete', () => {
            tutor04Sprite.play('tutor04Animation')
        })
        tutor04Sprite.on('animationcomplete', () => {
            tutor05Sprite.play('tutor05Animation')
        })
        tutor05Sprite.on('animationcomplete', () => {
            tutor01Sprite.play('tutor01Animation')
        })

        tutor01Sprite.play('tutor01Animation')
    }




}