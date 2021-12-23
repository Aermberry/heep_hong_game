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
        });

        const imageFiles = {
            'imageTutor01': require('../assets/images/image_tutor01.png'),
            'imageTutor02': require('../assets/images/image_tutor02.png'),
            'imageTutor03': require('../assets/images/image_tutor03.png'),
            'backgroundTutorEnd':require('../assets/images/background_tutor_end.png'),
            'gameEndDialogBox':require('../assets/images/background_game_end_dialog.png'),

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
        this.load.spritesheet('resetButton', require('../assets/images/button_reset.png'), { frameWidth: 160, frameHeight: 184 });

        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }

}
