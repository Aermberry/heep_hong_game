import Article from "../objects/Article";
import BasicScene from "./BasicScene"
import Butterfly from "../objects/Butterfly";
import Scoreboard from "../objects/Scoreboard";
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
        this.answer = this.dataModal.level1[this.currentLevel - 1]
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
        let currentZone;
        let self = this;
        let text = 'text';
        let sprite = self.add.text(0, 0, text, {
            fontSize: '40px', //30px
            color: '#000000',
            fontWeight: 'bold',
            fontFamily: "system-ui"
        })

        self.input.on('dragenter', function (pointer, gameObject, dropZone) {
            currentZone = dropZone.type;
            text = dropZone.type;
            sprite.setText(text)
            //调用dropZone 换颜色方法
        })

        self.input.on('dragleave', () => {
            currentZone = null;
            sprite.setText('')
        })

        self.input.on('dragend', (pointer, gameObject, dropped) => {
            if (dropped) {
                this.scoreboard.quiz(gameObject, currentZone)
                currentZone = null;
            }
        })


    }

    initScene() {

        // let butterfly = 
        // new Butterfly(this, 200, 100)
        // let article = new Article(this, 100, 480)
        let article = new Article(this, 0, 0)
        new Butterfly(this, 960, 50)
        this.scoreboard = new Scoreboard(this, 950, 700)
        this.scoreboard.init(this.answer);
        article.createArticle(this.answer)
    }

}