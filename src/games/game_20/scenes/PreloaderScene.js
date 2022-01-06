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
            'bg_tutor': require('../assets/img/bg_tutor.png'),
            'end_box': require('../assets/img/end_box.png'),
            'bg': require('../assets/img/bg.png'),
            'bg_L1': require('../assets/img/end_bg.png'),

        };

        const atlasFiles = {
            'dog': { img: require('../assets/img/dog.png'), data: require('../assets/img/dog.json') },
            'crab': { img: require('../assets/img/crab.png'), data: require('../assets/img/crab.json') },
            'wrong': { img: require('../assets/img/wrong.png'), data: require('../assets/img/wrong.json') },
            'done': { img: require('../assets/img/Done.png'), data: require('../assets/img/Done.json') },
            'tut1': { img: require('../assets/img/tut_1.png'), data: require('../assets/img/tut_1.json') },
            'tut2': { img: require('../assets/img/tut_2.png'), data: require('../assets/img/tut_2.json') },
            'end_pic':{ img: require('../assets/img/end_pic.png'), data: require('../assets/img/end_pic.json') },
        }

        const soundFiles = {
            'bgm': require('../assets/audio/Children_s March Theme(short).mp3'),
            'buttonOnClick': require('../assets/audio/comedy_pop_finger_in_mouth_002.mp3'),
            'writing': require('../assets/audio/Boots Sand.mp3'),
            // 'correct': 
            'wrong': require('../assets/audio/Cartoon slide.mp3'),
            'complete': require('../assets/audio/child only clap.mp3'),
            'end': require('../assets/audio/Home at last.mp3'),
        }


        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('tipsBtn', require('../assets/img/tips.png'), { frameWidth: 560, frameHeight: 190 });
        this.load.spritesheet('offSpeakerBtn', require('../assets/img/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209  })
        this.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'),{ frameWidth: 186, frameHeight: 209  });
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
