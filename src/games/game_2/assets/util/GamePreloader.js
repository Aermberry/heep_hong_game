export default class GamePreloader {

    constructor(scene,sceneName) {
        this.scene=scene;
        this.sceneName = sceneName;

        if (!GameManager.instance) {
            GameManager.instance = this;
        }

        return GameManager.instance;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new GamePreloader();
        }
        return this.instance;
    }


    load() {

        switch (name) {
            case 'Preloader':

                break;

            case 'Game':
                break;
            default:
                break;
        }

       this.preloadFromArr();
    }

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


}