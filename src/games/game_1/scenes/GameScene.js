import { Scene } from 'phaser';
import _ from 'lodash';
import config from '../config/Config';
import ExitBtn from '../objects/ExitBtn';
import QuestionBase from '../objects/QuestionBase';
import VoiceBtn from '../objects/VoiceBtn';
import Tray from '../objects/Tray';

import Choice from '../assets/json/choice.json';
import Question from '../assets/json/question.json';

export default class GameScene extends Scene {
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
  }

  preload () {
    let self = this

    let stageBg = self.add.image(config.width/2, config.height/2, 'stageBg').setOrigin(.5, .5)
    stageBg.setDisplaySize(config.width, config.height)

    //if (self.model.musicOn === true && self.model.bgMusicPlaying === false) {
      self.bgMusic = self.sound.add('bgMusic', { volume: 0.2, loop: true });
      self.bgMusic.play();
      self.model.bgMusicPlaying = true;
      self.sys.game.globals.bgMusic = self.bgMusic;
    //}



    self.anims.create({
      key: 'char_bg',
      frames: self.anims.generateFrameNames('char_bg', {
        prefix: 'frame',
        start: 0,
        end: 49
      }),
      repeat: -1
    });

    self.anims.create({
      key: 'chip_in',
      frames: self.anims.generateFrameNames('chipin', {
        prefix: 'frame',
        start: 0,
        end: 20
      }),
    });

    self.anims.create({
      key: 'char_idle',
      frames: self.anims.generateFrameNames('char', {
        prefix: 'frame',
        start: self.model.character.action.idle[0],
        end: self.model.character.action.idle[1]
      }),
      repeat: -1
    });

    self.anims.create({
      key: 'char_happy',
      frames: self.anims.generateFrameNames('char', {
        prefix: 'frame',
        start: self.model.character.action.happy[0],
        end: self.model.character.action.happy[1]
      }),
    });

    self.anims.create({
      key: 'char_sad',
      frames: self.anims.generateFrameNames('char', {
        prefix: 'frame',
        start: self.model.character.action.sad[0],
        end: self.model.character.action.sad[1]
      }),
    });

  }

  create () {
    let self = this

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

    console.log(self.question)


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
  console.log('stop game freeze')
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

    let correct = !self.question.some((quest)=> {
      return itemsName.indexOf(quest) === -1
    })

    if(correct){
      self.correct();
        
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
    setTimeout(() => {
      if(self.model.level == 3){
        self.end();
      }else{
        self.new();
      }
    }, 2000);
  }

  end(){
    let self = this
    self.scene.start('End');
  }

}
