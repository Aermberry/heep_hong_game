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
            'bg_base': require('../assets/images/bg_stage.png'),
            'bg_end': require('../assets/images/bg_end.png'),
            'bg_tutor': require('../assets/images/bg_tutor.png'),
            'an_BL': require('../assets/images/an_BL.png'),
            'an_LMR': require('../assets/images/an_LMR.png'),
            'an_LR': require('../assets/images/an_LR.png'),
            'an_LsR': require('../assets/images/an_LsR.png'),
            'an_sLR': require('../assets/images/an_sLR.png'),
            'an_sUB': require('../assets/images/an_sUB.png'),
            'an_UB': require('../assets/images/an_UB.png'),
            'an_UL': require('../assets/images/an_UL.png'),
            'an_UMB': require('../assets/images/an_UMB.png'),
            'an_UsB': require('../assets/images/an_UsB.png'),
            'an_warp': require('../assets/images/an_warp.png'),
            'an_whole': require('../assets/images/an_whole.png'),
            'an_hfB': require('../assets/images/an_hfB.png'),
            'an_hfR': require('../assets/images/an_hfR.png'),
            'an_n': require('../assets/images/an_n.png'),
            'an_y': require('../assets/images/an_y.png'),
            'an_tngl': require('../assets/images/an_tngl.png'),
            'end_box': require('../assets/images/end_box.png'),
            'leaf': require('../assets/images/leaf.png'),
            'end_pic_bg': require('../assets/images/end_pic_bg.png'),
            'end_pic_fg': require('../assets/images/end_pic_fg.png')
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/anims/tut1.png'), data: require('../assets/anims/tut1.json')},
            'tut2': { img: require('../assets/anims/tut2.png'), data: require('../assets/anims/tut2.json')},
            'tut3': { img: require('../assets/anims/tut3.png'), data: require('../assets/anims/tut3.json')},
            // 'leaf': { img: require('../assets/anims/leaf.png'), data: require('../assets/anims/leaf.json')},
            // 'end_pic': { img: require('../assets/anims/end_pic.png'), data: require('../assets/anims/end_pic.json')}
            'end_cat': { img: require('../assets/anims/end_cat.png'), data: require('../assets/anims/end_cat.json')}
        }

        this.load.spritesheet('extSmBtn', require('../assets/btn_ext_1.png'),{ frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/btn_str.png'),{ frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('plyBtn', require('../assets/btn_ply.png'),{ frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('pusBtn', require('../assets/btn_pus.png'),{ frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('rplBtn', require('../assets/btn_rpl.png'),{ frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('extBtn', require('../assets/btn_ext.png'),{ frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('cfmBtn', require('../assets/btn_cfm.png'),{ frameWidth: 917, frameHeight: 233 });

        this.load.audio('hit', require('../assets/audio/hit36.mp3'))
        this.load.audio('impactSplat', require('../assets/audio/impactsplat05.mp3'))
        this.load.audio('swing', require('../assets/audio/swing3.mp3'))
        this.load.audio('swordUnsheathe', require('../assets/audio/sword-unsheathe5.mp3'))
        this.load.audio('lightBattle', require('../assets/audio/light_battle.mp3'))
        this.load.audio('drums', require('../assets/audio/taiko-drums.mp3'))

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
