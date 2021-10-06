import BasicScene from "./BasicScene";

export default class PreloaderScene extends BasicScene {

    constructor () {
        super({
            key: 'Preloader'
        });
    }

    preload () {

        const atlasFiles = {
            'tut1': { img: require('../assets/anims/tut1.png'), data: require('../assets/anims/tut1.json')},
            'tut2': { img: require('../assets/anims/tut2.png'), data: require('../assets/anims/tut2.json')},
            'tut3': { img: require('../assets/anims/tut3.png'), data: require('../assets/anims/tut3.json')},
        }

        this.preloadFromArr({
            atlas: atlasFiles
        })

        this.load.spritesheet('extSmBtn', require('../assets/images/btn_ext_1.png'),{ frameWidth: 186, frameHeight: 209 })
        this.load.spritesheet('strBtn', require('../assets/images/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })
        this.load.spritesheet('btn_lt', require('../assets/images/btn_lt.png'),{ frameWidth:168, frameHeight: 186})
        this.load.spritesheet('btn_rt', require('../assets/images/btn_rt.png'),{ frameWidth:168, frameHeight: 186})

        this.createProgressBar();


    }

    create () {
        super.create();

        this.buildBg('bg_title')

        setTimeout(
            ()=> {
                this.scene.start('Tutor')
            }, 1
        )

    }

}