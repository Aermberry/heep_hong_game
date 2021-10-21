import BasicScene from "./BasicScene"
import ExitBtn from '../objects/ExitBtn'
// import DoneBtn from '../objects/DoneBtn'
// import SpeakerBtn from '../objects/SpeakerBtn'
import HanziWriter from "../hanzi-writer/index.cjs";

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

        // let canvas = this.add.zone(this.getColWidth(6), this.getRowHeight(6), 650, 650);
        let g = document.createElement('div');
        g.setAttribute('id', 'grid-background-target');
        g.style.zIndex = 999;
        g.style.position = 'absolute';
        this.add.dom(this.getColWidth(6), this.getRowHeight(6),g,'width:650px;height:650px;')
        let exitBtn = new ExitBtn(this, 120, 135);
        // this.doneBtn = new DoneBtn(this, this.getColWidth(10), this.getRowHeight(10))
        // this.speakerBtn = new SpeakerBtn(this, this.getColWidth(11), 135);
        this.add.existing(exitBtn);
        // this.add.existing(this.doneBtn);
        // this.add.existing(this.speakerBtn);

        /**
         * 251，21，0
            90，170，255
            0，0，0
            160，197，92
         */

        let dog = this.add.sprite(this.getColWidth(1.5), this.getRowHeight(9), 'dog')
        dog.play('dog');
        var hanziData = require(`hanzi-writer-data/思`)
        var writer = HanziWriter.create("grid-background-target", '思', {
            width: 650,
            height: 650,
            padding: 0,
            drawingWidth: 30,
            leniency: 0.5, //难度
            strokeHighlightSpeed: 0.4, //绘制速度
            // highlightColor: '#126bae',
            highlightColor: '#000000',
            showHintAfterMisses: 1, //smiss次数
            drawingColor: '#FF7F74',
            // strokeColor: '#EE00FF',
            // radicalColor: '#168F16',
            charDataLoader: () => hanziData
          });

          writer.quiz({
            onMistake: function(strokeData) {
                console.log(hanziData);
                console.log('您在第' + strokeData.strokeNum + '画时出错');
                // document.getElementById('grid-background-target').

                // console.log("您在该笔画上错了 " + strokeData.mistakesOnStroke + " 次");
                // console.log("本次测验共错了 " + strokeData.totalMistakes + " 次");
                // console.log("此字还剩 " + strokeData.strokesRemaining + "笔");
            },
            onComplete: function(summaryData) {
                alert(`你完成了本次测试 ${summaryData.character}`)
            },
          });

    }



}