import BasicScene from './BasicScene'

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

            'tut1': { img: require('../assets/img/tut_1.png'), data: require('../assets/img/tut_1.json') },
            'tut2': { img: require('../assets/img/tut_2.png'), data: require('../assets/img/tut_2.json') },
            'end_pic':{ img: require('../assets/img/end_pic.png'), data: require('../assets/img/end_pic.json') },
        }

        const soundFiles = {
      
        }


        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('doneBtn', require('../assets/img/Done.png'), { frameWidth: 570, frameHeight: 163.5 });

        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

        this.createProgressBar();

    }

    create() {
        super.create();
        setTimeout(
            () => {
                this.scene.start('Tutor')
            }, 1
        )
    }

}
