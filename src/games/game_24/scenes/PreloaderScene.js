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
        self.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('speakerBtnOff', require('../assets/img/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('btnLt', require('../assets/img/btn_lt.png'), { frameWidth: 168, frameHeight: 186 });
        self.load.spritesheet('btnRt', require('../assets/img/btn_rt.png'), { frameWidth: 168, frameHeight: 186 });
        self.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
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
