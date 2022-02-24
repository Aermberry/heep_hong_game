// import { Scene } from 'phaser';
import _ from 'lodash';
import config from '../config/Config';
import charSet from '../assets/json/character.json';
import BasicScene from './BasicScene';
// import Choice from '../assets/json/choice.json'

export default class PreloaderScene extends BasicScene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.model = this.sys.game.globals.model;
    this.model.character = charSet[_.random(charSet.length-1)]
    // this.model.character = charSet[0]
  }

  preload () {
    let self = this

    self.background = self.add.image(config.width/2, config.height/2, 'bootBg').setOrigin(.5, .5);
    self.background.setDisplaySize(config.width, config.height);

    const imageFiles = {
      'tutorBg': require('../assets/tutor_bg.png'),
      'gameBg': require('../assets/bg_pnl.png'),
      'endBg': require('../assets/bg_end.png'),
      'endBoxBg': require('../assets/end_box.png'),
      'ltpBg': require('../assets/bg_ltp.png'),
      'pnlBg': require('../assets/bg_pnl.png'),
      'stageBg': require('../assets/bg_stage.png'),
      'sndBg': require('../assets/bg_snd.png'),
      'bluescreenLogo': require('../assets/bluescreen_logo.png'),
      'ph1Bg': require('../assets/bg_ph1.png'),
      'ph2Bg': require('../assets/bg_ph2.png'),
      'tray': require('../assets/tray.png')
    }

    const atlasFiles = {
      'tut1': { img: require('../assets/tut1.png'), data: require('../assets/tut1.json')},
      'tut2': { img: require('../assets/tut2.png'), data: require('../assets/tut2.json')},
      'tut3': { img: require('../assets/tut3.png'), data: require('../assets/tut3.json')},
      'tut4': { img: require('../assets/tut4.png'), data: require('../assets/tut4.json')},
      'bg_space': { img: require('../assets/bg_space.png'), data: require('../assets/bg_space.json')},
      'bg_space_rocket': { img: require('../assets/bg_space_rocket.png'), data: require('../assets/bg_space_rocket.json')},
      'bg_space_ufo': { img: require('../assets/bg_space_ufo.png'), data: require('../assets/bg_space_ufo.json')},
      'chipin': { img: require('../assets/chipin.png'), data: require('../assets/chipin.json')},
      'char_bg': { img: require('../assets/char_bg.png'), data: require('../assets/char_bg.json')},
      'char': { img: require('../assets/'+self.model.character.path.char[0]), data: require('../assets/'+self.model.character.path.char[1])},
      'char_end': { img: require('../assets/'+self.model.character.path.end[0]), data: require('../assets/'+self.model.character.path.end[1])},
    }

    const soundFiles = {
      'bgMusic': require('../assets/audio/taiko-drums.mp3'),
    }



    this.load.spritesheet('extSmBtn', require('../assets/btn_ext_1.png'),{ frameWidth: 186, frameHeight: 209 });
    this.load.spritesheet('strBtn', require('../assets/btn_str.png'),{ frameWidth: 776, frameHeight: 227 });
    this.load.spritesheet('plyBtn', require('../assets/btn_ply.png'),{ frameWidth: 186, frameHeight: 209 });
    this.load.spritesheet('pusBtn', require('../assets/btn_pus.png'),{ frameWidth: 186, frameHeight: 209 });
    this.load.spritesheet('rplBtn', require('../assets/btn_rpl.png'),{ frameWidth: 410, frameHeight: 163.5 });
    this.load.spritesheet('extBtn', require('../assets/btn_ext.png'),{ frameWidth: 410, frameHeight: 163.5 });
    this.load.spritesheet('cfmBtn', require('../assets/btn_cfm.png'),{ frameWidth: 917, frameHeight: 233 });
    this.load.spritesheet('speakerBtn', require('../assets/btn_speaker.png'),{ frameWidth: 186, frameHeight: 209  });
    this.load.spritesheet('offSpeakerBtn', require('../assets/btn_speaker_off.png'), { frameWidth: 186, frameHeight: 209  });

    this.preloadFromArr({img: imageFiles, atlas: atlasFiles, sound: soundFiles});
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