import ExitProgressGameButton from "../components/ExitProgressGameButton";
import StartButton from "../components/StartButton";
import BasicScene from "./BasicScene"
import GameSprite from '../components/GameSprite';
import GameManager from "../components/GameManager";
import {
    createTutorAnimations
} from "../assets/animations/TutorAnimation";

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

         if (this.scene.get('EndUI')) {
             this.scene.stop('EndUI');
         }

        this.paintGameScene();

        await this.gameManager.initGameData();

    }


    paintGameScene() {

        let buttonLayer = this.add.layer().setDepth(1);
        let animationLayer = this.add.layer().setDepth(2);
        let backgroundLayer = this.add.layer().setDepth(0);

        buttonLayer.add([new ExitProgressGameButton(this, 100, 120), new StartButton(this, this.getColWidth(6), this.getRowHeight(10.8)).setScale(0.8)]);
        this.playTutorAnimation(animationLayer);
        backgroundLayer.add([this.buildBg('backgroundTutorEnd')]);
    }

    playTutorAnimation(layer) {
        let tutor01Sprite = new GameSprite(this, this.cameras.main.width / 2-400,  this.cameras.main.height / 2, 'tutor01Texture');
        let tutor02Sprite = new GameSprite(this, this.cameras.main.width / 2 , this.cameras.main.height / 2 -262, 'tutor02Texture');
        let tutor03Sprite = new GameSprite(this, this.cameras.main.width / 2 + 400,  this.cameras.main.height / 2, 'tutor03Texture');

        layer.add([tutor01Sprite, tutor02Sprite, tutor03Sprite])

        tutor01Sprite.on('animationcomplete', () => {
            tutor02Sprite.play('tutor02Animation')
        })
        tutor02Sprite.on('animationcomplete', () => {
            tutor03Sprite.play('tutor03Animation')
        })
        tutor03Sprite.on('animationcomplete', () => {
            tutor01Sprite.play('tutor01Animation')
        })

        tutor01Sprite.play('tutor01Animation')
    }


}