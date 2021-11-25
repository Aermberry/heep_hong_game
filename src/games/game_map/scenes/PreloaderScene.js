import BasicScene from './BasicScene'

export default class PreloaderScene extends BasicScene {

    constructor() {
        super('Preloader');
    }

    preload() {
        this.buildBg('bg_title')

        const atlasFiles = {
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
            'game6Mask': require('../assets/images/masks/6a.png'),
            // 'game1Btn': require('../assets/images/buttons/1a.png'),
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles
        })
        this.load.spritesheet('game1Btn', require('../assets/images/buttons/1a.png'), { frameWidth: 617, frameHeight: 387 })
        this.load.spritesheet('hintBtn', require('../assets/images/buttons/btn_target.png'), { frameWidth: 173, frameHeight: 187})
        this.load.spritesheet('backBtn', require('../assets/images/buttons/btn_out.png'), { frameWidth: 175, frameHeight: 187})
        // const blackWhiteBg = this.bg.setPipeline('Grayscale')
        // blackWhiteBg.resetPipeline();
        // this.bg.setBlendMode(Phaser.BlendModes.LUMINOSITY);

    }

    create() {
        super.create();
        this.scene.start('Section_6');
    }
}