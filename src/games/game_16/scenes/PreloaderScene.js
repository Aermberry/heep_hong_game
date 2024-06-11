import BasicScene from './BasicScene'
import config from '../config/index';

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

            'car_2_idle': { img: require('../assets/img/car_2.png'), data: require('../assets/img/car_2.json') },
            'car_2_stop': { img: require('../assets/img/car_2_stop.png'), data: require('../assets/img/car_2_stop.json') },
            'car_2_run': { img: require('../assets/img/car_2_run.png'), data: require('../assets/img/car_2_run.json') },
            'car_3_idle': { img: require('../assets/img/car_3.png'), data: require('../assets/img/car_3.json') },
            'car_3_stop': { img: require('../assets/img/car_3_stop.png'), data: require('../assets/img/car_3_stop.json') },
            'car_3_run': { img: require('../assets/img/car_3_run.png'), data: require('../assets/img/car_3_run.json') },
            'car_4_idle': { img: require('../assets/img/car_4.png'), data: require('../assets/img/car_4.json') },
            'car_4_stop': { img: require('../assets/img/car_4_stop.png'), data: require('../assets/img/car_4_stop.json') },
            'car_4_run': { img: require('../assets/img/car_4_run.png'), data: require('../assets/img/car_4_run.json') },
            'car_5_idle': { img: require('../assets/img/car_5.png'), data: require('../assets/img/car_5.json') },
            'car_5_stop': { img: require('../assets/img/car_5_stop.png'), data: require('../assets/img/car_5_stop.json') },
            'car_5_run': { img: require('../assets/img/car_5_run.png'), data: require('../assets/img/car_5_run.json') },
            'car_6_idle': { img: require('../assets/img/car_6.png'), data: require('../assets/img/car_6.json') },
            'car_6_stop': { img: require('../assets/img/car_6_stop.png'), data: require('../assets/img/car_6_stop.json') },
            'car_6_run': { img: require('../assets/img/car_6_run.png'), data: require('../assets/img/car_6_run.json') },
            'less_happy': { img: require('../assets/img/less happy.png'), data: require('../assets/img/less happy.json') },
            'L2_answer_failed2': { img: require('../assets/img/L2_answer_failed2.png'), data: require('../assets/img/L2_answer_failed2.json') },
            'correct_answer': { img: require('../assets/img/correct answer.png'), data: require('../assets/img/correct answer.json') },
            'addoil': { img: require('../assets/img/addoil.png'), data: require('../assets/img/addoil.json') },
            'remind': { img: require('../assets/img/remind.png'), data: require('../assets/img/remind.json') },
        }

        const soundFiles = {
            'bgm': require('../assets/audio/Enchanted Festival_short.mp3'),
            'drop': require('../assets/audio/comedy_pop_finger_in_mouth_002.mp3'),
            'seal': require('../assets/audio/Mud Drop Single.mp3'),
            'run': require('../assets/audio/zoom.mp3'),
            'pressBtn': require('../assets/audio/press key.mp3'),
            'erro_run': require('../assets/audio/bbc_comedy-sou_07005101.mp3'),
            'stop': require('../assets/audio/bbc_dial-999--_07045249.mp3'),
            'end_pic': require('../assets/audio/Riverside Ride_short.mp3'),
            'child_clap': require('../assets/audio/child clap.mp3'),
        }


        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'),{ frameWidth: 186, frameHeight: 209  });
        this.load.spritesheet('offSpeakerBtn', require('../assets/img/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209  })

        this.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('doneBtn', require('../assets/img/Done.png'), { frameWidth: 570, frameHeight: 200 });
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

    ready () {
        let self = this
        self.scene.start('Tutor');

      }

}
