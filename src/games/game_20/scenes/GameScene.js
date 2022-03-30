import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
import TipsBtn from '../objects/TipsBtn'
import SpeakerBtn from '../objects/SpeakerBtn'
import HanziWriter from "../hanzi-writer/index.cjs";
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
        this.dataModal = this.sys.game.globals.model;

    }

    preload() {
        this.buildBg('bg_tutor')

        //User need to press the Start Button to reach here, all audio need to be play after the first user touch event in mobile device.
        // let music = this.sound.add('drums')
        // music.setLoop(true)
        // music.play()

        this.anims.create({
            key: 'dog',
            delay: 200,
            frames: this.anims.generateFrameNames('dog', { prefix: 'dog', start: 0, end: 29, zeroPad: 4 }),
            repeat: -1
        });
        this.anims.create({
            key: 'crab',
            delay: 200,
            frames: this.anims.generateFrameNames('crab', { prefix: 'crab', start: 0, end: 30, zeroPad: 4 }),
            repeat: -1
        });

        this.anims.create({
            key: 'dog',
            delay: 200,
            frames: this.anims.generateFrameNames('dog', { prefix: 'dog', start: 0, end: 6, zeroPad: 4 }),
            repeat: -1
        });
        this.anims.create({
            key: 'wrong',
            delay: 200,
            frames: this.anims.generateFrameNames('wrong', { prefix: 'wrong', start: 0, end: 24, zeroPad: 4 }),
            repeat: 0
        });

        this.anims.create({
            key: 'done',
            delay: 200,
            frames: this.anims.generateFrameNames('done', { prefix: 'done', start: 0, end: 5, zeroPad: 4 }),
            frameRate: 5,
            repeat: 0
        });

        const imageFiles = {

        };

        const atlasFiles = {
        }
        let self = this;
        self.dataModal.gameItems.forEach((item, index) => {
            self.load.audio(item, require(`../assets/audio/characters/game20_0${index + 1 < 10 ? '0' + (index + 1) : index + 1}.mp3`))
        })
        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles
        });
        // this.createProgressBar();
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
        let gameStage = this.dataModal.gameStage
        this.sys.game.globals.gtag.event(`game_${gameStage}_start`, { 'event_category': 'js_games', 'event_label': 'Game Start' })

        this.buildBg('bg');
        this.sound.stopAll();
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('bgm', {
                volume: 1
            })
            this.music.setLoop(true)
            this.music.play();
        }
        let gameCanvas = document.getElementById('game-container').lastElementChild;
        gameCanvas.setAttributeNS(null, 'id', 'gameCanvas')
        this.size = null;
        this.getGameCanvas()
        this.observerWatch();
        //获取游戏画布大小
        this.g = document.createElement('div');
        this.g.setAttribute('id', 'grid-background-target');
        // this.g.style.zIndex = 999;
        this.g.style.position = 'absolute';
        this.g.style.top = "0"
        this.g.style.marginLeft = "33.3%";
        this.g.style.marginTop = "11%";
        let body = document.getElementById('game-container');
        body.appendChild(this.g);
        //监听可视窗口变化
        // this.addListernerWindowSize()
        // this.add.dom(this.getColWidth(6), this.getRowHeight(6), g, 'width:650px;height:650px;')

        let exitBtn = new ExitBtn(this, 120, 135);
        this.tipsBtn = new TipsBtn(this, this.getColWidth(10), this.getRowHeight(10))
        this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11.28), 135, this.musicPause.bind(this));

        this.add.existing(exitBtn);
        this.add.existing(this.tipsBtn);
        this.add.existing(this.speakerBtn);

        let dog = this.add.sprite(this.getColWidth(1.5), this.getRowHeight(9), 'dog')
        dog.play('dog');

        let crab = this.add.sprite(this.getColWidth(11), this.getRowHeight(7), 'crab')
        crab.play('crab');

        let data = this.dataModal.gameItems;

        this.pastProblems.forEach((item) => {
            data = data.filter((problems) => {
                if (item[0] !== problems[0]) {
                    return problems
                }
            })
        })

        this.item = data[Math.floor(Math.random() * data.length)];
        this.pastProblems.push(this.item)
        this.strokeNum = 0;
        var hanziData = require(`../assets/json/${this.item}`)
        this.writer = HanziWriter.create("grid-background-target", `${this.item}`, {
            width: this.size,
            height: this.size,
            padding: 0,
            drawingWidth: 30,
            leniency: 0.8, //难度
            strokeHighlightSpeed: 0.4, //绘制速度
            // highlightColor: '#126bae',
            highlightColor: '#000000',
            showHintAfterMisses: 1, //smiss次数
            drawingColor: '#FF7F74',
            // strokeColor: '#EE00FF',
            // radicalColor: '#168F16',
            highlightOnComplete: false,
            charDataLoader: () => hanziData
        });
        let element = document.querySelector('#gameCanvas')
        let el = document.getElementById('grid-background-target')

        let gameCanvasHeight = `${Number(element.style.height.split('px')[0]) * 0.20 + Number(element.style.marginTop.split('px')[0])}px`;
        el.style.marginTop = gameCanvasHeight;

        let gameCanvasWidth = `${Number(element.style.width.split('px')[0]) * 0.33 + Number(element.style.marginLeft.split('px')[0])}px`;
        el.style.marginLeft = gameCanvasWidth;


        let that = this;
        setTimeout(() => {
            that.writer.quiz({
                onCorrectStroke: function (strokeData) {
                    let writingAudio = that.sound.add('writing');
                    writingAudio.play();
                    if (strokeData.strokesRemaining > 0) {
                        that.strokeNum = strokeData.strokeNum + 1;
                    }
                },
                onMistake: function () {
                    that.strokeError();
                    // document.getElementById('grid-background-target').
                    // console.log("您在该笔画上错了 " + strokeData.mistakesOnStroke + " 次");
                    // console.log("本次测验共错了 " + strokeData.totalMistakes + " 次");
                    // console.log("此字还剩 " + strokeData.strokesRemaining + "笔");
                },
                onComplete: function () {
                    that.characterSuccess();
                },
            });
        }, 2000);


    }

    musicPause() {
        this.stopAll = !this.stopAll;
        if (this.stopAll) {
            this.sound.stopAll();
        } else {
            this.music = this.sound.add('bgm', {
                volume: 1
            });
            this.music.setLoop(true);
            this.music.play();
        }
    }

    observerWatch() {
        let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        let element = document.querySelector('#gameCanvas')
        let that = this;
        this.observer = new MutationObserver(() => {
            let width = getComputedStyle(element).getPropertyValue('width')
            let el = document.getElementById('grid-background-target')
            let gameCanvasHeight = `${Number(element.style.height.split('px')[0]) * 0.20 + Number(element.style.marginTop.split('px')[0])}px`;
            el.style.marginTop = gameCanvasHeight;
            let gameCanvasWidth = `${Number(element.style.width.split('px')[0]) * 0.33 + Number(element.style.marginLeft.split('px')[0])}px`;
            el.style.marginLeft = gameCanvasWidth;
            that.size = Number(width.split('px')[0]) / 2.953;
            that.writer.updateDimensions({ width: that.size, height: that.size });
        })
        this.observer.observe(element, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })


    }


    getGameCanvas() {
        let a = document.getElementById('gameCanvas');
        this.size = Number(a.style.width.split('px')[0]) / 2.953;
    }

    // addListernerWindowSize() {
    //     let that = this;
    //     window.onresize = function() {
    //         that.getGameCanvas();
    //         that.writer.updateDimensions({width: that.size, height: that.size});
    //     }
    // }

    strokeError() {
        let wrong = this.add.sprite(this.getColWidth(7.7), this.getRowHeight(2), 'wrong')
        let wrongAudio = this.sound.add('wrong');
        wrongAudio.play();
        wrong.play('wrong');
    }

    characterSuccess() {
        let textAudio = this.sound.add(this.item);
        textAudio.play();
        textAudio.on('complete', () => {
            let done = this.add.sprite(this.getColWidth(6), this.getRowHeight(4), 'done')
            done.play('done');
            let successAudio = this.sound.add('complete');
            successAudio.play();
            done.on('animationcomplete', () => {
                this.endGame();
            })
        })
    }

    showHighlightStroke() {
        this.writer.highlightStroke(this.strokeNum);
    }



    endGame() {
        let body = document.getElementById('game-container');
        body.removeChild(this.g);
        this.observer.disconnect();
        if (this.currentLevel == 5) {
            this.scene.start('End')
        } else {
            this.scene.start('Game', {
                level: this.currentLevel + 1,
                pastProblems: this.pastProblems
            })
        }
    }



}