import Article from "../objects/Article";
import BasicScene from "./BasicScene"
import Butterfly from "../objects/Butterfly";
import Scoreboard from "../objects/Scoreboard";
import SpeakerBtn from '../objects/SpeakerBtn'
import ExitBtn from '../objects/ExitBtn'
import config from '../config/index'

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
        } else {
            // this.answer = this.dataModal['level1'][Math.floor(Math.random() * this.dataModal['level1'].length)]
            this.answer = this.dataModal['level1'][3]

        }

    }

    preload() {
        this.buildBg('bg_tutor')
        let gameStage = this.sys.game.globals.model.game
        this.sys.game.globals.gtag.event(`game_${gameStage}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start'})
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

        let self = this;
        self.progressBar = self.add.graphics();
        self.loadingText = self.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff'
            }
        });
        self.loadingText.setOrigin(0.5, 0.5);
    
        self.load.on('progress', function (value) {
          self.progressBar.clear();
          self.progressBar.fillStyle(0xFC8EFA, 1);
          self.progressBar.fillRect(config.width * 0.118, config.height * 0.92, (config.width * 0.778) * value, 10);
        });
    
        self.load.on('complete', function () {
          self.loadingText.setText('連接完成');
        }.bind(self));
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