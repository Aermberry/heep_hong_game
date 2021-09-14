import BasicScene from "./BasicScene"
import StartButton from "../components/StartButton"
import ExitButton from '../components/ExitButton'

export default class TutorSecene extends BasicScene {

    constructor() {
        super({
            key: "Tutor"
        })

        this.buttonLayer = undefined;
        this.backgroundLayer = undefined;
    }

    create() {

        super.create();



        //Stop all sound, because game will return to this scene on retry.
        this.sound.stopAll();

        this.#paintGameScene();

    }


    #paintGameScene() {

        this.buttonLayer = this.add.layer().setDepth(1);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.buttonLayer.add([new ExitButton(this, 120, 135), new StartButton(this, this.getColWidth(6), this.getRowHeight(10.5))]);

        this.backgroundLayer.add([this.buildBg('bgTutor'), this.add.image(this.getColWidth(6), this.getRowHeight(5), 'iconTutor').setScale(0.6)]);
    }


}