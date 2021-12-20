import BasicScene from './BasicScene'
import LoadProgress from '../components/LoadProgress';


export default class PreloaderScene extends BasicScene {

    constructor() {
        super("Preloader"
        )

        this.progressLoader = null;
    }

    preload() {
        let self = this;

        this.buildBg('bgLoadingGame');

        this.progressLoader = new LoadProgress(this);
        this.progressLoader.create();

        this.load.on('progress', (params) => {
            this.progressLoader.onLoadProgress(params)
        }
        );

        this.load.on('complete', (loader, totalComplete, totalFailed) => {
            this.progressLoader.onLoadComplete(loader, totalComplete, totalFailed, self, 'Tutor');
        });

        const imageFiles = {
            'bgTutor': require('../assets/images/bg_tutor.png'),
            'bgVictory': require('../assets/images/bg_victory.png'),
            'bgQuestionText': require('../assets/images/bg_question_text.png'),
            'dialogTipBox': require('../assets/images/dialog_tip_box.png'),
            'bgProgressGame': require('../assets/images/bg_progress_game.png'),
            'yellowDoll': require('../assets/images/doll_1.png'),
            'blueDoll': require('../assets/images/doll_2.png'),
            'pinkDoll': require('../assets/images/doll_3.png'),
            'hole': require('../assets/images/hole.png'),
            'light': require('../assets/images/light.png')
        };

        const atlasFiles = {
            'loadingTitleTexture': { img: require('../assets/atlas/atlas_loading_title.json'), data: require('../assets/atlas/atlas_loading_title.json') },
            'eggTwistingMachineTexture': {
                img: require('../assets/atlas/atlas_egg_twisting_machine.json'), data: require('../assets/atlas/atlas_egg_twisting_machine.json')
            }
        }

        const soundFiles = {

            // 'starEffectSound': require('../assets/audio/sound_effect/effect_star.mp3'),
            // 'electricShockEffectSound': require('../assets/audio/sound_effect/effect_electric_shock.mp3'),
        }

        this.load.spritesheet('strBtn', require('../assets/images/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/images/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('gameProgressExitBtn', require('../assets/images/btn_game_progress_exit.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('gameEndExitBtn', require('../assets/images/btn_game_end_exit.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('buttonMoveDownControl', require('../assets/images/button_move_down_control.png'), { frameWidth: 160, frameHeight: 184 });
        this.load.spritesheet('buttonMoveLeftControl', require('../assets/images/button_move_left_control.png'), { frameWidth: 160, frameHeight: 184 });
        this.load.spritesheet('buttonMoveRightControl', require('../assets/images/button_move_right_control.png'), { frameWidth: 160, frameHeight: 184 });



        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }

}
