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
        self.buildBg('bootBg');
        self.progressLoader = new LoadProgress(this, () => this.scene.start('Tutor'));
        const imageFiles = {
            'bg': require('../assets/bg.png'),
            'btn_speaker': require('../assets/btn_speaker.png'),
            'end_box': require('../assets/end_box.png'),
            'tutor_bg': require('../assets/tutor_bg.png'),
        };

        const atlasFiles = {
            'tut_1': { img: require('../assets/tut_1.png'), data: require('../assets/tut_1.json') },
            'tut_2': { img: require('../assets/tut_2.png'), data: require('../assets/tut_2.json') },
            'tut_3': { img: require('../assets/tut_3.png'), data: require('../assets/tut_3.json') },
            'tut_4': { img: require('../assets/tut_4.png'), data: require('../assets/tut_4.json') },
        }

        const soundFiles = {
        }
        self.load.spritesheet('extSmBtn', require('../assets/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('strBtn', require('../assets/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        self.load.spritesheet('rplBtn', require('../assets/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('extBtn', require('../assets/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('speakerBtn',require('../assets/btn_speaker.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('speakerBtnOff',require('../assets/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('Done',require('../assets/Done.png'), { frameWidth: 545, frameHeight: 165 });
        self.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

    }
    // ready() {
    //     let self = this
    //     self.scene.start('Tutor');
    // }
}
