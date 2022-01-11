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
            'bg': require('../assets/img/bg.png'),
            'bg_tutor': require('../assets/img/tut_bg.png'),
            'end_box': require('../assets/img/end_box.png'),
            'text_bg': require('../assets/img/text_bg.png'),
            'new_text_bg': require('../assets/img/new_text_bg.png'),
            'but_bx1': require('../assets/img/but_bx1.png'),
            'but_bx2': require('../assets/img/but_bx2.png'),
            'but_bx3': require('../assets/img/but_bx3.png'),
            'but_bx4': require('../assets/img/but_bx4.png'),
            'but_bx5': require('../assets/img/but_bx5.png'),
            'but_bx6': require('../assets/img/but_bx6.png'),
            'but_shw_body': require('../assets/img/but_shw_body.png'),
            'but_shw_head': require('../assets/img/but_shw_head.png'),
            'but_shw_sol': require('../assets/img/but_shw_sol.png'),
            'but_shw_sor': require('../assets/img/but_shw_sor.png'),
            'but_shw_wl': require('../assets/img/but_shw_wl.png'),
            'but_shw_wr': require('../assets/img/but_shw_wr.png'),
            'hinsbx1': require('../assets/img/hinsbx1.png'),
            'hinsbx2': require('../assets/img/hinsbx2.png'),
            'hinsbx3': require('../assets/img/hinsbx3.png'),
            'hinsbx4': require('../assets/img/hinsbx4.png'),
            'hinsbx5': require('../assets/img/hinsbx5.png'),
            'hinsbx6': require('../assets/img/hinsbx6.png'),
            'mini_but_shw': require('../assets/img/mini_but_shw.png'),
            'mini_but': require('../assets/img/mini_but.png'), 
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/img/feeder_tut_b1.png'), data: require('../assets/img/feeder_tut_b1.json') },
            'tut2': { img: require('../assets/img/feeder_tut_b2.png'), data: require('../assets/img/feeder_tut_b2.json') },
         
            // 'end_pic':{ img: require('../assets/img/end_pic.png'), data: require('../assets/img/end_pic.json')},

        }

        const soundFiles = {

        }


        this.load.spritesheet('extSmBtn', require('../assets/img/btn_ext_1.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/img/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/img/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        // this.load.spritesheet('speakerBtn', require('../assets/img/btn_speaker.png'),{ frameWidth: 186, frameHeight: 209  });
        this.load.spritesheet('extBtn', require('../assets/img/btn_ext.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('nextBtn', require('../assets/img/btn_nxtq.png'), { frameWidth: 572, frameHeight: 290 });

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
