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

        this.load.spritesheet('but_shw_body', require('../assets/img/but5.png'), { frameWidth: 807, frameHeight: 1177.5 });
        this.load.spritesheet('but_shw_head', require('../assets/img/but3.png'), { frameWidth: 523, frameHeight: 521.5 });
        this.load.spritesheet('but_shw_sol', require('../assets/img/but1.png'), { frameWidth: 372, frameHeight: 399.5 });
        this.load.spritesheet('but_shw_sor', require('../assets/img/but2.png'), { frameWidth: 372, frameHeight: 399.5 });
        this.load.spritesheet('but_shw_wl', require('../assets/img/but4.png'), { frameWidth: 870, frameHeight: 1007.5 });
        this.load.spritesheet('but_shw_wr', require('../assets/img/but6.png'), { frameWidth: 870, frameHeight: 1007 });
        this.load.spritesheet('chkmrk', require('../assets/img/chkmrk.png'), { frameWidth: 151, frameHeight: 150.5 });

        this.load.spritesheet('but_bx1', require('../assets/img/but_tag1.png'), { frameWidth: 274, frameHeight: 400.5 });
        this.load.spritesheet('but_bx2', require('../assets/img/but_tag2.png'), { frameWidth: 274, frameHeight: 400.5 });
        this.load.spritesheet('but_bx3', require('../assets/img/but_tag3.png'), { frameWidth: 274, frameHeight: 400.5 });
        this.load.spritesheet('but_bx4', require('../assets/img/but_tag4.png'), { frameWidth: 652, frameHeight: 400.5 });
        this.load.spritesheet('but_bx5', require('../assets/img/but_tag5.png'), { frameWidth: 365, frameHeight: 354 });
        this.load.spritesheet('but_bx6', require('../assets/img/but_tag6.png'), { frameWidth: 466, frameHeight: 400.5 });

        this.load.spritesheet('hinsbx1', require('../assets/img/hin_box1.png'), { frameWidth: 118, frameHeight: 93 });
        this.load.spritesheet('hinsbx2', require('../assets/img/hin_box2.png'), { frameWidth: 118, frameHeight: 93 });
        this.load.spritesheet('hinsbx3', require('../assets/img/hin_box3.png'), { frameWidth: 118, frameHeight: 93 });
        this.load.spritesheet('hinsbx4', require('../assets/img/hin_box4.png'), { frameWidth: 313, frameHeight: 95 });
        this.load.spritesheet('hinsbx5', require('../assets/img/hin_box5.png'), { frameWidth: 175, frameHeight: 95 });
        this.load.spritesheet('hinsbx6', require('../assets/img/hin_box6.png'), { frameWidth: 175, frameHeight: 95 });

        for (let index = 1; index <= 6; index++) {
            this.load.spritesheet(`lv3hinsbx${index}`, require(`../assets/img/lv3_hin_box${index}.png`), { frameWidth: 218, frameHeight: 92 });
        }

        this.load.spritesheet('cha6', require('../assets/img/cha1.png'), { frameWidth: 522, frameHeight: 2491 / 3 });
        this.load.spritesheet('cha5', require('../assets/img/cha2.png'), { frameWidth: 751, frameHeight: 2720 / 3 });
        this.load.spritesheet('cha4', require('../assets/img/cha3.png'), { frameWidth: 740, frameHeight: 2804 / 3 });
        this.load.spritesheet('cha3', require('../assets/img/cha4.png'), { frameWidth: 769, frameHeight: 3132 / 3 });
        this.load.spritesheet('cha2', require('../assets/img/cha5.png'), { frameWidth: 661, frameHeight: 3307 / 3 });
        this.load.spritesheet('cha1', require('../assets/img/cha6.png'), { frameWidth: 1071, frameHeight: 3904 / 3 });

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
        this.sound.stopAll();
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('bgm')
            this.music.setLoop(true)
            this.music.play();
        }
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