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
            'bg_L1': require('../assets/img/game_bg.png'),
            'bg_tutor': require('../assets/img/tut_bg.png'),
            'end_box': require('../assets/img/end_box.png'),
            '4w_car1': require('../assets/img/4w_car1.png'),
            '4w_car2': require('../assets/img/4w_car2.png'),
            '4w_car3': require('../assets/img/4w_car3.png'),
            '4w_car4': require('../assets/img/4w_car4.png'),
            '4w_car5': require('../assets/img/4w_car5.png'),
            '4w_car6': require('../assets/img/4w_car6.png'),
            '6w_car1': require('../assets/img/6w_car1.png'),
            '6w_car2': require('../assets/img/6w_car2.png'),
            '6w_car3': require('../assets/img/6w_car3.png'),
            '13w_car1': require('../assets/img/13w_car1.png'),
            '13w_car2': require('../assets/img/13w_car2.png'),
            'car_box': require('../assets/img/car_box.png')
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/img/tut_1.png'), data: require('../assets/img/tut_1.json') },
            'tut2': { img: require('../assets/img/tut_2.png'), data: require('../assets/img/tut_2.json') },
            'tut3': { img: require('../assets/img/tut_3.png'), data: require('../assets/img/tut_3.json') },
        }

        const soundFiles = {

        }


        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        // this.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'),{ frameWidth: 186, frameHeight: 209  });
        this.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('rtBtn', require('../assets/img/btn_rt.png'), { frameWidth: 168, frameHeight: 185 });
        this.load.spritesheet('ltBtn', require('../assets/img/btn_lt.png'), { frameWidth: 168, frameHeight: 185 });
        // this.load.spritesheet('offSpeakerBtn', require('../assets/img/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209  })

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
