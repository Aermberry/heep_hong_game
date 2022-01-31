import Phaser from 'phaser';
import CONST from '../store';
const Rectangle = Phaser.Geom.Rectangle;

export default class BasicScene extends Phaser.Scene {

    create() {

        const pageWidth = this.cameras.main.width;
        const pageHeight = this.cameras.main.height;

        this.widthBlock = pageWidth / 12;
        this.heightBlock = pageHeight / 12;

    }

    buildBg(bg) {
        if(typeof bg === 'string') {
            this.bg = this.add.image(0, 0, bg);
            this.bg.setDisplaySize(this.game.scale.width, this.game.scale.height);
            this.bg.setOrigin(0, 0);
        }
    }

    /**
     *
     * @param colNum    Number of columns
     * @returns
     */
    getColWidth(colNum) {

        return colNum * this.widthBlock;

    }

    /**
     * @param rowNum    Number of rows
     * @returns
     */
    getRowHeight(rowNum) {

        return rowNum * this.heightBlock;

    }

    /**
     *
     * @param sources A key/path_string object
     */
    preloadFromArr({img = null, atlas = null, sound = null}) {

        if(img !== null) {
            Object.keys(img).forEach((fileName) => {
                this.load.image(fileName, img[fileName])
            })
        }

        if(atlas != null) {
            Object.keys(atlas).forEach((fileName) => {
                this.load.atlas(fileName, atlas[fileName]['img'], atlas[fileName]['data'])
            })
        }

        if(sound != null) {
            Object.keys(sound).forEach((fileName)=> {
                this.load.audio(fileName, sound[fileName])
            })
        }

    }

    createProgressBar() {
        this.load.on('progress', this.onLoadProgress, this)
        this.load.on('complete', this.onLoadComplete, this)

        const main = this.cameras.main
        this.progressBgRect = new Rectangle(0, 0, 0.5 * main.width, 10)
        Rectangle.CenterOn(this.progressBgRect, 0.5 * main.width, 0.95 * main.height)
        this.progressRect = Rectangle.Clone(this.progressBgRect);
        this.loadingBar = this.add.graphics()
    }

    onLoadComplete(loader, totalComplete, totalFailed) {
        console.debug('complete', totalComplete)
        console.debug('failed', totalFailed)
        this.loadingBar.destroy()

    }

    onLoadProgress(progress) {
        this.progressRect.width = progress * this.progressBgRect.width;
        this.loadingBar
            .clear()
            .fillStyle(CONST.hexColors.darkGray)
            .fillRectShape(this.progressBgRect)
            .fillStyle(this.load.totalFailed ? CONST.hexColors.black : CONST.hexColors.red )
            .fillRectShape(this.progressRect)
    }
}