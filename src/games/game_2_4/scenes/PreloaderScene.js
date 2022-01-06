import BasicScene from './BasicScene'
import LoadProgress from '../components/LoadProgress';


export default class PreloaderScene extends BasicScene {

    constructor() {
        super("Preloader"
        )

        this.progressLoader = null;
    }

    preload() {
        this.buildBackground('backgroundPreloadingScene');

        this.progressLoader = new LoadProgress(this);
        this.progressLoader.create();

        this.load.on('progress', (params) => {
            this.progressLoader.onLoadProgress(params)
        }
        );

        this.load.on('complete', (loader, totalComplete, totalFailed) => {

            this.progressLoader.onLoadComplete(loader, totalComplete, totalFailed, this, 'Tutor');

            // this.progressLoader.onLoadComplete(loader, totalComplete, totalFailed, this, 'Game');
        });

        const imageFiles = {
            'backgroundTutorEnd': require('../assets/images/background_tutor_end.png'),
            'backgroundGamePlay': require('../assets/images/background_game_play_scene.png'),
            'gameEndDialogBox': require('../assets/images/background_game_end_dialog.png'),
            'gameEndDialogBoxTexture': require('../assets/images/texture_game_end_scene_dialog_box.png'),
            'uiEgg': require('../assets/images/ui_egg.png'),
            'uiRecorder': require('../assets/images/ui_recorder.png'),
            'eggAnswerItemTexture':require('../assets/images/texture_egg_answer_item.png'),
            'eggQuestionTexture':require('../assets/images/texture_egg_question.png'),
        };

        const atlasFiles = {
            'tutorTexture': {
                img: require('../assets/atlas/atlas_tutor.png'), data: require('../assets/atlas/atlas_tutor.json')
            },
            'penguinTexture': {
                img: require('../assets/atlas/atlas_penguin.png'), data: require('../assets/atlas/atlas_penguin.json')
            },
            'endTexture': {
                img: require('../assets/atlas/atlas_end.png'), data: require('../assets/atlas/atlas_end.json')
            },
            'clawTexture': {
                img: require('../assets/atlas/atlas_claw.png'), data: require('../assets/atlas/atlas_claw.json')
            },
            'lionLeftRecorderTexture': {
                img: require('../assets/atlas/atlas_lion_left_recorder.png'), data: require('../assets/atlas/atlas_lion_left_recorder.json')
            }
        }

        const soundFiles = {

            // 'starEffectSound': require('../assets/audio/sound_effect/effect_star.mp3'),
            // 'electricShockEffectSound': require('../assets/audio/sound_effect/effect_electric_shock.mp3'),
        }

        this.load.spritesheet('startButton', require('../assets/images/button_start_game.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('retryButton', require('../assets/images/button_retry.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('gameProgressExitButton', require('../assets/images/button_exit_progress_game.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('gameEndExitButton', require('../assets/images/button_game_end_exit.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('resetButton', require('../assets/images/button_reset.png'), { frameWidth: 228, frameHeight: 241 });
        this.load.spritesheet('normalVoiceButton', require('../assets/images/button_voice_normal.png'), { frameWidth: 69, frameHeight: 85 });
        this.load.spritesheet('onPlayVoiceButton', require('../assets/images/button_voice_on_play.png'), { frameWidth: 186, frameHeight: 109 });

        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }

}
