import BasicScene from './BasicScene'
import LoadProgress from '../components/LoadProgress';

export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {
        this.buildBg('bgLoadingGame');

        this.progressLoader = new LoadProgress(this, () => this.scene.start('Tutor'));

        const imageFiles = {
            'bgTutor': require('../assets/images/bg_tutor.png'),
            'iconTutor': require('../assets/images/icon_tutor.png'),
            'stageSalver': require('../assets/images/stage_salver.png'),
            'bgTipBox': require('../assets/images/icon_tip_dialog.png'),
            'dialogTipBox': require('../assets/images/dialog_tip_box.png'),
            'dialogWrongBox': require('../assets/images/dialog_wrong_box.png'),
            'stageBigTooth': require('../assets/images/stage_big_tooth.png'),
            'bgProgressGame': require('../assets/images/bg_progress_game.png'),
            'stageSmallTooth': require('../assets/images/stage_small_tooth.png'),
            'bgGameFailed': require('../assets/images/bg_game_failed.png'),
            'errorImage': require('../assets/images/image_error.png')
        };

        const atlasFiles = {
            'starTexture': {
                img: require('../assets/atlas/animation_star.png'),
                data: require('../assets/atlas/animation_star.json')
            },

            'tutorTexture01': {
                img: require('../assets/atlas/animation_tutor01.png'),
                data: require('../assets/atlas/animation_tutor01.json'),
            },
            'tutorTexture02': {
                img: require('../assets/atlas/animation_tutor02.png'),
                data: require('../assets/atlas/animation_tutor02.json'),
            },
            'tutorTexture03': {
                img: require('../assets/atlas/animation_tutor03.png'),
                data: require('../assets/atlas/animation_tutor03.json'),
            },
        };

        const soundFiles = {
            'buttonEffectSound': require('../assets/audio/sound_effect/sound_effect_button_on_clicked.mp3'),
            'childClapEffectSound': require('../assets/audio/sound_effect/effect_child_clap.mp3'),
            'popOffEffectSound': require('../assets/audio/sound_effect/effect_pop_off.mp3'),
            'ahhEffectSound': require('../assets/audio/sound_effect/effect_ahh.mp3'),
            'dropEffectSound': require('../assets/audio/sound_effect/effect_drop.mp3'),
            'biteCrunchEffectSound': require('../assets/audio/sound_effect/effect_bite_crunch.mp3'),
            'dentistDrillEnvironmentSound': require('../assets/audio/sound_effect/environment_dentist_drill.mp3'),
            'selectTeethEffectSound': require('../assets/audio/sound_effect/effect_select_teeth.mp3'),
            'clapEffectSound': require('../assets/audio/sound_effect/effect_clap.mp3'),
            'gameSceneYouLose': require('../assets/audio/sound_background/bgm_game_scene_you_lose.mp3'),
            'gameEndHappyEnding': require('../assets/audio/sound_background/bgm_game_end_happy_ending.mp3'),
            'gamePlaySceneBackgroundMusic': require('../assets/audio/sound_background/bgm_game_scene.mp3'),
            'voiceAnswer0': require('../assets/audio/voice/voice_answer_00.mp3'),
            'voiceAnswer1': require('../assets/audio/voice/voice_answer_01.mp3'),
            'voiceAnswer2': require('../assets/audio/voice/voice_answer_02.mp3'),
            'voiceAnswer3': require('../assets/audio/voice/voice_answer_03.mp3'),
            'voiceAnswer4': require('../assets/audio/voice/voice_answer_04.mp3'),
            'voiceAnswer5': require('../assets/audio/voice/voice_answer_05.mp3'),
            'voiceAnswer6': require('../assets/audio/voice/voice_answer_06.mp3'),
            'voiceAnswer7': require('../assets/audio/voice/voice_answer_07.mp3'),
            'voiceAnswer8': require('../assets/audio/voice/voice_answer_08.mp3'),
            'voiceAnswer9': require('../assets/audio/voice/voice_answer_09.mp3'),
            'voiceAnswer10': require('../assets/audio/voice/voice_answer_10.mp3'),
            'voiceAnswer11': require('../assets/audio/voice/voice_answer_11.mp3'),
            'voiceAnswer12': require('../assets/audio/voice/voice_answer_12.mp3'),
            'voiceAnswer13': require('../assets/audio/voice/voice_answer_13.mp3'),
            'voiceAnswer14': require('../assets/audio/voice/voice_answer_14.mp3'),
            'voiceAnswer15': require('../assets/audio/voice/voice_answer_15.mp3'),
            'voiceAnswer16': require('../assets/audio/voice/voice_answer_16.mp3'),
            'voiceAnswer17': require('../assets/audio/voice/voice_answer_17.mp3'),
            'voiceAnswer18': require('../assets/audio/voice/voice_answer_18.mp3'),
            'voiceAnswer19': require('../assets/audio/voice/voice_answer_19.mp3'),
        };

        this.load.spritesheet('startButton', require('../assets/images/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/images/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('rplLongBtn', require('../assets/images/btn_long_rpl.png'), { frameWidth: 566, frameHeight: 163.5 });
        this.load.spritesheet('gameProgressExitButton', require('../assets/images/btn_game_progress_exit.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('gameEndExitBtn', require('../assets/images/btn_game_end_exit.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('moveBtn', require('../assets/images/btn_move.png'), { frameWidth: 256, frameHeight: 277 });
        this.load.spritesheet('leftButton', require('../assets/images/btn_left_move.png'), { frameWidth: 256, frameHeight: 277 });
        this.load.spritesheet('rightButton', require('../assets/images/btn_right_move.png'), { frameWidth: 256, frameHeight: 277 });
        this.load.spritesheet('backgroundMusicButtonOnPlay', require('../assets/images/button_background_music_on_play.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('backgroundMusicButtonOnPause', require('../assets/images/button_background_music_on_pause.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('showAnswerButton', require('../assets/images/button_show_answer.png'), { frameWidth: 1203, frameHeight: 250 });

        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }





}
