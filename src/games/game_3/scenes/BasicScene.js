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
    preloadFromArr({img = null, atlas = null}) {

        if(img !== null) {
            Object.keys(img).forEach((fileName) => {
                this.load.image(fileName, img[fileName]);
            });
        }

        if(atlas != null) {
            Object.keys(atlas).forEach((fileName) => {
                console.log(
                    'loading atlas',
                    fileName,
                    atlas[fileName]['img'],
                    atlas[fileName]['data']
                )
                this.load.atlas(fileName, atlas[fileName]['img'], atlas[fileName]['data'])
            });
        }

    }

    createProgressBar() {
        this.load.on('progress', this.onLoadProgress, this);
        this.load.on('complete', this.onLoadComplete, this);

        this.loadingBG = this.add.image(0, 0, 'bg_title');
        this.loadingBG.setDisplaySize(this.game.scale.width, this.game.scale.height);
        this.loadingBG.setOrigin(0, 0);

        const main = this.cameras.main;
        this.progressBgRect = new Rectangle(0, 0, 0.5 * main.width, 50);
        Rectangle.CenterOn(this.progressBgRect, 0.5 * main.width, 0.8 * main.height);
        this.progressRect = Rectangle.Clone(this.progressBgRect);
        this.loadingBar = this.add.graphics();
    }

    onLoadComplete(loader, totalComplete, totalFailed) {
        console.debug('complete', totalComplete);
        console.debug('failed', totalFailed);
        this.loadingBar.destroy();
        this.loadingBG.destroy();
    }

    onLoadProgress(progress) {
        this.progressRect.width = progress * this.progressBgRect.width;
        this.loadingBar
            .clear()
            .fillStyle(CONST.hexColors.darkGray)
            .fillRectShape(this.progressBgRect)
            .fillStyle(this.load.totalFailed ? CONST.hexColors.red : CONST.hexColors.lightBlue)
            .fillRectShape(this.progressRect);
    }
}