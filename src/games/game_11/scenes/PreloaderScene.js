import BasicScene from "./BasicScene";

export default class PreloaderScene extends BasicScene {

    constructor () {
        super({
            key: 'Preloader'
        });
    }

    preload () {

        this.buildBg('bg_title')

        const atlasFiles = {
            'tut1': { img: require('../assets/anims/tut1.png'), data: require('../assets/anims/tut1.json')},
            'tut2': { img: require('../assets/anims/tut2.png'), data: require('../assets/anims/tut2.json')},
            'tut3': { img: require('../assets/anims/tut3.png'), data: require('../assets/anims/tut3.json')},
        }

        const imageFiles = {
            'tutor_bg': require('../assets/images/Tutor.png'),
            'end_bg': require('../assets/images/Complete.png')
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles
        })

        this.load.spritesheet('extSmBtn', require('../assets/images/btn_ext_1.png'),{ frameWidth: 186, frameHeight: 209 })
        this.load.spritesheet('strBtn', require('../assets/images/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })
        this.load.spritesheet('btn_lt', require('../assets/images/btn_lt.png'),{ frameWidth:168, frameHeight: 186})
        this.load.spritesheet('btn_rt', require('../assets/images/btn_rt.png'),{ frameWidth:168, frameHeight: 186})
        this.load.spritesheet('rplBtn', require('../assets/images/btn_rpl.png'),{ frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('extBtn', require('../assets/images/btn_ext.png'),{ frameWidth: 410, frameHeight: 163.5 });

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