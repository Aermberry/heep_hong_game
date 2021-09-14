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
            'dialogTipBox': require('../assets/images/dialog_tip_box.png'),
            'bgTipBox': require('../assets/images/icon_tip_dialog.png'),
            'stageSalver': require('../assets/images/stage_salver.png'),
            'crocodileMouth': require('../assets/images/animal_crocodile_mouth.png'),
        };

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
        this.load.spritesheet('gameProgressExitBtn', require('../assets/images/btn_game_progress_exit.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('gameEndExitBtn', require('../assets/images/btn_game_end_exit.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('moveBtn', require('../assets/images/btn_move.png'), { frameWidth: 256, frameHeight: 277 });


        this.preloadFromArr({ img: imageFiles, sound: soundFiles });

        this.loadingText = this.make.text({
            x: config.width / 2,
            y: config.height * 0.89,
            text: '連接中',
            style: {
                font: '25px monospace',
                fill: '#fff'
            }
        });

        this.createProgressBar();

        this.load.on('complete', function () {
            self.loadingText.setText('連接完成')
            self.time.addEvent({
                delay: 500,
                callback: () => self.scene.start('Tutor')
            })

        });

    }

}
