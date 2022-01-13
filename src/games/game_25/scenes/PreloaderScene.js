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
            'bg_low_long':require('../assets/img/bg_low_long3.png'),
            'award_platform':require('../assets/img/123box.png'),
            'bg_up':require('../assets/img/bg_up1.png'),
            'bg_up_clo':require('../assets/img/bg_up_clo.png')
        };

        const atlasFiles = {
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
            'Bgm':require('../assets/audio/Bgm.mp3'),
            'Button':require('../assets/audio/Button.mp3'),
            'End_pic':require('../assets/audio/End_pic.mp3'),
            'win':require('../assets/audio/win.mp3'),
            'wrong': require('../assets/audio/wrong.mp3'),
            'yes': require('../assets/audio/yes.mp3')
        }
        self.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        self.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        self.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        self.load.spritesheet('btn_car',require('../assets/img/btn_car_1.png'), { frameWidth: 640, frameHeight: 320 });
        self.load.spritesheet('btn_and',require('../assets/img/btn_and.png'),{frameWidth: 192, frameHeight: 201 });
        self.load.spritesheet('btn_com',require('../assets/img/btn_com.png'),{frameWidth: 188, frameHeight: 205 });
        self.load.spritesheet('btn_ex',require('../assets/img/btn_ex.png'),{frameWidth: 176, frameHeight: 264 });
        self.load.spritesheet('btn_que',require('../assets/img/btn_que.png'),{frameWidth: 213, frameHeight: 252 });
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
