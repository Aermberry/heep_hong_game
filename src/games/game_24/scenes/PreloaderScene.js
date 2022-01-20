import BasicScene from './BasicScene'
import config from '../config/index';

export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {
        let self = this;
        self.buildBg('loading');
        const imageFiles = {
            'end_bg': require('../assets/img/end_bg.png'),
            'end_box': require('../assets/img/end_box.png'),
            // 'tutor_bg': require('../assets/img/tut.png'),
            'car1': require('../assets/img/car1.png'),
            'car2': require('../assets/img/car2.png'),
            'bg_low': require('../assets/img/bg_low2.png'),
            'bg_low_long': require('../assets/img/bg_low_long2.png'),
            'award_platform': require('../assets/img/123box.png'),
            'bg_up': require('../assets/img/bg_up1.png'),
            'bg_up_clo': require('../assets/img/bg_up_clo.png'),
            'tutor_bg': require('../assets/img/tut_bg.png'),
        };

        const atlasFiles = {
            'tut_1': { img: require('../assets/img/tut_1.png'), data: require('../assets/img/tut_1.json') },
            'tut_2': { img: require('../assets/img/tut_2.png'), data: require('../assets/img/tut_2.json') },
            'tut_3': { img: require('../assets/img/tut_3.png'), data: require('../assets/img/tut_3.json') },
            'bear': { img: require('../assets/img/bear.png'), data: require('../assets/img/bear.json') },
            'cl1': { img: require('../assets/img/bg_up_cl1.png'), data: require('../assets/img/bg_up_cl1.json') },
            'cl2': { img: require('../assets/img/bg_up_cl2.png'), data: require('../assets/img/bg_up_cl2.json') },
            'fat': { img: require('../assets/img/fat.png'), data: require('../assets/img/fat.json') },
            'leo': { img: require('../assets/img/leo.png'), data: require('../assets/img/leo.json') },
            'pen': { img: require('../assets/img/pen.png'), data: require('../assets/img/pen.json') },
            'pink_car': { img: require('../assets/img/pink_car crush.png'), data: require('../assets/img/pink_car crush.json') },

        }

        const soundFiles = {
            'Bgm': require('../assets/audio/Bgm.mp3'),
            'Button': require('../assets/audio/Button.mp3'),
            'End_pic': require('../assets/audio/End_pic.mp3'),
            'win': require('../assets/audio/win.mp3'),
            'wrong': require('../assets/audio/wrong.mp3'),
            'yes': require('../assets/audio/yes.mp3'),
            '101': require('../assets/audio/Game24.25_101.mp3'),
            '102': require('../assets/audio/Game24.25_102.mp3'),
            '103': require('../assets/audio/Game24.25_103.mp3'),
            '104': require('../assets/audio/Game24.25_104.mp3'),
            '105': require('../assets/audio/Game24.25_105.mp3'),
            '106': require('../assets/audio/Game24.25_106_B.mp3'),
            '107': require('../assets/audio/Game24.25_107.mp3'),
            '108': require('../assets/audio/Game24.25_108.mp3'),
            '109': require('../assets/audio/Game24.25_109_A.mp3'),
            '110': require('../assets/audio/Game24.25_110.mp3'),
            '111': require('../assets/audio/Game24.25_111.mp3'),
            '112': require('../assets/audio/Game24.25_112.mp3'),
            '113': require('../assets/audio/Game24.25_113.mp3'),
            '114': require('../assets/audio/Game24.25_114_A.mp3'),
            '115': require('../assets/audio/Game24.25_115.mp3'),
            '116': require('../assets/audio/Game24.25_116.mp3'),
            '117': require('../assets/audio/Game24.25_117.mp3'),
            '118': require('../assets/audio/Game24.25_118_new.mp3'),
            '119': require('../assets/audio/Game24.25_119.mp3'),
            '120': require('../assets/audio/Game24.25_120.mp3'),

        }
        self.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        self.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('btn_car', require('../assets/img/btn_car_1.png'), { frameWidth: 640, frameHeight: 320 });
        self.load.spritesheet('btn_full', require('../assets/img/btn_full.png'), { frameWidth: 206, frameHeight: 203 });
        self.load.spritesheet('btn_com', require('../assets/img/btn_com.png'), { frameWidth: 188, frameHeight: 205 });
        self.load.spritesheet('moveBtn', require('../assets/img/btn_move.png'), { frameWidth: 256, frameHeight: 277 });
        self.load.spritesheet('speakerBtn',require('../assets/img/btn_speaker.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('speakerBtnOff',require('../assets/img/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209 });
        self.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

        self.preloadFromArr({ img: imageFiles, sound: soundFiles });

        self.progressBar = self.add.graphics();
        self.loadingText = self.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff'
            }
        });
        self.loadingText.setOrigin(0.5, 0.5);

        self.load.on('progress', function (value) {
            self.progressBar.clear();
            self.progressBar.fillStyle(0xFC8EFA, 1);
            self.progressBar.fillRect(config.width * 0.118, config.height * 0.92, (config.width * 0.778) * value, 10);
        });

        self.load.on('complete', function () {
            self.loadingText.setText('連接完成');
            self.ready();
        }.bind(self));
    }
    ready() {
        let self = this
        self.scene.start('Tutor');
    }

}
