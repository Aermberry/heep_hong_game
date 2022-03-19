import BasicScene from "./BasicScene";
import config from '../config/index'

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
            'reg_market_text': { img: require('../assets/img/reg_market_text.png'), data: require('../assets/img/reg_market_text.json') }
        }

        const soundFiles = {
        }

        this.preloadFromArr({
            img: imageFiles,
            atlas: atlasFiles,
            sound: soundFiles,
        });

        // this.createProgressBar();
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
        this.anims.create({
            key: 'entrance_dog',
            frames: this.anims.generateFrameNames('entrance_dog', { prefix: 'entrance_doggy', start: 0, end: 11, zeroPad: 4 }),
            repeat: -1,
            delay: 200
        });

        this.anims.create({
            key: 'entrance_owl',
            frames: this.anims.generateFrameNames('entrance_owl', { prefix: 'entrance_owl', start: 0, end: 26, zeroPad: 4 }),
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
        this.add.sprite(this.getColWidth(8.7), this.getRowHeight(8.6), 'reg_market').setScale(1.3);
        shelf.setScale(1.3);
        let entrance_owl = this.add.sprite(this.getColWidth(9.5), this.getRowHeight(3.9), 'entrance_owl');
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