import BasicScene from './BasicScene'
import LoadProgress from '../components/LoadProgress';


export default class PreloaderScene extends BasicScene {

    constructor() {
        super("Preloader"
        )

        this.progressLoader = null;
    }

    preload() {
        
        this.buildBg('bgLoadingGame');

        this.progressLoader = new LoadProgress(this, () => this.scene.start('Tutor'));

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
            'tutor01Texture': { img: require('../assets/atlas/animation_tutor01.png'), data: require('../assets/atlas/animation_tutor01.json') },

            'tutor02Texture': { img: require('../assets/atlas/animation_tutor02.png'), data: require('../assets/atlas/animation_tutor02.json') },

            'tutor03Texture': { img: require('../assets/atlas/animation_tutor03.png'), data: require('../assets/atlas/animation_tutor03.json') },

            'tutor04Texture': { img: require('../assets/atlas/animation_tutor04.png'), data: require('../assets/atlas/animation_tutor04.json') },

            'tutor05Texture': { img: require('../assets/atlas/animation_tutor05.png'), data: require('../assets/atlas/animation_tutor05.json') },

            'victoryTexture': { img: require('../assets/atlas/animation_victory.png'), data: require('../assets/atlas/animation_victory.json') },

            'clipTexture': { img: require('../assets/atlas/animation_clip.png'), data: require('../assets/atlas/animation_clip.json') },

            'gameFailTexture': { img: require('../assets/atlas/animation_fail.png'), data: require('../assets/atlas/animation_fail.json') },

            'gameSuccessTexture': { img: require('../assets/atlas/animation_success.png'), data: require('../assets/atlas/animation_success.json') },

        }

        const soundFiles = {
            /* BGM */
            'gamePlaySceneBackgroundMusic': require('../assets/audio/bgm_game_play_scene.mp3'),
            'preloaderSceneGameEndSceneBackgroundMusic': require('../assets/audio/bgm_preloader_scene_game_end_scene.mp3'),

            /* Effect Sound */
            'buttonEffectSound': require('../assets/audio/sound_effect/effect_button_on_clicked.mp3'),
            'starEffectSound': require('../assets/audio/sound_effect/effect_star.mp3'),
            'electricShockEffectSound': require('../assets/audio/sound_effect/effect_electric_shock.mp3'),
            'clipClampEffectSound': require('../assets/audio/sound_effect/effect_clip_clamp.mp3'),
            'clipDollTableEffectSound': require('../assets/audio/sound_effect/effect_clip_doll_table.mp3'),
            'clipMovementEffectSound': require('../assets/audio/sound_effect/effect_clip_movement.mp3'),
            'spotlightFocusEffectSound': require('../assets/audio/sound_effect/effect_spotlight_focus.mp3'),
        }

        this.load.spritesheet('startButton', require('../assets/images/btn_str.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('rplBtn', require('../assets/images/btn_rpl.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('gameProgressExitBtn', require('../assets/images/btn_game_progress_exit.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('gameEndExitBtn', require('../assets/images/btn_game_end_exit.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('buttonMoveDownControl', require('../assets/images/button_move_down_control.png'), { frameWidth: 160, frameHeight: 184 });
        this.load.spritesheet('buttonMoveLeftControl', require('../assets/images/button_move_left_control.png'), { frameWidth: 160, frameHeight: 184 });
        this.load.spritesheet('buttonMoveRightControl', require('../assets/images/button_move_right_control.png'), { frameWidth: 160, frameHeight: 184 });
        this.load.spritesheet('backgroundMusicButtonOnPlay', require('../assets/images/button_background_music_on_play.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('backgroundMusicButtonOnPause', require('../assets/images/button_background_music_on_pause.png'), { frameWidth: 186, frameHeight: 209 });



        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }
}
