import BasicScene from './BasicScene'
import GameSprite from '../components/GameSprite'
import LoadProgress from '../components/LoadProgress';
import { createLoadingTitleAnimations } from '../assets/animations/LoadingTitleAnimation';

export default class PreloaderScene extends BasicScene {

    constructor() {
        super("Preloader"
        )

        this.progressLoader = null;
    }

    preload() {
        let self = this;

        this.buildBg('backgroundPreloadingScene');

        createLoadingTitleAnimations(this.anims);

        const loadingTitle = new GameSprite(this, 960, 400, 'loadingTitleTexture');
        loadingTitle.play('loadingTitleAnimation');

        this.progressLoader = new LoadProgress(this);
        this.progressLoader.create();

        this.load.on('progress', (params) => {
            this.progressLoader.onLoadProgress(params)
        }
        );

        this.load.on('complete', (loader, totalComplete, totalFailed) => {

            this.progressLoader.onLoadComplete(loader, totalComplete, totalFailed, self, 'Tutor');
            // this.progressLoader.onLoadComplete(loader, totalComplete, totalFailed, self, 'Game');
        });

        const imageFiles = {
            'imageTutor01': require('../assets/images/image_tutor01.png'),
            'imageTutor02': require('../assets/images/image_tutor02.png'),
            'imageTutor03': require('../assets/images/image_tutor03.png'),

            'eggGreen': require('../assets/images/object_egg_green.png'),
            'eggOrange': require('../assets/images/object_egg_orange.png'),
            'eggPink': require('../assets/images/object_egg_pink.png'),
            'eggPurple': require('../assets/images/object_egg_purple.png'),
            'eggYellow': require('../assets/images/object_egg_yellow.png'),

            'openedEggGreen': require('../assets/images/object_opened_egg_green.png'),
            'openedEggOrange': require('../assets/images/object_opened_egg_orange.png'),
            'openedEggPink': require('../assets/images/object_opened_egg_pink.png'),
            'openedEggPurple': require('../assets/images/object_opened_egg_purple.png'),
            'openedEggYellow': require('../assets/images/object_opened_egg_yellow.png'),

            'backgroundLabelPhrase': require('../assets/images/background_label_phrase.png'),
            'backgroundLabelPreposition': require('../assets/images/background_label_preposition.png'),
            'backgroundLabelAnswer': require('../assets/images/background_label_answer.png'),
            'backgroundTutorEnd': require('../assets/images/background_tutor_end.png'),
            'backgroundGamePlay': require('../assets/images/background_game_play_scene.png'),
            'gameEndDialogBox': require('../assets/images/background_game_end_dialog.png'),

            'uiError': require('../assets/images/ui_error.png'),

            'questionPicture0': require('../assets/images/questionPictures/0.png'),
            'questionPicture1': require('../assets/images/questionPictures/1.png'),
            'questionPicture2': require('../assets/images/questionPictures/2.png'),
            'questionPicture3': require('../assets/images/questionPictures/3.png'),
            'questionPicture4': require('../assets/images/questionPictures/4.png'),
            'questionPicture5': require('../assets/images/questionPictures/5.png'),
            'questionPicture6': require('../assets/images/questionPictures/6.png'),
            'questionPicture7': require('../assets/images/questionPictures/7.png'),
            'questionPicture8': require('../assets/images/questionPictures/8.png'),
            'questionPicture9': require('../assets/images/questionPictures/9.png'),
            'questionPicture10': require('../assets/images/questionPictures/10.png'),
            'questionPicture11': require('../assets/images/questionPictures/11.png'),
            'questionPicture12': require('../assets/images/questionPictures/12.png'),
            'questionPicture13': require('../assets/images/questionPictures/13.png'),
            'questionPicture14': require('../assets/images/questionPictures/14.png'),
            'questionPicture15': require('../assets/images/questionPictures/15.png'),
            'questionPicture16': require('../assets/images/questionPictures/16.png'),
            'questionPicture17': require('../assets/images/questionPictures/17.png'),
            'questionPicture18': require('../assets/images/questionPictures/18.png'),
            'questionPicture19': require('../assets/images/questionPictures/19.png'),
        };

        const atlasFiles = {
            'eggTwistingMachineTexture': {
                img: require('../assets/atlas/atlas_egg_twisting_machine.png'), data: require('../assets/atlas/atlas_egg_twisting_machine.json')
            },
            'starTexture': {
                img: require('../assets/atlas/atlas_star.png'), data: require('../assets/atlas/atlas_star.json')
            },
            'endTexture': {
                img: require('../assets/atlas/atlas_end.png'), data: require('../assets/atlas/atlas_end.json')
            },
            'tutor01Texture': {
                img: require('../assets/atlas/tutor01.png'), data: require('../assets/atlas/tutor01.json')
            },
            'tutor02Texture': {
                img: require('../assets/atlas/tutor02.png'), data: require('../assets/atlas/tutor02.json')
            },
            'tutor03Texture': {
                img: require('../assets/atlas/tutor03.png'), data: require('../assets/atlas/tutor03.json')
            }
        }

        const soundFiles = {

            'buttonOnClickedEffectSound': require('../assets/audio/sound_effect/sound_effect_button_on_clicked.mp3'),

            'gamePlaySceneBGM': require('../assets/audio/bgm_game_play_scene.mp3'),
            'gameEndSceneBGM': require('../assets/audio/bgm_game_end_scene.mp3'),

            'ballSpinEffectSound': require('../assets/audio/sound_effect/sound_effect_ball_spin.mp3'),
            'openCapsuleEffectSound': require('../assets/audio/sound_effect/sound_effect_open_capsule.mp3'),
            'answerCorrectEffectSound': require('../assets/audio/sound_effect/sound_effect_answer_correct.mp3'),
            'gameWinEffectSound': require('../assets/audio/sound_effect/sound_effect_game_win.mp3'),
            'gameLoseEffectSound': require('../assets/audio/sound_effect/sound_effect_game_lose.mp3'),
            'answerErrorEffectSound': require('../assets/audio/sound_effect/sound_effect_answer_error.mp3'),

            "voice0":require("../assets/audio/voice/0.mp3"),
            "voice1":require("../assets/audio/voice/1.mp3"),
            "voice2":require("../assets/audio/voice/2.mp3"),
            "voice3":require("../assets/audio/voice/3.mp3"),
            "voice4":require("../assets/audio/voice/4.mp3"),
            "voice5":require("../assets/audio/voice/5.mp3"),
            "voice6":require("../assets/audio/voice/6.mp3"),
            "voice7":require("../assets/audio/voice/7.mp3"),
            "voice8":require("../assets/audio/voice/8.mp3"),
            "voice9":require("../assets/audio/voice/9.mp3"),
            "voice10":require("../assets/audio/voice/10.mp3"),
            "voice11":require("../assets/audio/voice/11.mp3"),
            "voice12":require("../assets/audio/voice/12.mp3"),
            "voice13":require("../assets/audio/voice/13.mp3"),
            "voice14":require("../assets/audio/voice/14.mp3"),
            "voice15":require("../assets/audio/voice/15.mp3"),
            "voice16":require("../assets/audio/voice/16.mp3"),
            "voice17":require("../assets/audio/voice/17.mp3"),
            "voice18":require("../assets/audio/voice/18.mp3"),
            "voice19":require("../assets/audio/voice/19.mp3"),

        }

        this.load.spritesheet('startButton', require('../assets/images/button_start_game.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('retryButton', require('../assets/images/button_retry.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('gameProgressExitButton', require('../assets/images/button_exit_progress_game.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('gameEndExitButton', require('../assets/images/button_game_end_exit.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('resetButton', require('../assets/images/button_reset.png'), { frameWidth: 228, frameHeight: 241 });
        this.load.spritesheet('confirmButton', require('../assets/images/button_confirm.png'), { frameWidth: 299, frameHeight: 330 });
        this.load.spritesheet('backgroundMusicButtonOnPlay', require('../assets/images/button_background_music_on_play.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('backgroundMusicButtonOnPause', require('../assets/images/button_background_music_on_pause.png'), { frameWidth: 186, frameHeight: 209 });

        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }

}
