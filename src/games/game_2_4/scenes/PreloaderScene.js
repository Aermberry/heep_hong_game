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
            'tutorTexture': {
                img: require('../assets/atlas/atlas_tutor.png'), data: require('../assets/atlas/atlas_tutor.json')
            },
            'eggTwistingMachineTexture': {
                img: require('../assets/atlas/atlas_egg_twisting_machine.png'), data: require('../assets/atlas/atlas_egg_twisting_machine.json')
            },
            'starTexture': {
                img: require('../assets/atlas/atlas_star.png'), data: require('../assets/atlas/atlas_star.json')
            },
            'endTexture': {
                img: require('../assets/atlas/atlas_end.png'), data: require('../assets/atlas/atlas_end.json')
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
        this.load.spritesheet('confirmButton', require('../assets/images/button_confirm.png'), { frameWidth: 456, frameHeight: 431 });

        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }

}
