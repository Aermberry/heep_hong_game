import Phaser from 'phaser';
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
        this.progressBgRect = new Rectangle(0, 0, 0.778 * main.width, 2)

        Rectangle.CenterOn(this.progressBgRect, 0.5 * main.width, 0.92 * main.height)
        this.progressRect = Rectangle.Clone(this.progressBgRect);
        this.loadingBar = this.add.graphics()

        this.loadingText = this.make.text({
            x: main.width / 2,
            y: main.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff'
            }
        });

    }

    onLoadComplete(loader, totalComplete, totalFailed) {
        console.debug('complete', totalComplete)
        console.debug('failed', totalFailed)
        this.loadingBar.destroy()
        this.loadingText.destroy()

    }

    onLoadProgress(progress) {

        this.progressRect.width = progress * this.progressBgRect.width;
        this.progressRect.height = 10
        this.loadingBar
            .clear()
            .fillStyle(0xFFFFFF)
            .fillRectShape(this.progressBgRect)
            .fillStyle(0xFC8EFA)
            .fillRectShape(this.progressRect)
    }
}