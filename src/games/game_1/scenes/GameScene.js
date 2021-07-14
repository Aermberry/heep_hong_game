import { Scene } from 'phaser';
import _ from 'lodash';
import config from '../config/Config';
import ExitBtn from '../objects/ExitBtn';
import QuestionBase from '../objects/QuestionBase';
import VoiceBtn from '../objects/VoiceBtn';

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
  }

  preload () {
    let self = this

    let stageBg = self.add.image(config.width/2, config.height/2, 'stageBg').setOrigin(.5, .5)
    stageBg.setDisplaySize(config.width, config.height)


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

  new(){
    let self = this

    if(typeof self.questionBase != 'undefined' && typeof self.questionBase.destroy == 'function'){
      self.questionBase.destroy();
    }
    if(typeof self.voiceBtn != 'undefined' && typeof self.voiceBtn.destroy == 'function'){
      self.voiceBtn.destroy();
    }

    self.questionObj = []

    if(self.model.level == 1){
      self.question = self.questionPool["level1"][_.random(self.questionPool["level1"].length)];
      _.forEach(self.choicePool, function(item){
        if(_.includes(self.question ,item.name)){
          self.questionObj.push(item)
        }
      })
      self.choice = self.choicePool;

    }else if(self.model.level == 2){
      self.question = self.questionPool["level2"][_.random(self.questionPool["level2"].length)];

      self.choice = _.sampleSize(self.choicePool,12);
    }



    console.log(self.question)


    self.questionBase = new QuestionBase(self, -650,  config.height/2, self.submit.bind(this))
    self.add.existing(self.questionBase)
    self.questionBase.init(self.choice, self.model.level, self.model.selectLimit);

    self.voiceBtn = new VoiceBtn(self, config.width -385, config.height -195)
    self.add.existing(self.voiceBtn)
    self.voiceBtn.init(self.questionObj);


     self.char.play('chip_in').on("animationcomplete", function(){
      self.char.play('char_idle');
      self.tweens.add({
        targets: [self.questionBase,self.questionBase],
        x: 585,
        ease: 'Power0',
        duration: 500
      })
     })
  }

  submit(value){
    let self = this

    if(_.isMatch(self.question, value)){
      self.correct();
    }else{
      self.wrong();
    }

    self.model.level = 2

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
      if(self.model.level == 3){
        self.end();
      }else{
        self.new();
      }
    });
  }

  wrong(){
    let self = this
    self.char.play('char_sad').once("animationcomplete", function(){
      if(self.model.level == 3){
        self.end();
      }else{
        self.new();
      }
    });
  }

  end(){
    let self = this
    self.scene.start('End');
  }

}
