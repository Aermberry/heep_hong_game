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
            'tutor_bg': require('../assets/img/tut.png'),
            'car1': require('../assets/img/car1.png'),
            'car2': require('../assets/img/car2.png'),
            'bg_low':require('../assets/img/bg_low2.png'),
            'bg_low_long':require('../assets/img/bg_low_long2.png'),
            'award_platform':require('../assets/img/123box.png')
        };

        const atlasFiles = {
            'bear': { img: require('../assets/img/bear.png'), data: require('../assets/img/bear.json') },
            'bg_up': { img: require('../assets/img/bg_up.png'), data: require('../assets/img/bg_up.json') },
            'fat': { img: require('../assets/img/fat.png'), data: require('../assets/img/fat.json') },
            'leo': { img: require('../assets/img/leo.png'), data: require('../assets/img/leo.json') },
            'pen': { img: require('../assets/img/pen.png'), data: require('../assets/img/pen.json') },
            'pink_car': { img: require('../assets/img/pink_car crush.png'), data: require('../assets/img/pink_car crush.json') },
            
        }

        const soundFiles = {
            'pass': require('../assets/audio/Pass.mp3'),
            'wrong': require('../assets/audio/wrong.mp3'),
            'yes': require('../assets/audio/Yes.wav')
        }
        self.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        self.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('btn_car',require('../assets/img/btn_car.png'), { frameWidth: 812, frameHeight: 320 });
        self.load.spritesheet('btn_full',require('../assets/img/btn_full.png'),{frameWidth: 206, frameHeight: 203 });
        self.load.spritesheet('btn_com',require('../assets/img/btn_com.png'),{frameWidth: 188, frameHeight: 205 });
        self.load.spritesheet('moveBtn', require('../assets/img/btn_move.png'), { frameWidth: 256, frameHeight: 277 });
        self.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

        self.preloadFromArr({ img: imageFiles, sound: soundFiles });

        self.loadingText = self.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff'
            }
        });

        self.createProgressBar();
    
        self.load.on('complete', function () {
            self.loadingText.setText('連接完成')
            self.time.addEvent({
                delay: 500,
                callback: () => self.scene.start('Tutor')
            })
        });
        

    }
}
