import BasicScene from "./BasicScene"

export default class GameScene extends BasicScene {

    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {

        this.buildBg('bg_tutor')

        const atlasFiles = {
            'headband': { img: require('../assets/headband.png'), data: require('../assets/headband.json')},
            'cat_back': { img: require('../assets/cat_back.png'), data: require('../assets/cat_back.json')},
        }

        this.preloadFromArr({
            atlas: atlasFiles
        });

        this.createProgressBar();

    }

    create() {

        super.create();

        this.buildBg('bg_base')

        this.anims.create({
            key: 'headband',
            repeat: -1,
            frames: this.anims.generateFrameNames('headband', { prefix: 'headband', start: 0, end: 18, zeroPad: 4 }),
        });
        this.anims.create({
            key: 'cat_back',
            repeat: -1,
            frames: this.anims.generateFrameNames('cat_back', { prefix: 'cat_back', start: 0, end: 38, zeroPad: 4 }),
        });

        let catBack = this.add.sprite(this.getColWidth(2.2), this.getRowHeight(6), 'cat_back')
        let headBand = this.add.sprite(this.getColWidth(6), this.getRowHeight(3), 'headband')

        catBack.play()
        headBand.play()
    }

}