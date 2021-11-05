import BasicScene from "./BasicScene";
// import Phaser from "phaser";
// import ExitBtn from '../objects/ExitBtn'
// import DoneBtn from '../objects/DoneBtn'
// import SpeakerBtn from '../objects/SpeakerBtn'
import Question from '../objects/Question';
import Answers from '../objects/Answers';
import Holder from "../objects/Holder";
import Shelf from "../objects/Shelf";
import Bsk from "../objects/Bsk";

export default class GameScene extends BasicScene {
    constructor() {
        super({
            key: 'Game'
        });

    }


    init(data) {
        if (data.level) {
            this.currentLevel = data.level;
        } else {
            this.currentLevel = 1;
        }
        this.dataModal = this.sys.game.globals.model;

    }

    preload() {
        this.buildBg('bg')

        this.anims.create({
            key: 'owl_swing',
            frames: this.anims.generateFrameNames('owl_swing', { prefix: 'owl_swing', start: 0, end: 89, zeroPad: 4 }),
            repeat: -1,
            delay: 200
        });

        this.anims.create({
            key: 'pack_star',
            frames: this.anims.generateFrameNames('pack_star', { prefix: 'pack_star', start: 0, end: 30, zeroPad: 4 }),
            repeat: -1,
            delay: 2000
        });


        this.anims.create({
            key: 'correct',
            frames: this.anims.generateFrameNames('correct', { prefix: 'correct', start: 0, end: 19, zeroPad: 4 }),
            repeat: -1,
            delay: 2000
        });

        this.anims.create({
            key: 'wrong',
            frames: this.anims.generateFrameNames('wrong', { prefix: 'wrong', start: 0, end: 19, zeroPad: 4 }),
            repeat: -1,
            delay: 2000
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
        this.gameStart();

    }

    gameStart() {
        let rectangle = this.add.rectangle(this.getColWidth(6), this.getRowHeight(6), 1920, 1080, 0xffffff, 1);
        rectangle.setDepth(999);
        rectangle.setAlpha(1);
        this.gameStartAnimations(rectangle);
    }

    gameStartAnimations(o) {
        this.tweens.add({
            targets: o,
            fillAlpha: o.fillAlpha - 0.2,
            duration: 200,
            ease: 'Power2'
        }).on('complete', () => {
            if (o.fillAlpha >= 0.8) {
                this.shelf = new Shelf(this, this.getColWidth(5.8), this.getRowHeight(5.2))
                this.reg = this.add.sprite(this.getColWidth(10), this.getRowHeight(7), 'reg_market');
                this.add.text(this.getColWidth(8.7), this.getRowHeight(4), '歡迎光臨', {
                    color: '#000000',
                    fontSize: '30px',
                    fontFamily: "Custom-Han-Serif"
                })
                this.sign = this.add.sprite(this.getColWidth(10), this.getRowHeight(1), 's1_sign');
                this.owl = this.add.sprite(this.getColWidth(11), this.getRowHeight(4), 'owl_swing');
                this.owl.play('owl_swing')
                this.gameStartAnimations(o)
            } else if (o.fillAlpha >= 0.6) {
                this.list = new Question(this, this.getColWidth(0), this.getRowHeight(7))
                this.holder = new Holder(this, this.getColWidth(6.3), this.getRowHeight(15))
                this.bag = new Bsk(this,this.getColWidth(2), this.getRowHeight(15));
                this.move(this.list, this.getColWidth(1.7), this.getRowHeight(7), 1000)
                let self = this;
                this.move(this.holder.holder, this.getColWidth(6.3), this.getRowHeight(11)).then(() => self.holder.refreshZone());
                this.move(this.bag.sprite, this.getColWidth(2), this.getRowHeight(10.5))
                this.gameStartAnimations(o)
            } else if (o.fillAlpha > 0) {
                this.gameStartAnimations(o)
            } else {
                o.destroy();
                this.Answers = new Answers(this, this.getColWidth(4), this.getRowHeight(2.3))
            }
        })
    }

    move(o, x, y, d = 200) {
        return new Promise((resolve) => {
            this.tweens.add({
                targets: o,
                x: x,
                y: y,
                duration: d,
                ease: 'Power2'
            }).on('complete', () => {
                resolve();
            });
        });
    }



}