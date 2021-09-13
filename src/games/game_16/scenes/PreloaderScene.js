import BasicScene from './BasicScene'

export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {

        this.buildBg('bg_title');

        const imageFiles = {
            'bg_L1': require('../assets/img/bg_L1.png'),
            'bg_L2': require('../assets/img/bg_L2.png'),
            'bg_tutor': require('../assets/img/bg_tutor.png'),
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/img/tut_1.png'), data: require('../assets/img/tut_1.json')},
            'tut2': { img: require('../assets/img/tut_2.png'), data: require('../assets/img/tut_2.json')},
            'tut3': { img: require('../assets/img/tut_3.png'), data: require('../assets/img/tut_3.json')},
            'sun': { img: require('../assets/img/sky_bg.png'), data: require('../assets/img/sky_bg.json')},

        }

        const soundFiles = {

        }


        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'), { frameWidth: 37, frameHeight: 35 });


        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

        this.createProgressBar();

    }

    create() {
        super.create();
        setTimeout(
            () => {
                this.scene.start('Tutor')
            }, 1
        )
    }

}
