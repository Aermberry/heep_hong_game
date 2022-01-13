// import { Scene } from 'phaser';
import BasicScene from './BasicScene';
import _ from 'lodash';
import config from '../config/Config';
import ExitBtn from '../objects/ExitBtn';
import QuestionBase from '../objects/QuestionBase';
import VoiceBtn from '../objects/VoiceBtn';
import Tray from '../objects/Tray';
import VipAlertBoard from '../objects/VipAlertBoard';

import Choice from '../assets/json/choice.json';
import Question from '../assets/json/question.json';

export default class GameScene extends BasicScene {
  constructor () {
    super('Game');
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
    let self = this

    this.buildBg('bootBg')

    // let stageBg = self.add.image(config.width/2, config.height/2, 'stageBg').setOrigin(.5, .5)
    // stageBg.setDisplaySize(config.width, config.height)

    // this.blueScreenLogo = self.add.image(config.width * 0.325, config.height * 0.5, 'bluescreenLogo').setOrigin(.5, .5)

    //if (self.model.musicOn === true && self.model.bgMusicPlaying === false) {
      self.bgMusic = self.sound.add('bgMusic', { volume: 0.2, loop: true });
      self.bgMusic.play();
      self.model.bgMusicPlaying = true;
      self.sys.game.globals.bgMusic = self.bgMusic;
    //}

    let imageFiles = {
      'l2Tut0': require('../assets/lv2_tut_0.png'),
      'l2Tut1': require('../assets/lv2_tut_1.png'),
      'l2Tut2': require('../assets/lv2_tut_2.png'),
      'l2Tut3': require('../assets/lv2_tut_3.png'),
      'l2Tut4': require('../assets/lv2_tut_4.png'),
      'finger': require('../assets/finger.png')
    } 

    let soundFiles = {
      'i_want': require('../assets/voice/g001_00.mp3'),
    }

    
    // self.load.audio('i_want', require('../assets/voice/g001_00.mp3'));

    

    _.forEach(Choice, function(item) {
      
      soundFiles[item.name] = require('../assets/voice/' + item.voice);
      imageFiles[item.name] = require('../assets/' + item.image);
      // self.load.image(item.name, require('../assets/'+item.image));
      // self.load.audio(item.name, require('../assets/voice/'+item.voice));
    })

    self.load.atlas('wave',require('../assets/wave.png'), require('../assets/wave.json'));


    this.preloadFromArr({
      img: imageFiles, sound: soundFiles
    })

    self.anims.create({
      key: 'char_bg',
      frames: self.anims.generateFrameNames('char_bg', {
        prefix: 'char_bg',
        start: 0,
        end: 19,
        zeroPad: 4
      }),
      repeat: -1,
      duration: 2000
    });

    self.anims.create({
      key: 'chip_in',
      frames: self.anims.generateFrameNames('chipin', {
        prefix: 'chipin',
        start: 0,
        end: 8,
        zeroPad: 4,
      }),
      duration: 500
    });

    self.anims.create({
      key: 'char_idle',
      frames: self.anims.generateFrameNames('char', {
        // prefix: 'frame',
        prefix: self.model.character.key,
        start: self.model.character.action.idle[0],
        end: self.model.character.action.idle[1],
        zeroPad: 4
      }),
      repeat: -1,
      repeatDelay: 6000
    });

    self.anims.create({
      key: 'char_happy',
      frames: self.anims.generateFrameNames('char', {
        // prefix: 'frame',
        prefix: self.model.character.key,
        start: self.model.character.action.happy[0],
        end: self.model.character.action.happy[1],
        zeroPad: 4,
      }),
    });

    self.anims.create({
      key: 'char_sad',
      frames: self.anims.generateFrameNames('char', {
        //prefix: 'frame',
        prefix: self.model.character.key,
        start: self.model.character.action.sad[0],
        end: self.model.character.action.sad[1],
        zeroPad: 4
      }),
    });

    this.createProgressBar();

  }

  create () {
    let self = this

    this.bg.destroy()

    this.buildBg('stageBg')

    this.blueScreenLogo = self.add.image(config.width * 0.325, config.height * 0.5, 'bluescreenLogo').setOrigin(.5, .5)


    self.model.level = 1;

    self.char_bg = self.add.sprite(config.width/2 + 564, config.height/2 - 159, 'char_bg');
    self.char_bg.play('char_bg');

    self.char = self.add.sprite(config.width/2 + 564, config.height/2 - 159, 'Char');
    self.char.play('char_idle');

    self.exitBtn = new ExitBtn(this, 120, 135);
    self.add.image(115, 175, 'ltpBg').setDepth(2);
    self.exitBtn.setDepth(3)
    self.add.existing(self.exitBtn);


    self.new();

    self.l2AlertBoard = new VipAlertBoard(this, config.width * 0.325, config.height * 0.4);
    self.l2AlertBoard.setScale(1.2)

  }

