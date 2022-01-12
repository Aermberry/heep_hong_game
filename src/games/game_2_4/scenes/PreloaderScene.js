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
            'eggAnswerItemTexture': require('../assets/images/texture_egg_answer_item.png'),
            'eggQuestionTexture': require('../assets/images/texture_egg_question.png'),
            'clawTexture': require('../assets/images/texture_claw.png'),

            'textureObject0': require('../assets/images/objects/texture_item_objects/texture_object_0.png'),
            'textureObject1': require('../assets/images/objects/texture_item_objects/texture_object_1.png'),
            'textureObject2': require('../assets/images/objects/texture_item_objects/texture_object_2.png'),
            'textureObject3': require('../assets/images/objects/texture_item_objects/texture_object_3.png'),
            'textureObject4': require('../assets/images/objects/texture_item_objects/texture_object_4.png'),
            'textureObject5': require('../assets/images/objects/texture_item_objects/texture_object_5.png'),
            'textureObject6': require('../assets/images/objects/texture_item_objects/texture_object_6.png'),
            'textureObject7': require('../assets/images/objects/texture_item_objects/texture_object_7.png'),
            'textureObject8': require('../assets/images/objects/texture_item_objects/texture_object_8.png'),
            'textureObject9': require('../assets/images/objects/texture_item_objects/texture_object_9.png'),
            'textureObject10': require('../assets/images/objects/texture_item_objects/texture_object_10.png'),
            'textureObject11': require('../assets/images/objects/texture_item_objects/texture_object_11.png'),
            'textureObject12': require('../assets/images/objects/texture_item_objects/texture_object_12.png'),
            'textureObject13': require('../assets/images/objects/texture_item_objects/texture_object_13.png'),
            'textureObject14': require('../assets/images/objects/texture_item_objects/texture_object_14.png'),
            'textureObject15': require('../assets/images/objects/texture_item_objects/texture_object_15.png'),
            'textureObject16': require('../assets/images/objects/texture_item_objects/texture_object_16.png'),
            'textureObject17': require('../assets/images/objects/texture_item_objects/texture_object_17.png'),
            'textureObject18': require('../assets/images/objects/texture_item_objects/texture_object_18.png'),
            'textureObject19': require('../assets/images/objects/texture_item_objects/texture_object_19.png'),
            'textureObject20': require('../assets/images/objects/texture_item_objects/texture_object_20.png'),
            'textureObject21': require('../assets/images/objects/texture_item_objects/texture_object_21.png'),
            'textureObject22': require('../assets/images/objects/texture_item_objects/texture_object_22.png'),
            'textureObject23': require('../assets/images/objects/texture_item_objects/texture_object_23.png'),
            'textureObject24': require('../assets/images/objects/texture_item_objects/texture_object_24.png'),
            'textureObject25': require('../assets/images/objects/texture_item_objects/texture_object_25.png'),
            'textureObject26': require('../assets/images/objects/texture_item_objects/texture_object_26.png'),
            'textureObject27': require('../assets/images/objects/texture_item_objects/texture_object_27.png'),
            'textureObject28': require('../assets/images/objects/texture_item_objects/texture_object_28.png'),
            'textureObject29': require('../assets/images/objects/texture_item_objects/texture_object_29.png'),
            'textureObject30': require('../assets/images/objects/texture_item_objects/texture_object_30.png'),
            'textureObject31': require('../assets/images/objects/texture_item_objects/texture_object_31.png'),
            'textureObject32': require('../assets/images/objects/texture_item_objects/texture_object_32.png'),
            'textureObject33': require('../assets/images/objects/texture_item_objects/texture_object_33.png'),
            'textureObject34': require('../assets/images/objects/texture_item_objects/texture_object_34.png'),
            'textureObject35': require('../assets/images/objects/texture_item_objects/texture_object_35.png'),
            'textureObject36': require('../assets/images/objects/texture_item_objects/texture_object_36.png')
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
