import BasicScene from './BasicScene'
import LoadProgress from '../objects/LoadProgress';

export default class PreloaderGameScene extends BasicScene {

    constructor() {
        super({
            key: "PreloaderGameScene"
        })
    }

    preload() {
        let self = this;
        self.buildBg('loading');
        self.progressLoader = new LoadProgress(this, () => this.scene.start('Game',{number:0,currentQuestionGroup:[],stopAll: false}));
        const imageFiles = {
            'car1': require('../assets/img/car1.png'),
            'car2': require('../assets/img/car2.png'),
            'bg_low': require('../assets/img/bg_low2.png'),
            'bg_low_long': require('../assets/img/bg_low_long2.png'),
            'award_platform': require('../assets/img/123box.png'),
            'bg_up': require('../assets/img/bg_up1.png'),
            'bg_up_clo': require('../assets/img/bg_up_clo.png'),
        };

        const atlasFiles = {
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
            'effect_select_teeth': require('../assets/audio/effect_select_teeth.mp3'),
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
        self.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }
    ready() {
        let self = this
        self.scene.start('Game',{number:0,currentQuestionGroup:[],stopAll: false})
    }

}
