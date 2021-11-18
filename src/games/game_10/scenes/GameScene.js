import BasicScene from "./BasicScene";
// import Phaser from "phaser";
import ExitBtn from '../objects/ExitBtn'
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
            frames: this.anims.generateFrameNames('owl_swing', { prefix: 'owl_swing', start: 0, end: 19, zeroPad: 4 }),
            repeat: -1,
            delay: 200
        });

        this.anims.create({
            key: 'pack_star',
            frames: this.anims.generateFrameNames('pack_star', { prefix: 'pack_star', start: 0, end: 30, zeroPad: 4 }),
            repeat: -1,
            delay: 200
        });


        this.anims.create({
            key: 'game_correct',
            frames: this.anims.generateFrameNames('correct', { prefix: 'correct', start: 0, end: 19, zeroPad: 4 }),
            repeat: 0,
            delay: 0
        });

        this.anims.create({
            key: 'game_wrong',
            frames: this.anims.generateFrameNames('wrong', { prefix: 'wrong', start: 0, end: 19, zeroPad: 4 }),
            repeat: 0,
            delay: 0
        });

        this.anims.create({
            key: 'pack_market',
            frames: this.anims.generateFrameNames('pack_market', { prefix: 'pack_market', start: 0, end: 59, zeroPad: 4 }),
            repeat: 0,
            delay: 0
        });

        this.anims.create({
            key: 'pack_dog',
            frames: this.anims.generateFrameNames('pack_dog', { prefix: 'pack_dog', start: 0, end: 59, zeroPad: 4 }),
            repeat: 0,
            delay: 0
        });

        this.anims.create({
            key: 'pack_travel',
            frames: this.anims.generateFrameNames('pack_travel', { prefix: 'pack_travel', start: 0, end: 59, zeroPad: 4 }),
            repeat: 0,
            delay: 0
        });

        this.anims.create({
            key: 'pack_travel',
            frames: this.anims.generateFrameNames('pack_travel', { prefix: 'pack_travel', start: 0, end: 59, zeroPad: 4 }),
            repeat: 0,
            delay: 0
        });
        this.anims.create({
            key: 'pack_class',
            frames: this.anims.generateFrameNames('pack_class', { prefix: 'pack_class', start: 0, end: 59, zeroPad: 4 }),
            repeat: 0,
            delay: 0
        });
        this.anims.create({
            key: 'bb',
            frames: this.anims.generateFrameNames('bb', { prefix: 'bb', start: 8, end: 25, zeroPad: 4 }),
            repeat: 0,
            delay: 0
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
        this.regSprite = this.currentLevel == 1 ? 'reg_market' : this.currentLevel == 2 ? 'reg_travel' : 'reg_class'
        this.signSprite = this.currentLevel == 1 ? 's1_sign' : this.currentLevel == 2 ? 's2_sign' : 's3_sign'
        this.gameStart();

    }

    gameStart() {
        let rectangle = this.add.rectangle(this.getColWidth(6), this.getRowHeight(6), 1920, 1080, 0xffffff, 1);
        rectangle.setDepth(999);
        rectangle.setAlpha(1);
        this.gameStartAnimations(rectangle);
        let exitBtn = new ExitBtn(this, 120, 135);
        this.add.existing(exitBtn);

    }

    gameStartAnimations(o) {
        this.tweens.add({
            targets: o,
            fillAlpha: o.fillAlpha - 0.2,
            duration: 200,
            ease: 'Power2'
        }).on('complete', () => {
            if (o.fillAlpha >= 0.8) {
                this.sign = this.add.sprite(this.getColWidth(10), this.getRowHeight(1), this.signSprite);
                this.shelf = new Shelf(this, this.getColWidth(5.8), this.getRowHeight(5.2))
                if (this.currentLevel == 1) {
                    this.reg = this.add.sprite(this.getColWidth(10), this.getRowHeight(7), this.regSprite);
                    this.add.text(this.getColWidth(8.7), this.getRowHeight(4), '歡迎光臨', {
                        color: '#000000',
                        fontSize: '30px',
                        fontFamily: "Custom-Han-Serif"
                    })
                } else if (this.currentLevel == 2) {
                    this.reg = this.add.sprite(this.getColWidth(10), this.getRowHeight(5.8), this.regSprite);
                }
                else {
                    this.reg = this.add.sprite(this.getColWidth(10), this.getRowHeight(7), this.regSprite);
                }

                this.owl = this.add.sprite(this.getColWidth(10.7), this.getRowHeight(3.6), 'owl_swing');
                this.owl.play('owl_swing')

                this.gameStartAnimations(o)
            } else if (o.fillAlpha >= 0.6) {
                this.list = new Question(this, this.getColWidth(0), this.getRowHeight(7))
                this.holder = new Holder(this, this.getColWidth(6.3), this.getRowHeight(15))
                this.bag = new Bsk(this, this.getColWidth(2), this.getRowHeight(15));
                this.move(this.list, this.getColWidth(1.7), this.getRowHeight(7), 1000)
                let self = this;
                this.move(this.holder.holder, this.getColWidth(6.3), this.getRowHeight(11)).then(() => self.holder.refreshZone());
                this.move(this.bag.sprite, this.getColWidth(2), this.getRowHeight(10.5))
                this.gameStartAnimations(o)
            } else if (o.fillAlpha > 0) {
                this.gameStartAnimations(o)
            } else {
                o.destroy();
                this.sound.stopAll();
                let music = this.sound.add('stage_items');
                music.play();
                music.once('complete', () => {
                    let bgm = this.sound.add('bgm', { loop: true, volume: 0.4 })
                    bgm.play();
                });

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