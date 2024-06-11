import BasicScene from './BasicScene'
import config from '../config/index';

export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {

        this.gameNum = this.sys.game.globals.model.game;
        if (this.gameNum == 29) {
            this.buildBg('loading_1');
        } else {
            this.buildBg('loading_2');
        }
        const imageFiles = {
            'bg': require('../assets/img/bg.png'),
            'bg_tutor': require('../assets/img/tut_bg.png'),
            'end_box': require('../assets/img/end_box.png'),
            'text_bg': require('../assets/img/txt_bg.png'),
            'new_text_bg': require('../assets/img/new_text_bg.png'),
            'mini_but_shw': require('../assets/img/mini_but_shw.png'),
            'mini_but': require('../assets/img/mini_but.png'),
            'an_n': require('../assets/img/an_n.png')
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/img/feeder_tut_v2_bx1.png'), data: require('../assets/img/feeder_tut_v2_bx1.json') },
            'tut2': { img: require('../assets/img/feeder_tut_v2_bx2.png'), data: require('../assets/img/feeder_tut_v2_bx2.json') },
            'tut1_lv3': { img: require('../assets/img/lv3_tutani_bx1.png'), data: require('../assets/img/lv3_tutani_bx1.json') },
            'tut2_lv3': { img: require('../assets/img/lv3_tutani_bx2.png'), data: require('../assets/img/lv3_tutani_bx2.json') },
            'crt_ans_star': { img: require('../assets/img/crt_ans_star.png'), data: require('../assets/img/crt_ans_star.json') }
            // 'end_pic':{ img: require('../assets/img/end_pic.png'), data: require('../assets/img/end_pic.json')},

        }

        const soundFiles = {
            'bgm': require('../assets/audio/forest.mp3'),
            'button': require('../assets/audio/comedy_pop_finger_in_mouth_002.mp3'),
            'matching': require('../assets/audio/383577_SOUNDDOGS__ca.mp3'),
            'yes': require('../assets/audio/Cartoon correct answer.mp3'),
            'no': require('../assets/audio/game_wrong_3.mp3'),
            'complete': require('../assets/audio/Win Sound 2.mp3'),
            'win': require('../assets/audio/wintery loop.mp3'),
            'end': require('../assets/audio/wintery loop.mp3')
        }


        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        // this.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'),{ frameWidth: 186, frameHeight: 209  });
        this.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('nextBtn', require('../assets/img/btn_nxtq.png'), { frameWidth: 572, frameHeight: 290 });

        this.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('offSpeakerBtn', require('../assets/img/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209 })
        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

        let self = this;
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
