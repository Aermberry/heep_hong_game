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
            'backgroundPreloadingScene': require('../assets/images/background_preloading_scene.png'),
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

        this.load.spritesheet('startButton', require('../assets/images/button_start_game.png'), { frameWidth: 776, frameHeight: 227 });
        this.load.spritesheet('retryButton', require('../assets/images/button_retry.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('gameProgressExitBtn', require('../assets/images/button_exit_progress_game.png'), { frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('gameEndExitBtn', require('../assets/images/button_game_end_exit.png'), { frameWidth: 410, frameHeight: 163.5 });
        this.load.spritesheet('resetButton', require('../assets/images/button_reset.png'), { frameWidth: 160, frameHeight: 184 });

        this.preloadFromArr({ img: imageFiles, atlas: atlasFiles, sound: soundFiles });
    }

}
