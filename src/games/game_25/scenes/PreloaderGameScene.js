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
            'effect_select_teeth': require('../assets/audio/effect_select_teeth.mp3'),
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
        self.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }

}
