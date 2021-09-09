import BasicScene from "./BasicScene"
import StartBtn from "../objects/StartBtn"
import ExitBtn from '../objects/ExitBtn'

export default class TutorSecene extends BasicScene {

    constructor() {
        super({
            key: "Tutor"
        })
    }

    create() {

        super.create();

        this.buildBg('bgTutor')

        const icon_tutor = this.add.image(this.getColWidth(6), this.getRowHeight(5), 'iconTutor')
        icon_tutor.setScale(0.6)



        //Stop all sound, because game will return to this scene on retry.
        this.sound.stopAll();

        let exitBtn = new ExitBtn(this, 120, 135);
        let startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(10.5));
        this.add.existing(exitBtn);
        this.add.existing(startBtn);
    }
}