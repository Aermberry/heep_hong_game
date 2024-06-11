import StartBtn from '../objects/StartBtn'
import BasicScene from './BasicScene'

export default class PreloaderScene extends BasicScene {

    constructor() {
        super('Preloader');
    }

    init({isFirstLoad}) {
        this.isFirstLoad = typeof isFirstLoad === 'boolean' ? isFirstLoad : true;
    }

    preload() {
        this.buildBg('bg_title')

        this.dataModel = this.sys.game.globals.model;

        const atlasFiles = {
            'tree': { img: require('../assets/images/main/worldmap_tree.png'), data: require('../assets/images/main/worldmap_tree.json')},
            'smoke': { img: require('../assets/images/main/worldmap_smoke.png'), data: require('../assets/images/main/worldmap_smoke.json')},
            'dada_red': { img: require('../assets/images/main/worldmap_dada_red.png'), data: require('../assets/images/main/worldmap_dada_red.json')},
            'dada_yellow': { img: require('../assets/images/main/worldmap_dada_yellow.png'), data: require('../assets/images/main/worldmap_dada_yellow.json')},
            // 'tut1': { img: require('../assets/anims/tut1.png'), data: require('../assets/anims/tut1.json')},
            // 'tut2': { img: require('../assets/anims/tut2.png'), data: require('../assets/anims/tut2.json')},
            // 'tut3': { img: require('../assets/anims/tut3.png'), data: require('../assets/anims/tut3.json')},
        }

        const imageFiles = {
            'game1Icon': require('../assets/images/icons/1b.png'),
            'game2Icon': require('../assets/images/icons/2b.png'),
            'game3Icon': require('../assets/images/icons/3b.png'),
            'game4Icon': require('../assets/images/icons/4b.png'),
            'game5Icon': require('../assets/images/icons/5b.png'),
            'game6Icon': require('../assets/images/icons/6b.png'),
            'game1Mask': require('../assets/images/masks/1a.png'),
            'game2Mask': require('../assets/images/masks/2a.png'),
            'game3Mask': require('../assets/images/masks/3a.png'),
            'game4Mask': require('../assets/images/masks/4a.png'),
            'game5Mask': require('../assets/images/masks/5a.png'),
            'balloon': require('../assets/images/objects/balloon.png'),
            'cloud_big': require('../assets/images/objects/cloud_big.png'),
            'cloud_small': require('../assets/images/objects/cloud_small.png'),
            'ufo': require('../assets/images/main/worldmap_ufo_pic.png'),
            'lamp_light': require('../assets/images/main/worldmap_lamp_pic.png')

        }

        const soundFiles = {
            'bgm': require('../assets/audios/casual_game_track.mp3'),
            // 'button': require('../assets/audios/comedy_pop_finger_in_mouth_002.mp3'),
            'info': require('../assets/audios/medicine_syrup_dosing_syringe_slide_with_no_syrup_inside.mp3'),
            'zoom': require('../assets/audios/Whoosh_Low_Fast_Raxr_Edos_4.mp3')
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles, sound: soundFiles
        })
        this.load.svg('game6Mask', require('../assets/images/masks/6a.svg'), {width: 976, height: 1489})
        this.load.spritesheet('section1Btn', require('../assets/images/buttons/1a.png'), { frameWidth: 617, frameHeight: 387 })
        this.load.spritesheet('section2Btn', require('../assets/images/buttons/2a.png'), { frameWidth: 780, frameHeight: 465 })
        this.load.spritesheet('section5Btn', require('../assets/images/buttons/5a.png'), { frameWidth: 630, frameHeight: 420 })
        this.load.spritesheet('section4Btn', require('../assets/images/buttons/4a.png'), { frameWidth: 840, frameHeight: 505 })
        this.load.spritesheet('section3Btn', require('../assets/images/buttons/3a.png'), { frameWidth: 860, frameHeight: 350 })
        this.load.spritesheet('section6Btn', require('../assets/images/buttons/6a.png'), { frameWidth: 670, frameHeight: 460 })
        this.load.spritesheet('strBtn', require('../assets/images/buttons/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })

        this.createProgressBar(false)

    }

    create() {
        super.create()

        if(this.sound.sounds.length === 1) {
            this.sound.stopAll()
            const startBtn = new StartBtn(this, this.getColWidth(6), this.getRowHeight(7))
            this.add.existing(startBtn)
            this.dataModel.isFirstLoad = false
        }else {
            this.scene.start('Map')
        }

        // this.scene.start('Map');
    }
}