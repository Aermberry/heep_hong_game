import Article from "../objects/Article";
import BasicScene from "./BasicScene"
import Butterfly from "../objects/Butterfly";
import Scoreboard from "../objects/Scoreboard";
import SpeakerBtn from '../objects/SpeakerBtn'
import ExitBtn from '../objects/ExitBtn'
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
        this.gameNum = this.sys.game.globals.model.game;
        if (this.gameNum == 29) {
            this.answer = this.dataModal['level' + this.currentLevel][Math.floor(Math.random() * this.dataModal['level' + this.currentLevel].length)] // this.currentLevel - 1
            // this.answer = this.dataModal['level2'][2]
        } else {
            this.answer = this.dataModal['level1'][Math.floor(Math.random() * this.dataModal['level1'].length)]
        }

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
        this.sound.stopAll();

        //初始化游戏场景
        this.initScene();
        this.music = this.sound.add('bgm')
        this.music.setLoop(true)
        this.music.play();

        let exitBtn = new ExitBtn(this, 100, 80);
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.5), 80, this.musicPause.bind(this));
        this.add.existing(this.speakerBtn);
        this.add.existing(exitBtn);
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
                let flag = this.scoreboard.quiz(gameObject, currentZone)
                if (!flag) {
                    currentZone.showError(pointer);
                }
                currentZone.toggleZoneFrame(0)
                currentZone = null;
            }
        })


    }

    initScene() {
        this.article = new Article(this, 0, 50, this.gameNum == 30 ? 2 : this.currentLevel)
        if (this.gameNum == 30) {
            let keys = [];
            Object.keys(this.answer.type).forEach(key => {
                if (this.answer.type[key] != 0) {
                    keys.push(key)
                }
            });
            let arrNew = [];
            for (var i = 0; i < 3; i++) {
                var _num = Math.floor(Math.random() * keys.length)
                var mm = keys[_num];
                keys.splice(_num, 1)
                arrNew.push(mm)
            }
            this.butterfly = new Butterfly(this, 980, 290, arrNew)
            this.scoreboard = new Scoreboard(this, 950, 50, this.onCompleteOnce.bind(this), this.onHighlight.bind(this), this.onComplete.bind(this), true)
            this.scoreboard.init(arrNew);
        } else {
            this.butterfly = new Butterfly(this, 980, 250)
            this.scoreboard = new Scoreboard(this, 950, 50, this.onCompleteOnce.bind(this), this.onHighlight.bind(this), this.onComplete.bind(this))
            this.scoreboard.init(this.answer);
        }
        this.article.createArticle(this.answer)

    }

    onCompleteOnce(type) {
        this.butterfly.highlightBody(type)
    }

    onHighlight(type) {
        this.article.highlightCharacters(type)
    }

    onComplete() {
        this.article.onComplete();
    }


    musicPause() {
        this.stopAll = !this.stopAll;
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('bgm', {
                volume: 0.1
            });
            this.music.setLoop(true);
            this.music.play();
        }
    }
}