  newQuestion(){
    let self = this

    self.choice = []

    if(self.model.level == 1){
      self.question = this.stageRepeat ? self.question : self.questionPool["level1"][_.random(self.questionPool["level1"].length -1)];
      self.choice = self.choicePool;
    }else if(self.model.level == 2){
      self.question = this.stageRepeat ? self.question : self.questionPool["level2"][_.random(self.questionPool["level2"].length -1)];

      let cloneChoiceList = [...self.choicePool]

      cloneChoiceList = _.shuffle(cloneChoiceList)

      var tempChoice = [];

      while(tempChoice.length < (12 - self.model.selectLimit)) {
        const curItem = cloneChoiceList.pop()
        if(self.question.indexOf(curItem.name) === -1) {
          if(self.question.length < self.model.selectLimit) {
            self.question.push(curItem.name)
          }else {
            tempChoice.push(curItem)
          }
        }
      }

      let cloneChoiceList2 = [...self.choicePool]

      while(tempChoice.length < 12) {
        const curItem = cloneChoiceList2.pop()
        if(self.question.indexOf(curItem.name) != -1) tempChoice.push(curItem)
      }
      
      tempChoice = _.shuffle(tempChoice)

      self.choice = tempChoice

    }

      return typeof self.question != 'undefined' ? true : false
  }

  new(){
    let self = this
    if(typeof self.questionBase != 'undefined' && typeof self.questionBase.destroy == 'function'){
      self.questionBase.destroy();
    }
    if(typeof self.voiceBtn != 'undefined' && typeof self.voiceBtn.destroy == 'function'){
      self.voiceBtn.destroy();
    }
    if(typeof self.tray != 'undefined' && typeof self.tray.destroy == 'function'){
      self.tray.destroy();
    }

    if(self.newQuestion()){

      self.questionBase = new QuestionBase(self, -650,  config.height/2, self.submitHandler.bind(this))
      self.add.existing(self.questionBase)
      self.questionBase.init(self.choice, self.model.level, self.model.selectLimit);

      self.voiceBtn = new VoiceBtn(self, config.width -385, config.height -195 ,self.voiceHandler.bind(this), self.voiceStartHandler.bind(this))
      self.add.existing(self.voiceBtn)
      self.voiceBtn.init(self.question);

      self.char.play('chip_in').once("animationcomplete", function(){
        self.char.play('char_idle');
        self.voiceBtn.playVo();
      })

    }else{
      self.new();
    }

    this.freezePlaySound = false;
    self.voiceBtn.setVoiceDisable(false)

  }

  voiceStartHandler() {
    let self = this
    self.questionBase.setBroadDisable(true)
  }

  voiceHandler(){
    let self = this

    self.questionBase.setBroadDisable(false)

    self.questionBase.broadMoveIn()

    // self.tweens.add({
    //   targets: [self.questionBase,self.questionBase],
    //   x: 585,
    //   ease: 'Power0',
    //   duration: 500
    // })

  }

  submitHandler(items){
    let self = this

    this.freezePlaySound = true;
    self.voiceBtn.setVoiceDisable(true)

    let itemsName = _.map(items, 'name');

    // let correct = _.isMatch(self.question, itemsName)

    let correct = false

    if(self.question.length >= 4) {
      correct = !self.question.some((quest, ind)=> {
        return itemsName[ind] !== quest
      })

    }else {
          
      correct = !self.question.some((quest)=> {
        return itemsName.indexOf(quest) === -1
      })

    }

    if(correct){
      self.correct();

      this.stageRepeat = false
        
      self.tray = new Tray(self,config.width/2 + 564, 300);
      self.add.existing(self.tray);
      self.tray.init(itemsName,correct);

      self.model.stage++;

    }else{

      if(!this.stageRepeat) {
        this.stageRepeat = true
      }else {
        this.stageRepeat = false
        self.tray = new Tray(self,config.width/2 + 564, 300);
        self.add.existing(self.tray);
        self.tray.init(itemsName,correct);
  
        self.model.stage++;
      }

      self.wrong();
    }

    self.tweens.add({
      targets: [self.questionBase,self.questionBase],
      x: -600,
      ease: 'Power0',
      duration: 500
    })

  }

  correct(){
    let self = this
    self.char.play('char_happy').once("animationcomplete", function(){
      self.next();
    });
  }

  wrong(){
    let self = this
    self.char.play('char_sad').once("animationcomplete", function(){
      self.next();
    });
  }

  next(){
    let self = this
    setTimeout(async () => {
      if(self.model.level == 3){
        self.end();
      }else{
        
        if(self.model.level == 2 && !self.lv2Start) {
          
          self.blueScreenLogo.setAlpha(0)
          
          self.add.existing(self.l2AlertBoard)
          await self.l2AlertBoard.playBroad()
          self.lv2Start = true
          setTimeout(()=> {
            if(typeof self.l2AlertBoard != 'undefined' && typeof self.l2AlertBoard.destroy == 'function') self.l2AlertBoard.destroy()
            self.blueScreenLogo.setAlpha(1)
            },1000
          )
        }

        self.new();
      }
    }, 2000);
  }

  end(){
    let self = this
    self.scene.start('End');
  }

}
