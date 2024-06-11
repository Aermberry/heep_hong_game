import Phaser from "phaser";
import DialogWrongBox from "../components/DialogWrongBox";

export default class SecondErrorScene extends Phaser.Scene {

    constructor() {
        super({
            key: 'SecondError'
        })
    }

    init() {

    }

    create() {
        this.input.setDefaultCursor(`url(), auto`);

        const backgroundImage = this.add.image(0, 0, 'bgTutor').setOrigin(0, 0);
        const dialogWrongBox = new DialogWrongBox(this, 0, 0);

        Phaser.Display.Align.In.Center(dialogWrongBox, backgroundImage);

        this.sound.play('gameSceneYouLose');
        this.sound.play('dentistDrillEnvironmentSound');

    }
}