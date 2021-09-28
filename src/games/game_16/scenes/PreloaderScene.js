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
            'bg_tutor': require('../assets/img/bg_tutor.png'),
            'end_box': require('../assets/img/end_box.png')
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/img/tut_1.png'), data: require('../assets/img/tut_1.json') },
            'tut2': { img: require('../assets/img/tut_2.png'), data: require('../assets/img/tut_2.json') },
            'tut3': { img: require('../assets/img/tut_3.png'), data: require('../assets/img/tut_3.json') },
            'sun': { img: require('../assets/img/sky_bg.png'), data: require('../assets/img/sky_bg.json') },
            'end_pic':{ img: require('../assets/img/end_pic.png'), data: require('../assets/img/end_pic.json') },
            'car_1_idle': { img: require('../assets/img/car_1.png'), data: require('../assets/img/car_1.json') },
            'car_1_stop': { img: require('../assets/img/car_1_stop.png'), data: require('../assets/img/car_1_stop.json') },
            'car_1_run': { img: require('../assets/img/car_1_run.png'), data: require('../assets/img/car_1_run.json') },
        }

        const soundFiles = {
            'bgm': require('../assets/audio/Enchanted Festival_short.mp3'),
            'seal': require('../assets/audio/蓋章.mp3'),
            'run': require('../assets/audio/bbc_comedy-sou_07005101.mp3'),
            'stop': require('../assets/audio/bbc_dial-999--_07045249.mp3'),
            'end_pic': require('../assets/audio/Riverside Ride_short.mp3')
        }


        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'), { frameWidth: 187, frameHeight: 225 });
        this.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('doneBtn', require('../assets/img/Done.png'), { frameWidth: 570, frameHeight: 163.5 });

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
