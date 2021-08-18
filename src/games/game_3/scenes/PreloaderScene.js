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
            'bg_base': require('../assets/bg_stage.png'),
            'bg_end': require('../assets/bg_end.png'),
            'bg_tutor': require('../assets/bg_tutor.png'),
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/tut1.png'), data: require('../assets/tut1.json')},
            'tut2': { img: require('../assets/tut2.png'), data: require('../assets/tut2.json')},
            'tut3': { img: require('../assets/tut3.png'), data: require('../assets/tut3.json')},
        }

        this.load.spritesheet('extSmBtn', require('../assets/btn_ext_1.png'),{ frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/btn_str.png'),{ frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('plyBtn', require('../assets/btn_ply.png'),{ frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('pusBtn', require('../assets/btn_pus.png'),{ frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('rplBtn', require('../assets/btn_rpl.png'),{ frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('extBtn', require('../assets/btn_ext.png'),{ frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('cfmBtn', require('../assets/btn_cfm.png'),{ frameWidth: 917, frameHeight: 233 });

        this.preloadFromArr({img: imageFiles, atlas: atlasFiles});

        this.createProgressBar();

    }

    create() {

        super.create();
        setTimeout(
            ()=> {
                this.scene.start('Tutor')
            }, 1
        )
    }

}
