import Article from "../objects/Article";
import BasicScene from "./BasicScene"
// import SpeakerBtn from '../objects/SpeakerBtn'
export default class GameScene extends BasicScene {
    constructor() {
        super({
            key: 'Game'
        });

    }


    init(data) {
        if (data.level) {
            this.pastProblems = data.pastProblems;
            this.currentLevel = data.level;
        } else {
            this.pastProblems = [];
            this.currentLevel = 1;
        }
        this.dataModal = this.sys.game.globals.model.gameData;

    }

    preload() {
        this.buildBg('bg_tutor')
        // this.anims.create({
        //     key: 'wow_car',
        //     delay: 200,
        //     frameRate: 8,
        //     frames: this.anims.generateFrameNames('wow_car', { prefix: 'Symbol 1', start: 0, end: 12, zeroPad: 4 }),
        //     repeat: 0
        // });

        const imageFiles = {

        };

        const atlasFiles = {
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        });

        this.createProgressBar();
    }

    create() {
        super.create();
        this.buildBg('bg');
        //初始化游戏场景
        this.initScene();
    }

    initScene() {
        this.answer = this.dataModal.level1[0]
        let article = new Article(this, 100, 480)
        article.createArticle(this.answer)
    }

}