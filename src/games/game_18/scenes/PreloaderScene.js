import BasicScene from './BasicScene'
import config from '../config/Config';
export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {
        let self = this;
        self.buildBg('bootBg');
        const imageFiles = {
            'bg': require('../assets/bg.png'),
            'btn_speaker': require('../assets/btn_speaker.png'),
            'end_box': require('../assets/end_box.png'),
            // 'home_b': require('../assets/home_b.png'),
            // 'home_e': require('../assets/home_e.png'),
            // 'home_g': require('../assets/home_g.png'),
            // 'home_o': require('../assets/home_o.png'),
            // 'home_r': require('../assets/home_r.png'),
            // 'home_y': require('../assets/home_y.png'),
            // 'home': require('../assets/home.png'),
            // 'bearW': require('../assets/bearW.png'),
            'tutor_bg': require('../assets/tutor_bg.png'),
        };

        const atlasFiles = {
            'tut_1': { img: require('../assets/tut_1.png'), data: require('../assets/tut_1.json') },
            'tut_2': { img: require('../assets/tut_2.png'), data: require('../assets/tut_2.json') },
            'tut_3': { img: require('../assets/tut_3.png'), data: require('../assets/tut_3.json') },
            'tut_4': { img: require('../assets/tut_4.png'), data: require('../assets/tut_4.json') },
            // 'house_a': { img: require('../assets/house_a.png'), data: require('../assets/house_a.json') },
            // 'house_b': { img: require('../assets/house_b.png'), data: require('../assets/house_b.json') },
            // 'wrong': { img: require('../assets/wrong.png'), data: require('../assets/wrong.json') },
            // 'yes': { img: require('../assets/yes.png'), data: require('../assets/yes.json') },
            // 'bear_job': { img: require('../assets/bear_job.png'), data: require('../assets/bear_job.json') },
            // 'end_pic': { img: require('../assets/end_pic.png'), data: require('../assets/end_pic.json') },
            // 'remind': { img: require('../assets/remind.png'), data: require('../assets/remind.json') },
        }

        const soundFiles = {
            // 'loading': require('../assets/audio/loading.mp3'),
            // 'done': require('../assets/audio/done.mp3'),
            // 'end_pic': require('../assets/audio/end_pic.mp3'),
            // 'Bgm': require('../assets/audio/bgm.mp3'),
            // 'wrongAudio': require('../assets/audio/wrong.mp3'),
            // 'yesAudio': require('../assets/audio/yes.mp3'),
            // 'build':require('../assets/audio/build.mp3')
        }
        self.load.spritesheet('extSmBtn', require('../assets/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('strBtn', require('../assets/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        self.load.spritesheet('rplBtn', require('../assets/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('extBtn', require('../assets/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('speakerBtn',require('../assets/btn_speaker.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('speakerBtnOff',require('../assets/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('Done',require('../assets/Done.png'), { frameWidth: 545, frameHeight: 165 });
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
