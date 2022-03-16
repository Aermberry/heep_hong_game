import BasicScene from './BasicScene'
import LoadProgress from '../objects/LoadProgress';

export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {
        let self = this;
        self.buildBg('loading');
        self.progressLoader = new LoadProgress(this, () => this.scene.start('Tutor'));
        const imageFiles = {
            'end_bg': require('../assets/img/end_bg.png'),
            'end_box': require('../assets/img/end_box.png'),
            'tutor_bg': require('../assets/img/tut_bg.png'),
           
        };

        const atlasFiles = {
            'tut_1': { img: require('../assets/img/tut_1.png'), data: require('../assets/img/tut_1.json') },
            'tut_2': { img: require('../assets/img/tut_2.png'), data: require('../assets/img/tut_2.json') },
            'tut_3': { img: require('../assets/img/tut_3.png'), data: require('../assets/img/tut_3.json') },
          

        }

        const soundFiles = {
        }
        self.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        self.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('btn_car', require('../assets/img/btn_car_1.png'), { frameWidth: 640, frameHeight: 320 });
        self.load.spritesheet('btn_full', require('../assets/img/btn_full.png'), { frameWidth: 206, frameHeight: 203 });
        self.load.spritesheet('btn_com', require('../assets/img/btn_com.png'), { frameWidth: 188, frameHeight: 205 });
        // self.load.spritesheet('moveBtn', require('../assets/img/btn_move.png'), { frameWidth: 256, frameHeight: 277 });
        self.load.spritesheet('speakerBtn',require('../assets/img/btn_speaker.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('speakerBtnOff',require('../assets/img/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('btnLt', require('../assets/img/btn_lt.png'), { frameWidth: 168, frameHeight: 186 });
        self.load.spritesheet('btnRt', require('../assets/img/btn_rt.png'), { frameWidth: 168, frameHeight: 186 });
        self.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }
    ready() {
        let self = this
        self.scene.start('Tutor');
    }

}
