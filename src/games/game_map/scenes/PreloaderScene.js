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
            'balloon': require('../assets/images/objects/balloon.png'),
            'cloud_big': require('../assets/images/objects/cloud_big.png'),
            'cloud_small': require('../assets/images/objects/cloud_small.png')
            // 'game6Mask': require('../assets/images/masks/6a.png'),
            // 'game6Mask': require('../assets/images/masks/6a.svg')
            // 'game1Btn': require('../assets/images/buttons/1a.png'),
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles
        })
        this.load.svg('game6Mask', require('../assets/images/masks/6a.svg'), {width: 976, height: 1489})
        this.load.spritesheet('section1Btn', require('../assets/images/buttons/1a.png'), { frameWidth: 617, frameHeight: 387 })
        this.load.spritesheet('section2Btn', require('../assets/images/buttons/2a.png'), { frameWidth: 780, frameHeight: 465 })
        this.load.spritesheet('section5Btn', require('../assets/images/buttons/5a.png'), { frameWidth: 630, frameHeight: 420 })
        this.load.spritesheet('section4Btn', require('../assets/images/buttons/4a.png'), { frameWidth: 840, frameHeight: 505 })
        this.load.spritesheet('section3Btn', require('../assets/images/buttons/3a.png'), { frameWidth: 860, frameHeight: 350 })
        this.load.spritesheet('section6Btn', require('../assets/images/buttons/6a.png'), { frameWidth: 670, frameHeight: 460 })
        // const blackWhiteBg = this.bg.setPipeline('Grayscale')
        // blackWhiteBg.resetPipeline();
        // this.bg.setBlendMode(Phaser.BlendModes.LUMINOSITY);

    }

    create() {
        super.create();
        this.scene.start('Map');
    }
}