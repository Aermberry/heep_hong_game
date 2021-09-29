import BasicScene from "./BasicScene";

export default class PreloaderScene extends BasicScene {

    constructor () {
        super({
            key: 'Preloader'
        });
    }

    preload () {

        const atlasFiles = {
            'tut1': { img: require('../assets/anims/tut1.png'), data: require('../assets/anims/tut1.json')},
            'tut2': { img: require('../assets/anims/tut2.png'), data: require('../assets/anims/tut2.json')},
            'tut3': { img: require('../assets/anims/tut3.png'), data: require('../assets/anims/tut3.json')},
            'road': { img: require('../assets/anims/stage1/road.png'), data: require('../assets/anims/stage1/road.json')}
        }

        this.preloadFromArr({
            atlas: atlasFiles
        })

        this.load.spritesheet('extSmBtn', require('../assets/images/btn_ext_1.png'),{ frameWidth: 186, frameHeight: 209 });
        this.load.spritesheet('strBtn', require('../assets/images/btn_str.png'),{ frameWidth: 776, frameHeight: 227 });

    }

    create () {
        super.create();

        this.buildBg('bg_title')

        setTimeout(
            ()=> {
                this.scene.start('Tutor')
            }, 1
        )

    }

}