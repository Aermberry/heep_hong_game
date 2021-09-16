import BasicScene from './BasicScene'

export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {

        this.buildBg('bootBg');

        const imageFiles = {
            'bg': require('../assets/bg.png'),
            'btn_speaker': require('../assets/btn_speaker.png'),
            'end_box': require('../assets/end_box.png'),
            'home_b': require('../assets/home_b.png'),
            'home_e': require('../assets/home_e.png'),
            'home_g': require('../assets/home_g.png'),
            'home_o': require('../assets/home_o.png'),
            'home_r': require('../assets/home_r.png'),
            'home_y': require('../assets/home_y.png'),
            'home': require('../assets/home.png'),
            'tutor_bg': require('../assets/tutor_bg.png'),

        };

        const atlasFiles = {
            'tut_1': { img: require('../assets/tut_1.png'), data: require('../assets/tut_1.json') },
            'tut_2': { img: require('../assets/tut_2.png'), data: require('../assets/tut_2.json') },
            'tut_3': { img: require('../assets/tut_3.png'), data: require('../assets/tut_3.json') },
            'house_a': { img: require('../assets/house_a.png'), data: require('../assets/house_a.json') },
            'house_b': { img: require('../assets/house_b.png'), data: require('../assets/house_b.json') },
            'wrong': { img: require('../assets/wrong.png'), data: require('../assets/wrong.json') },
            'yes': { img: require('../assets/yes.png'), data: require('../assets/yes.json') },
            'bear_job': { img: require('../assets/bear_job.png'), data: require('../assets/bear_job.json') },
            'end_pic': { img: require('../assets/end_pic.png'), data: require('../assets/end_pic.json') },
        }

        const soundFiles = {
            // 'hit': require('../assets/audio/hit36.mp3'),
            // 'impactSplat': require('../assets/audio/impactsplat05.mp3'),
            // 'swing': require('../assets/audio/swing3.mp3'),
            // 'swordUnsheathe': require('../assets/audio/sword-unsheathe5.mp3'),
            // 'lightBattle': require('../assets/audio/light_battle_chopped.mp3'),
            // 'drums': require('../assets/audio/taiko-drums_chopped.mp3')
        }
        this.load.spritesheet('extSmBtn', require('../assets/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('extBtn', require('../assets/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('speakerBtn',require('../assets/btn_speaker.png'), { frameWidth: 35, frameHeight: 40 });
        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

        this.createProgressBar();

    }

    create() {
        super.create();

        setTimeout(
            () => {
                this.scene.start('Tutor')
            }, 5
        )
    }

}
