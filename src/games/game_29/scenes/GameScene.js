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
        // this.answer = this.dataModal['level'+ this.currentLevel][Math.floor(Math.random() * this.dataModal['level'+ this.currentLevel].length)] // this.currentLevel - 1
        this.answer = this.dataModal['level2'][4] // this.currentLevel - 1
    
    }

    preload() {
        this.buildBg('bg_tutor')
        this.anims.create({
            key: 'crt_ans_star',
            delay: 200,
            // frameRate: 8,
            frames: this.anims.generateFrameNames('crt_ans_star', { prefix: 'crt ans_star', start: 0, end: 14, zeroPad: 4 }),
            repeat: -1
        });

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

        self.input.on('dragenter', function (pointer, gameObject, dropZone) {
            currentZone = dropZone;
            dropZone.toggleZoneFrame(1)
        })

        self.input.on('dragleave', (pointer, gameObject, dropZone) => {
            currentZone = null;
            dropZone.toggleZoneFrame(0)
        })

        self.input.on('dragend', (pointer, gameObject, dropped) => {
            if (dropped) {
                this.scoreboard.quiz(gameObject, currentZone)
                currentZone.toggleZoneFrame(0)
                currentZone = null;
            }
        })


    }

    initScene() {
        this.article = new Article(this, 0, 50, this.currentLevel)
        this.butterfly = new Butterfly(this, 960, 280)
        this.scoreboard = new Scoreboard(this, 950, 50, this.onCompleteOnce.bind(this), this.onHighlight.bind(this))
        this.scoreboard.init(this.answer);
        this.article.createArticle(this.answer)

    }

    onCompleteOnce(type) {
        this.butterfly.highlightBody(type)
    }

    onHighlight(type) {
        this.article.highlightCharacters(type)
    }

}