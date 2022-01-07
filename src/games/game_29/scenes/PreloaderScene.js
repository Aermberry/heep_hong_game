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
            'bg': require('../assets/img/bg.png'),
            'bg_tutor': require('../assets/img/tut_bg.png'),
            'end_box': require('../assets/img/end_box.png'),
            'text_bg': require('../assets/img/text_bg.png'),
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/img/feeder_tut_b1.png'), data: require('../assets/img/feeder_tut_b1.json') },
            'tut2': { img: require('../assets/img/feeder_tut_b2.png'), data: require('../assets/img/feeder_tut_b2.json') },
         
            // 'end_pic':{ img: require('../assets/img/end_pic.png'), data: require('../assets/img/end_pic.json')},

        }

        const soundFiles = {

        }


        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        // this.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'),{ frameWidth: 186, frameHeight: 209  });
        this.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });

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
