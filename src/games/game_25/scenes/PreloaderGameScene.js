import BasicScene from './BasicScene'
import config from '../config/index';

export default class PreloaderGameScene extends BasicScene {

    constructor() {
        super({
            key: "PreloaderGameScene"
        })
    }

    preload() {
        let self = this;
        self.buildBg('loading');
        const imageFiles = {
            // 'end_bg': require('../assets/img/end_bg.png'),
            // 'end_box': require('../assets/img/end_box.png'),
            // 'tutor_bg': require('../assets/img/tut_bg.png'),
            'car1': require('../assets/img/car1.png'),
            'car2': require('../assets/img/car2.png'),
            'bg_low': require('../assets/img/bg_low2.png'),
            'bg_low_long': require('../assets/img/bg_low_long3.png'),
            'award_platform': require('../assets/img/123box.png'),
            'bg_up': require('../assets/img/bg_up1.png'),
            'bg_up_clo': require('../assets/img/bg_up_clo.png'),
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
            'green_carc': { img: require('../assets/img/green car crush.png'), data: require('../assets/img/green car crush.json') },

        }

        const soundFiles = {
            'Bgm': require('../assets/audio/Bgm.mp3'),
            'Button': require('../assets/audio/Button.mp3'),
            'End_pic': require('../assets/audio/End_pic.mp3'),
            'win': require('../assets/audio/win.mp3'),
            'wrong': require('../assets/audio/wrong.mp3'),
            'yes': require('../assets/audio/yes.mp3'),
            '201': require('../assets/audio/Game24.25_201.mp3'),
            '202': require('../assets/audio/Game24.25_202.mp3'),
            '203': require('../assets/audio/Game24.25_203.mp3'),
            '204': require('../assets/audio/Game24.25_204.mp3'),
            '205': require('../assets/audio/Game24.25_205.mp3'),
            '206': require('../assets/audio/Game24.25_206.mp3'),
            '207': require('../assets/audio/Game24.25_207_new.mp3'),
            '208': require('../assets/audio/Game24.25_208.mp3'),
            '209': require('../assets/audio/Game24.25_209.mp3'),
            '210': require('../assets/audio/Game24.25_210.mp3'),
            '211': require('../assets/audio/Game24.25_211_new.mp3'),
            '212': require('../assets/audio/Game24.25_212_new.mp3'),
            '213': require('../assets/audio/Game24.25_213.mp3'),
            '214': require('../assets/audio/Game24.25_214.mp3'),
            '215': require('../assets/audio/Game24.25_215.mp3'),
            '216': require('../assets/audio/Game24.25_216_new.mp3'),
            '217': require('../assets/audio/Game24.25_217.mp3'),
            '218': require('../assets/audio/Game24.25_218.mp3'),
            '219': require('../assets/audio/Game24.25_219.mp3'),
            '220': require('../assets/audio/Game24.25_220.mp3'),
        }
        // self.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        // self.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        // self.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        // self.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        // self.load.spritesheet('btn_car', require('../assets/img/btn_car_1.png'), { frameWidth: 640, frameHeight: 320 });
        // self.load.spritesheet('btn_and', require('../assets/img/btn_and.png'), { frameWidth: 192, frameHeight: 201 });
        // self.load.spritesheet('btn_com', require('../assets/img/btn_com.png'), { frameWidth: 188, frameHeight: 205 });
        // self.load.spritesheet('btn_ex', require('../assets/img/btn_ex.png'), { frameWidth: 176, frameHeight: 264 });
        // self.load.spritesheet('btn_que', require('../assets/img/btn_que.png'), { frameWidth: 213, frameHeight: 252 });
        // self.load.spritesheet('moveBtn', require('../assets/img/btn_move.png'), { frameWidth: 256, frameHeight: 277 });
        // self.load.spritesheet('speakerBtn',require('../assets/img/btn_speaker.png'), { frameWidth: 186, frameHeight: 209 });
        // self.load.spritesheet('speakerBtnOff',require('../assets/img/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209 });
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
        self.scene.start('Game',{number:0,currentQuestionGroup:[],stopAll: false});
    }

}
