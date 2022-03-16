import Phaser from 'phaser';

export default class BasicScene extends Phaser.Scene {

    create() {

        const pageWidth = this.cameras.main.width;
        const pageHeight = this.cameras.main.height;

        this.widthBlock = pageWidth / 12;
        this.heightBlock = pageHeight / 12;

    }

    buildBackground(image) {

        let background = undefined;

        background = this.add.image(0, 0, image).setOrigin(0);
        background.setName("background");
        background.setDisplaySize(this.game.scale.width, this.game.scale.height);

        return background;
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
    preloadFromArr({ img = null, atlas = null, sound = null }) {

        if (img !== null) {
            Object.keys(img).forEach((fileName) => {
                this.load.image(fileName, img[fileName])
            })
        }

        if (atlas != null) {
            Object.keys(atlas).forEach((fileName) => {
                this.load.atlas(fileName, atlas[fileName]['img'], atlas[fileName]['data'])
            })
        }

        if (sound != null) {
            Object.keys(sound).forEach((fileName) => {
                this.load.audio(fileName, sound[fileName])
            })
        }

    }

    toScene(scene, sceneName, delay) {

        scene.time.addEvent({
            delay: delay,
            callback: () => scene.scene.start(sceneName)
        })
    }

}