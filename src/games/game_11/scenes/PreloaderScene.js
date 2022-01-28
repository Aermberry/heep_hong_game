import BasicScene from "./BasicScene";

export default class PreloaderScene extends BasicScene {

    constructor () {
        super({
            key: 'Preloader'
        });
    }

    init() {

        this.dataModel = this.sys.game.globals.model;

    }

    preload () {

        this.buildBg('bg_title')

        this.sound.stopAll();

        // console.log(this.dataModel.tutorAnimates)

        // const tutReses = this.dataModel.tutorAnimates;



        const tutAnimSet = {
            11: {
                'tut1': { img: require('../assets/anims/stage1/tut1.png'), data: require('../assets/anims/stage1/tut1.json')},
                'tut2': { img: require('../assets/anims/stage1/tut2.png'), data: require('../assets/anims/stage1/tut2.json')},
                'tut3': { img: require('../assets/anims/stage1/tut3.png'), data: require('../assets/anims/stage1/tut3.json')},
            },
            12: {
                'tut1': { img: require('../assets/anims/stage2/tut1.png'), data: require('../assets/anims/stage2/tut1.json')},
                'tut2': { img: require('../assets/anims/stage2/tut2.png'), data: require('../assets/anims/stage2/tut2.json')},
                'tut3': { img: require('../assets/anims/stage2/tut3.png'), data: require('../assets/anims/stage2/tut3.json')},
            },
            13: {
                'tut1': { img: require('../assets/anims/stage3/tut1.png'), data: require('../assets/anims/stage3/tut1.json')},
                'tut2': { img: require('../assets/anims/stage3/tut2.png'), data: require('../assets/anims/stage3/tut2.json')},
                'tut3': { img: require('../assets/anims/stage3/tut3.png'), data: require('../assets/anims/stage3/tut3.json')},
            },
            14: {
                'tut1': { img: require('../assets/anims/stage4/tut1.png'), data: require('../assets/anims/stage4/tut1.json')},
                'tut2': { img: require('../assets/anims/stage4/tut2.png'), data: require('../assets/anims/stage4/tut2.json')},
                'tut3': { img: require('../assets/anims/stage4/tut3.png'), data: require('../assets/anims/stage4/tut3.json')},
            },
            15: {
                'tut1': { img: require('../assets/anims/stage5/tut1.png'), data: require('../assets/anims/stage5/tut1.json')},
                'tut2': { img: require('../assets/anims/stage5/tut2.png'), data: require('../assets/anims/stage5/tut2.json')},
                'tut3': { img: require('../assets/anims/stage5/tut3.png'), data: require('../assets/anims/stage5/tut3.json')},
            }
        }

        // const atlasFiles = {
        //     'tut1': { img: require('../assets/anims/tut1.png'), data: require('../assets/anims/tut1.json')},
        //     'tut2': { img: require('../assets/anims/tut2.png'), data: require('../assets/anims/tut2.json')},
        //     'tut3': { img: require('../assets/anims/tut3.png'), data: require('../assets/anims/tut3.json')},
        // }



        // const atlasFiles = {
        //     'tut1': { img: require(tutReses['tut1']['img']), data: require(tutReses['tut1']['data'])},
        //     'tut2': { img: require(tutReses['tut2']['img']), data: require(tutReses['tut2']['data'])},
        //     'tut3': { img: require(tutReses['tut3']['img']), data: require(tutReses['tut3']['data'])},
        // }
        let atlasFiles = {}

        Object.keys(tutAnimSet[this.dataModel.gameStage]).forEach((key)=> {
            atlasFiles[key] = tutAnimSet[this.dataModel.gameStage][key]
        })

        const imageFiles = {
            'tutor_bg': require('../assets/images/Tutor.png'),
            'end_bg': require('../assets/images/Complete.png')
        }

        const soundFiles = {
            'correct_sound': require('../assets/audios/Cartoon_correct_answer.mp3'),
            'wrong_sound': require('../assets/audios/Cardboard_Box_05.mp3'),
            'bgm': require('../assets/audios/06_strait_no_chaser_01_shorten.mp3'),
            'turn': require('../assets/audios/turn-signal_short.mp3')
        }

        this.preloadFromArr({
            atlas: atlasFiles, img: imageFiles, sound: soundFiles
        })

        this.load.spritesheet('extSmBtn', require('../assets/images/btn_ext_1.png'),{ frameWidth: 186, frameHeight: 209 })
        this.load.spritesheet('strBtn', require('../assets/images/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })
        this.load.spritesheet('btn_lt', require('../assets/images/btn_lt.png'),{ frameWidth:168, frameHeight: 186})
        this.load.spritesheet('btn_rt', require('../assets/images/btn_rt.png'),{ frameWidth:168, frameHeight: 186})
        this.load.spritesheet('rplBtn', require('../assets/images/btn_rpl.png'),{ frameWidth: 410, frameHeight: 163.5 })
        this.load.spritesheet('extBtn', require('../assets/images/btn_ext.png'),{ frameWidth: 410, frameHeight: 163.5 })
        this.load.spritesheet('speakerBtn', require('../assets/images/btn_speaker.png'),{ frameWidth: 186, frameHeight: 209  })
        this.load.spritesheet('offSpeakerBtn', require('../assets/images/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209  })

        this.createProgressBar();

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