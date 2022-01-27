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

    self.load.image('tutorBg', require('../assets/tutor_bg.png'));
    self.load.image('gameBg', require('../assets/bg_pnl.png'));
    self.load.image('endBg', require('../assets/bg_end.png'));
    self.load.image('endBoxBg', require('../assets/end_box.png'));
    self.load.image('ltpBg', require('../assets/bg_ltp.png'));
    self.load.image('pnlBg', require('../assets/bg_pnl.png'));
    self.load.image('stageBg', require('../assets/bg_stage.png'));
    self.load.image('sndBg', require('../assets/bg_snd.png'));
    self.load.image('bluescreenLogo', require('../assets/bluescreen_logo.png'));

    self.load.image('ph1Bg', require('../assets/bg_ph1.png'));
    self.load.image('ph2Bg', require('../assets/bg_ph2.png'));
    self.load.image('tray', require('../assets/tray.png'));


    self.load.spritesheet('extSmBtn', require('../assets/btn_ext_1.png'),{ frameWidth: 186, frameHeight: 209 });
    self.load.spritesheet('strBtn', require('../assets/btn_str.png'),{ frameWidth: 776, frameHeight: 227 });
    self.load.spritesheet('plyBtn', require('../assets/btn_ply.png'),{ frameWidth: 186, frameHeight: 209 });
    self.load.spritesheet('pusBtn', require('../assets/btn_pus.png'),{ frameWidth: 186, frameHeight: 209 });
    self.load.spritesheet('rplBtn', require('../assets/btn_rpl.png'),{ frameWidth: 410, frameHeight: 163.5 });
    self.load.spritesheet('extBtn', require('../assets/btn_ext.png'),{ frameWidth: 410, frameHeight: 163.5 });
    self.load.spritesheet('cfmBtn', require('../assets/btn_cfm.png'),{ frameWidth: 917, frameHeight: 233 });
    self.load.spritesheet('voiceButton', require('../assets/button_voice.png'), { frameWidth: 186, frameHeight: 210 });

    self.load.atlas('tut1',require('../assets/tut1.png'), require('../assets/tut1.json'));
    self.load.atlas('tut2',require('../assets/tut2.png'), require('../assets/tut2.json'));
    self.load.atlas('tut3',require('../assets/tut3.png'), require('../assets/tut3.json'));
    self.load.atlas('tut4',require('../assets/tut4.png'), require('../assets/tut4.json'));

    self.load.atlas('bg_space',require('../assets/bg_space.png'), require('../assets/bg_space.json'));
    self.load.atlas('bg_space_rocket', require('../assets/bg_space_rocket.png'), require('../assets/bg_space_rocket.json'));
    self.load.atlas('bg_space_ufo', require('../assets/bg_space_ufo.png'), require('../assets/bg_space_ufo.json'));

    self.load.atlas('chipin',require('../assets/chipin.png'), require('../assets/chipin.json'));


    self.load.atlas('char_bg',require('../assets/char_bg.png'), require('../assets/char_bg.json'));
    self.load.atlas('char',require('../assets/'+self.model.character.path.char[0]), require('../assets/'+self.model.character.path.char[1]));
    self.load.atlas('char_end',require('../assets/'+self.model.character.path.end[0]), require('../assets/'+self.model.character.path.end[1]));

    self.load.audio('bgMusic', require('../assets/voice/bg.mp3'));

    self.background = self.add.image(config.width/2, config.height/2, 'bootBg').setOrigin(.5, .5);
    self.background.setDisplaySize(config.width, config.height);

    self.progressBar = self.add.graphics();
    self.loadingText = self.make.text({
        x: config.width / 2,
        y: config.height * 0.89,
        text: '連接中',
        style: {
            font: '25px monospace',
            fill: '#fff'
        }
    });
    self.loadingText.setOrigin(0.5, 0.5);

    self.load.on('progress', function (value) {
      self.progressBar.clear();
      self.progressBar.fillStyle(0xFC8EFA, 1);
      self.progressBar.fillRect(config.width * 0.118, config.height * 0.92, (config.width * 0.778) * value, 10);
    });

    self.load.on('complete', function () {
      self.loadingText.setText('連接完成');
      self.ready();
    }.bind(self));

  }

  ready () {
    let self = this
    self.scene.start('Tutor');
  }

}