// import { Scene } from 'phaser';
import BasicScene from './BasicScene';
//import _ from 'lodash';

import Choice from '../assets/json/choice.json';
import Question from '../assets/json/question.json';

export default class GameScene extends BasicScene {
  constructor() {
      super({
          key: 'Game'
      });

  }

  init(){
    this.model = this.sys.game.globals.model;
    this.choicePool = Choice;
    this.questionPool = Question;
    this.question = [];
    this.stageRepeat = false;
    this.freezePlaySound = false;
    this.freezeSelectItem = false;
    this.lv2Start = false;

  }

  preload () {
    // let self = this

    this.buildBg('bootBg')

    // this.bgMusic = this.sound.add('bgMusic', { volume: 0.2, loop: true });
    // this.model.bgMusicPlaying = true;
    // this.sys.game.globals.bgMusic = this.bgMusic;

    let gameMusic = this.sound.add('bgMusic')
    gameMusic.setLoop(true)
    this.model.bgMusicPlaying = true

    // let imageFiles = {
    //   'l2Tut0': require('../assets/lv2_tut_0.png'),
    //   'l2Tut1': require('../assets/lv2_tut_1.png'),
    //   'l2Tut2': require('../assets/lv2_tut_2.png'),
    //   'l2Tut3': require('../assets/lv2_tut_3.png'),
    //   'l2Tut4': require('../assets/lv2_tut_4.png'),
    //   'finger': require('../assets/finger.png')
    // }

    // let soundFiles = {
    //   'i_want': require('../assets/voice/g001_00.mp3'),
    //   'correct1': require('../assets/voice/Scifi_pipe_transition.mp3'),
    //   'correct2': require('../assets/voice/child_only_clap.mp3'),
    //   'wrong': require('../assets/voice/Tray_drop.mp3'),
    // }


    // // self.load.audio('i_want', require('../assets/voice/g001_00.mp3'));



    // _.forEach(Choice, function(item) {

    //   soundFiles[item.name] = require('../assets/voice/' + item.voice);
    //   imageFiles[item.name] = require('../assets/' + item.image);
    //   // self.load.image(item.name, require('../assets/'+item.image));
    //   // self.load.audio(item.name, require('../assets/voice/'+item.voice));
    // })

    // self.load.atlas('wave',require('../assets/wave.png'), require('../assets/wave.json'));


    // this.preloadFromArr({
    //   img: imageFiles, sound: soundFiles
    // })

    // self.anims.create({
    //   key: 'char_bg',
    //   frames: self.anims.generateFrameNames('char_bg', {
    //     prefix: 'char_bg',
    //     start: 0,
    //     end: 19,
    //     zeroPad: 4
    //   }),
    //   repeat: -1,
    //   duration: 2000
    // });

    // self.anims.create({
    //   key: 'chip_in',
    //   frames: self.anims.generateFrameNames('chipin', {
    //     prefix: 'chipin',
    //     start: 0,
    //     end: 8,
    //     zeroPad: 4,
    //   }),
    //   duration: 500
    // });

    // self.anims.create({
    //   key: 'char_idle',
    //   frames: self.anims.generateFrameNames('char', {
    //     // prefix: 'frame',
    //     prefix: self.model.character.key,
    //     start: self.model.character.action.idle[0],
    //     end: self.model.character.action.idle[1],
    //     zeroPad: 4
    //   }),
    //   repeat: -1,
    //   repeatDelay: 6000
    // });

    // self.anims.create({
    //   key: 'char_happy',
    //   frames: self.anims.generateFrameNames('char', {
    //     // prefix: 'frame',
    //     prefix: self.model.character.key,
    //     start: self.model.character.action.happy[0],
    //     end: self.model.character.action.happy[1],
    //     zeroPad: 4,
    //   }),
    // });

    // self.anims.create({
    //   key: 'char_sad',
    //   frames: self.anims.generateFrameNames('char', {
    //     //prefix: 'frame',
    //     prefix: self.model.character.key,
    //     start: self.model.character.action.sad[0],
    //     end: self.model.character.action.sad[1],
    //     zeroPad: 4
    //   }),
    // });

    this.createProgressBar();

  }

  create () {

    this.sys.game.globals.gtag.event('game_1_start', { 'event_category': 'js_games', 'event_label': 'Game Start' })

    this.bg.destroy()

    this.buildBg('stageBg')

    this.sound.stopAll()

    if (this.model.bgMusicPlaying){
        this.sound.play('bgMusic')
    }
  }

  musicPause() {
    let self = this
    if (self.model.bgMusicPlaying){
      self.sound.stopByKey('bgMusic')
      self.model.bgMusicPlaying = false
    } else {
      self.sound.play('bgMusic')
      self.model.bgMusicPlaying = true
    }

  }

}
