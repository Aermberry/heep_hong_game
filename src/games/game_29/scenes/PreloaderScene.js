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
            'text_bg': require('../assets/img/txt_bg.png'),
            'new_text_bg': require('../assets/img/new_text_bg.png'),
            'mini_but_shw': require('../assets/img/mini_but_shw.png'),
            'mini_but': require('../assets/img/mini_but.png'),
            'an_n': require('../assets/img/an_n.png')
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/img/feeder_tut_v2_bx1.png'), data: require('../assets/img/feeder_tut_v2_bx1.json') },
            'tut2': { img: require('../assets/img/feeder_tut_v2_bx2.png'), data: require('../assets/img/feeder_tut_v2_bx2.json') },
            'crt_ans_star': { img: require('../assets/img/crt_ans_star.png'), data: require('../assets/img/crt_ans_star.json') }
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

        this.load.spritesheet('but_shw_body', require('../assets/img/but5.png'), { frameWidth: 761, frameHeight: 1085 });
        this.load.spritesheet('but_shw_head', require('../assets/img/but3.png'), { frameWidth: 451, frameHeight: 490 });
        this.load.spritesheet('but_shw_sol', require('../assets/img/but1.png'), { frameWidth: 254, frameHeight: 318.5 });
        this.load.spritesheet('but_shw_sor', require('../assets/img/but2.png'), { frameWidth: 263, frameHeight: 330 });
        this.load.spritesheet('but_shw_wl', require('../assets/img/but4.png'), { frameWidth: 833, frameHeight: 905 });
        this.load.spritesheet('but_shw_wr', require('../assets/img/but6.png'), { frameWidth: 833, frameHeight: 904 });
        this.load.spritesheet('chkmrk', require('../assets/img/chkmrk.png'), { frameWidth: 111, frameHeight: 111 });

        this.load.spritesheet('but_bx1', require('../assets/img/but_tag1.png'), { frameWidth: 247, frameHeight: 323.5 });
        this.load.spritesheet('but_bx2', require('../assets/img/but_tag3.png'), { frameWidth: 248, frameHeight: 322 });
        this.load.spritesheet('but_bx3', require('../assets/img/but_tag2.png'), { frameWidth: 248, frameHeight: 309 });
        this.load.spritesheet('but_bx4', require('../assets/img/but_tag4.png'), { frameWidth: 617, frameHeight: 301 });
        this.load.spritesheet('but_bx5', require('../assets/img/but_tag5.png'), { frameWidth: 312, frameHeight: 343 });
        this.load.spritesheet('but_bx6', require('../assets/img/but_tag6.png'), { frameWidth: 427, frameHeight: 242 });

        this.load.spritesheet('hinsbx1', require('../assets/img/hin_box1.png'), { frameWidth: 118, frameHeight: 93 });
        this.load.spritesheet('hinsbx2', require('../assets/img/hin_box2.png'), { frameWidth: 118, frameHeight: 93 });
        this.load.spritesheet('hinsbx3', require('../assets/img/hin_box3.png'), { frameWidth: 118, frameHeight: 93 });
        this.load.spritesheet('hinsbx4', require('../assets/img/hin_box4.png'), { frameWidth: 313, frameHeight: 95 });
        this.load.spritesheet('hinsbx5', require('../assets/img/hin_box5.png'), { frameWidth: 175, frameHeight: 95 });
        this.load.spritesheet('hinsbx6', require('../assets/img/hin_box6.png'), { frameWidth: 175, frameHeight: 95 });

        for (let index = 1; index <= 6; index++) {
            this.load.spritesheet(`lv3hinsbx${index}`, require(`../assets/img/lv3_hin_box${index}.png`), { frameWidth: 218, frameHeight: 92 });
        }

        this.load.spritesheet('cha6', require('../assets/img/cha1.png'), { frameWidth: 522, frameHeight: 2491 / 3 });
        this.load.spritesheet('cha5', require('../assets/img/cha2.png'), { frameWidth: 751, frameHeight: 2720 / 3 });
        this.load.spritesheet('cha4', require('../assets/img/cha3.png'), { frameWidth: 740, frameHeight: 2804 / 3 });
        this.load.spritesheet('cha3', require('../assets/img/cha4.png'), { frameWidth: 769, frameHeight: 3132 / 3 });
        this.load.spritesheet('cha2', require('../assets/img/cha5.png'), { frameWidth: 661, frameHeight: 3307 / 3 });
        this.load.spritesheet('cha1', require('../assets/img/cha6.png'), { frameWidth: 1071, frameHeight: 3904 / 3 });

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
