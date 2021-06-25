import { Scene } from 'phaser'
import config from '../config/Config';

import tutorBg from '../assets/tutor.png'
import gameBg from '../assets/bg_pnl.png'
import refBg from '../assets/ref.png'



import endBg from '../assets/bg_end.png'
import endBoxBg from '../assets/end_box.png'
import endPicBg from '../assets/end_pic1.png'

import sudBg from '../assets/bg_snd.png'
import sndBtn from '../assets/btn_ply.png'
import sndOnBtn from '../assets/btn_pus.png'


import ph1Bg from '../assets/bg_ph1.png'
import ph2Bg from '../assets/bg_ph2.png'

import pnlBg from '../assets/bg_pnl.png'
import ltpBg from '../assets/bg_ltp.png'
import stageBg from '../assets/bg_stage.png'


import rplBtn from '../assets/btn_rpl.png'
import extSmBtn from '../assets/btn_ext_1.png'
import extBtn from '../assets/btn_ext.png'
import strBtn from '../assets/btn_str.png'
import strOnBtn from '../assets/btn_str.png'


import thudMp3 from '../assets/thud.mp3'
import thudOgg from '../assets/thud.ogg'

export default class PreloaderScene extends Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }

  preload () {
    let self = this

    self.load.image('tutorBg', tutorBg)
    self.load.image('gameBg', gameBg)
    self.load.image('refBg', refBg)

    self.load.image('extSmBtn', extSmBtn)
    self.load.image('strBtn', strBtn)
    self.load.image('strOnBtn', strOnBtn)

    self.load.image('sndBg', sudBg)
    self.load.image('sndBtn', sndBtn)
    self.load.image('sndOnBtn', sndOnBtn)

    self.load.image('ph1Bg', ph1Bg)
    self.load.image('ph2Bg', ph2Bg)
    self.load.image('ltpBg', ltpBg)
    self.load.image('pnlBg', pnlBg)
    self.load.image('stageBg', stageBg)

    self.load.image('rplBtn', rplBtn)
    self.load.image('extBtn', extBtn)
    self.load.image('endBg', endBg)
    self.load.image('endBoxBg', endBoxBg)
    self.load.image('endPicBg', endPicBg)


    self.load.audio('thud', [thudMp3, thudOgg])

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
      self.time.delayedCall(3000, self.ready, [], self)
    }.bind(self))

  }

  ready () {
    this.scene.start('Tutor');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Tutor');
    }
  }

}