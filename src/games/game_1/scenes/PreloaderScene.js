import { Scene } from 'phaser'
import config from '../config/Config';


export default class PreloaderScene extends Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    let self = this

    self.load.image('tutorBg', require('../assets/tutor_bg.png'))
    self.load.image('gameBg', require('../assets/bg_pnl.png'))
    self.load.image('refBg', require('../assets/ref.png'))
    self.load.image('endBg', require('../assets/bg_end.png'))
    self.load.image('endBoxBg', require('../assets/end_box.png'))
    self.load.image('ltpBg', require('../assets/bg_ltp.png'))
    self.load.image('pnlBg', require('../assets/bg_pnl.png'))
    self.load.image('stageBg', require('../assets/bg_stage.png'))
    self.load.image('sndBg', require('../assets/bg_snd.png'))

    self.load.image('endPic1', require('../assets/end_pic1.png'))
    self.load.image('endPic2', require('../assets/end_pic2.png'))
    self.load.image('endPic3', require('../assets/end_pic3.png'))

    self.load.image('sndAim', require('../assets/snd.gif'))


    self.load.image('ph1Bg', require('../assets/bg_ph1.png'))
    self.load.image('ph2Bg', require('../assets/bg_ph2.png'))
    self.load.image('i_apl', require('../assets/i_apl.png'))
    self.load.image('i_bgr', require('../assets/i_bgr.png'))
    self.load.image('i_bnn', require('../assets/i_bnn.png'))
    self.load.image('i_egg', require('../assets/i_egg.png'))
    self.load.image('i_fri', require('../assets/i_fri.png'))
    self.load.image('i_fsh', require('../assets/i_fsh.png'))
    self.load.image('i_ice', require('../assets/i_ice.png'))
    self.load.image('i_it', require('../assets/i_it.png'))
    self.load.image('i_ndl', require('../assets/i_ndl.png'))
    self.load.image('i_oj', require('../assets/i_oj.png'))
    self.load.image('i_ric', require('../assets/i_ric.png'))
    self.load.image('i_veg', require('../assets/i_veg.png'))
    self.load.image('i_wng', require('../assets/i_wng.png'))
    self.load.image('i_wtr', require('../assets/i_wtr.png'))
    self.load.image('tray', require('../assets/tray.png'))

    self.load.spritesheet('extSmBtn', require('../assets/btn_ext_1.png'),{ frameWidth: 186, frameHeight: 209 })
    self.load.spritesheet('strBtn', require('../assets/btn_str.png'),{ frameWidth: 776, frameHeight: 227 })
    self.load.spritesheet('plyBtn', require('../assets/btn_ply.png'),{ frameWidth: 186, frameHeight: 209 })
    self.load.spritesheet('pusBtn', require('../assets/btn_pus.png'),{ frameWidth: 186, frameHeight: 209 })
    self.load.spritesheet('rplBtn', require('../assets/btn_rpl.png'),{ frameWidth: 410, frameHeight: 163.5 })
    self.load.spritesheet('extBtn', require('../assets/btn_ext.png'),{ frameWidth: 410, frameHeight: 163.5 })

    self.load.atlas('tut1',require('../assets/tut1.png'), require('../assets/tut1.json'))
    self.load.atlas('tut2',require('../assets/tut2.png'), require('../assets/tut2.json'))
    self.load.atlas('tut3',require('../assets/tut3.png'), require('../assets/tut3.json'))
    self.load.atlas('tut4',require('../assets/tut4.png'), require('../assets/tut4.json'))



    self.load.atlas('bg_space',require('../assets/bg_space.png'), require('../assets/bg_space.json'))

    self.load.atlas('chipin',require('../assets/chipin.png'), require('../assets/chipin.json'))
    self.load.atlas('wave',require('../assets/wave.png'), require('../assets/wave.json'))

    self.load.atlas('char_leo',require('../assets/leo.png'), require('../assets/leo.json'))
    self.load.atlas('char_leo_end',require('../assets/end_pic1.png'), require('../assets/end_pic1.json'))
    self.load.atlas('char_teddy',require('../assets/teddy.png'), require('../assets/teddy.json'))
    self.load.atlas('char_teddy_end',require('../assets/end_pic2.png'), require('../assets/end_pic2.json'))
    self.load.atlas('char_pen',require('../assets/pen.png'), require('../assets/pen.json'))
    self.load.atlas('char_pen_end',require('../assets/end_pic3.png'), require('../assets/end_pic3.json'))



    self.load.audio('vo_egg', require('../assets/voice/egg.wav'))
    self.load.audio('vo_fish', require('../assets/voice/fish.wav'))
    self.load.audio('vo_juice', require('../assets/voice/juice.wav'))
    self.load.audio('vo_noodle', require('../assets/voice/noodle.wav'))
    self.load.audio('vo_rice', require('../assets/voice/rice.wav'))
    self.load.audio('vo_tea', require('../assets/voice/tea.wav'))
    self.load.audio('vo_vegetable', require('../assets/voice/vegetable.wav'))
    self.load.audio('vo_water', require('../assets/voice/water.wav'))
    self.load.audio('vo_wing', require('../assets/voice/wing.wav'))

    let background = self.add.image(config.width/2, config.height/2, 'bootBg').setOrigin(.5, .5)
    background.setDisplaySize(config.width, config.height)

    let progressBar = self.add.graphics();
    let loadingText = self.make.text({
        x: config.width / 2,
        y: config.height * 0.89,
        text: '連接中',
        style: {
            font: '25px monospace',
            fill: '#fff'
        }
    })
    loadingText.setOrigin(0.5, 0.5)

    self.load.on('progress', function (value) {
      progressBar.clear()
      progressBar.fillStyle(0xFC8EFA, 1)
      progressBar.fillRect(config.width * 0.118, config.height * 0.92, (config.width * 0.778) * value, 10);
    })

    self.load.on('complete', function () {
      loadingText.setText('連接完成')
      self.ready()
    }.bind(self))

  }

  ready () {
    this.scene.start('Game');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Tutor');
    }
  }

}