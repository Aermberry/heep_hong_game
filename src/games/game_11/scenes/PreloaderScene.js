import BasicScene from './BasicScene'
import config from '../config/index';

export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {
        let self = this;

        this.buildBg('bgLoadingGame');

        const imageFiles = {
            'bgTutor': require('../assets/images/bg_tutor.png'),
            'iconTutor': require('../assets/images/icon_tutor.png'),
            'bgProgressGame': require('../assets/images/bg_progress_game.png'),
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/anims/tut1.png'), data: require('../assets/anims/tut1.json') },
            'tut2': { img: require('../assets/anims/tut2.png'), data: require('../assets/anims/tut2.json') },
            'tut3': { img: require('../assets/anims/tut3.png'), data: require('../assets/anims/tut3.json') },
            'end_cat': { img: require('../assets/anims/end_cat.png'), data: require('../assets/anims/end_cat.json') }
        }

        const soundFiles = {
            'hit': require('../assets/audio/hit36.mp3'),
            'impactSplat': require('../assets/audio/impactsplat05.mp3'),
            'swing': require('../assets/audio/swing3.mp3'),
            'swordUnsheathe': require('../assets/audio/sword-unsheathe5.mp3'),
            'lightBattle': require('../assets/audio/light_battle_chopped.mp3'),
            'drums': require('../assets/audio/taiko-drums_chopped.mp3')
        }

        this.load.spritesheet('strBtn', require('../assets/images/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/images/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('extBtn', require('../assets/images/btn_game_progress_exit.png'), { frameWidth: 186, frameHeight: 209 });


        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });

        self.loadingText = self.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff'
            }
        });

        this.createProgressBar();

        console.log(self);

        self.load.on('complete', function () {
            self.loadingText.setText('連接完成');
        });

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
