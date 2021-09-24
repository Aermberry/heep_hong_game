import BasicScene from "./BasicScene"
import StartButton from "../components/StartButton"
import ExitButton from '../components/ExitButton'
import LocalRepository from "../repository/LocalRepository"

export default class TutorSecene extends BasicScene {

    constructor() {
        super({
            key: "Tutor"
        })

        this.buttonLayer = undefined;
        this.backgroundLayer = undefined;
        this.localRepository = new LocalRepository()
        this.questionNumberList = [];
    }

    async create() {

        super.create();

        this.input.setDefaultCursor(`url(), auto`);

        //Stop all sound, because game will return to this scene on retry.
        this.sound.stopAll();

        this.#paintGameScene();
        localStorage.clear();
        localStorage.setItem('gamePlayTotal', JSON.stringify(5));

        this.questions = await this.localRepository.loadData();

        for (const key in this.questions) {
            localStorage.setItem(key, JSON.stringify(this.questions[key]));
            this.questionNumberList.push(key)
        }

        localStorage.setItem('questionNumberList', JSON.stringify(this.questionNumberList));
    }


    #paintGameScene() {

        this.buttonLayer = this.add.layer().setDepth(1);
        this.backgroundLayer = this.add.layer().setDepth(0);

        this.buttonLayer.add([new ExitButton(this, 120, 135), new StartButton(this, this.getColWidth(6), this.getRowHeight(10.5))]);

        this.backgroundLayer.add([this.buildBg('bgTutor'), this.add.image(this.getColWidth(6), this.getRowHeight(5), 'iconTutor').setScale(0.6)]);
    }


}