import BasicScene from "./BasicScene";
// import Phaser from "phaser";
// import ExitBtn from '../objects/ExitBtn'
// import DoneBtn from '../objects/DoneBtn'
// import SpeakerBtn from '../objects/SpeakerBtn'

export default class GameStarScene extends BasicScene {
    constructor() {
        super({
            key: 'GameStart'
        });

    }

    preload() {
        this.buildBg('bg')
        this.anims.create({
            key: 'entrance_dog',
            frames: this.anims.generateFrameNames('entrance_dog', { prefix: 'doggy', start: 0, end: 29, zeroPad: 4 }),
            repeat: -1,
            delay: 200
        });

        this.anims.create({
            key: 'entrance_owl',
            frames: this.anims.generateFrameNames('entrance_owl', { prefix: 'entrance_owl', start: 0, end: 48, zeroPad: 4 }),
            repeat: -1,
            delay: 200
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
        let shelf = this.add.sprite(this.getColWidth(3.2), this.getRowHeight(7.2), 's1_shelf');
        this.add.sprite(this.getColWidth(10.3), this.getRowHeight(1), 's1_sign');
        shelf.setScale(1.3);
        let entrance_owl = this.add.sprite(this.getColWidth(9.5), this.getRowHeight(6.9), 'entrance_owl');
        let entrance_dog = this.add.sprite(this.getColWidth(2), this.getRowHeight(7.2), 'entrance_dog');
        entrance_dog.play('entrance_dog');
        entrance_owl.play('entrance_owl');
        this.moveDog(entrance_dog, entrance_dog.x + 400)
    }

    moveDog(o, x) {
        this.moveUp(o, x, () => {
            this.scene.start('Game');
        });
    }
    moveUp(o, x, callback) {
        if (o.x < x) {
            this.tweens.add({
                targets: o,
                x: o.x + 40,
                y: o.y - 10,
                duration: 200,
                ease: 'Power2'
            }).on('complete', () => {
                if (o.x < x) {
                    this.moveDown(o, x, () => {
                        callback();
                    });
                } else {
                    callback();
                }
            });
        }
    }

    moveDown(o, x, callback) {
        if (o.x < x) {
            this.tweens.add({
                targets: o,
                x: o.x + 40,
                y: o.y + 13,
                duration: 200,
                ease: 'Power2'
            }).on('complete', () => {
                if (o.x < x) {
                    this.moveUp(o, x, () => {
                        callback();
                    });
                } else {
                    callback();
                }
            });
        }
    }


}