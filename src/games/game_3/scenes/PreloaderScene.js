import BasicScene from './BasicScene'

export default class PreloaderScene extends BasicScene {

    constructor() {
        super({
            key: "Preloader"
        })
    }

    preload() {

        const imageFiles = {
            'bg_base': require('../assets/bg_stage.png'),
            'bg_end': require('../assets/bg_end.png'),
            'bg_tutor': require('../assets/bg_tutor.png'),
        };

        const atlasFiles = {
            'tut1': { img: require('../assets/tut1.png'), data: require('../assets/tut1.json')},
            'tut2': { img: require('../assets/tut2.png'), data: require('../assets/tut2.json')},
            'tut3': { img: require('../assets/tut3.png'), data: require('../assets/tut3.json')},
        }

        this.preloadFromArr({img: imageFiles, atlas: atlasFiles});

        this.createProgressBar();

    }

    create() {

        super.create();
        setTimeout(
            ()=> {
                this.scene.start('Tutor')
            }, 1
        )
    }

}
