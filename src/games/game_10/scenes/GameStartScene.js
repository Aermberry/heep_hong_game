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
        this.sound.removeAll();

        const imageFiles = {

        };

        const atlasFiles = {
            'entrance_dog': { img: require('../assets/img/entrance_dog.png'), data: require('../assets/img/entrance_dog.json') },
            'entrance_owl': { img: require('../assets/img/entrance_owl.png'), data: require('../assets/img/entrance_owl.json') },
        }

        const soundFiles = {
            'dog_walk_in': require('../assets/audio/Shop Door Bell PE802601.mp3'),
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles,
            sound: soundFiles,
        });

        this.createProgressBar();
    }

    create() {
        super.create();
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
        let music = this.sound.add('dog_walk_in');
        music.play();
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
        this.moveDog(entrance_dog, entrance_dog.x + 600)
    }

    moveDog(o, x) {
        this.moveUp(o, x, () => {
            this.scene.start('Game', { level: 1 });
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