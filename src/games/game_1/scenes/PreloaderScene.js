import { Scene } from 'phaser'

import tutorBg from '../assets/tutor.png'
import gameBg from '../assets/bg_pnl.png'
import refBg from '../assets/ref.png'
import endBg from '../assets/bg_end.png'

import soundBg from '../assets/snd.gif'

import extBtn from '../assets/btn_ext.png'
//import extSmBtn from '../assets/btn_ext_1.png'
import rplBtn from '../assets/btn_rpl.png'
import strBtn from '../assets/btn_str.png'
import cfmBtn from '../assets/btn_cfm_on.png'
//import plyBtn from '../assets/btn_ply.png'
// import pusBtn from '../assets/btn_pus.png'

import i_apl from '../assets/i_apl.png'
import i_bgr from '../assets/i_bgr.png'
import i_bnn from '../assets/i_bnn.png'
import i_egg from '../assets/i_egg.png'
import i_fri from '../assets/i_fri.png'
import i_fsh from '../assets/i_fsh.png'
import i_ice from '../assets/i_ice.png'
import i_it from '../assets/i_it.png'
import i_ndl from '../assets/i_ndl.png'
import i_oj from '../assets/i_oj.png'
import i_ric from '../assets/i_ric.png'
import i_veg from '../assets/i_veg.png'
import i_wng from '../assets/i_wng.png'
//import i_wtr from '../assets/i_wtr.png'

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
    this.load.image('tutorBg', tutorBg)
    this.load.image('gameBg', gameBg)
    this.load.image('refBg', refBg)
    this.load.image('endBg', endBg)

    this.load.image(tutorBg)
    this.load.image(gameBg)
    this.load.image(endBg)
    this.load.image(soundBg)
    this.load.image(refBg)


    this.load.image(extBtn)
    //this.load.image(extSmBtn)
     this.load.image(rplBtn)
     this.load.image(strBtn)
     this.load.image(cfmBtn)
    //this.load.image(plyBtn)
    //this.load.image(pusBtn)

    this.load.image(i_apl)
    this.load.image(i_bgr)
    this.load.image(i_bnn)
    this.load.image(i_egg)
    this.load.image(i_fri)
    this.load.image(i_fsh)
    this.load.image(i_ice)
    this.load.image(i_it)
    this.load.image(i_ndl)
    this.load.image(i_oj)
    this.load.image(i_ric)
    this.load.image(i_veg)
    this.load.image(i_wng)
    //this.load.image(i_wtr)

    this.load.audio('thud', [thudMp3, thudOgg])

    let world = {
      width: this.cameras.main.width,
      height: this.cameras.main.height,
      centerX: this.cameras.main.centerX,
      centerY: this.cameras.main.centerY
    }

    let background = this.add.image(world.width/2, world.height/2, 'bootBg').setOrigin(.5, .5)
    background.setDisplaySize(world.width, world.height)

    let progressBar = this.add.graphics();
    let loadingText = this.make.text({
        x: world.width / 2,
        y: world.height * 0.89,
        text: '連接中',
        style: {
            font: '25px monospace',
            fill: '#fff'
        }
    })
    loadingText.setOrigin(0.5, 0.5)

    this.load.on('progress', function (value) {
      progressBar.clear()
      progressBar.fillStyle(0xFC8EFA, 1)
      progressBar.fillRect(world.width * 0.118, world.height * 0.92, (world.width * 0.778) * value, 10);
    })

    this.load.on('complete', function () {
      this.time.delayedCall(3000, this.ready, [], this);
    }.bind(this))

  }

  ready () {
    this.scene.start('Title');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }

}