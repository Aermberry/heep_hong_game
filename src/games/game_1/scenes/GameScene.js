import { Scene } from 'phaser';
import _ from 'lodash';
import config from '../config/Config';
//import Button from '../objects/Button';
import ExitBtn from '../objects/ExitBtn';
import QuestionBase from '../objects/QuestionBase';
import VoiceBtn from '../objects/VoiceBtn';

import Choice from '../assets/json/choice.json'

export default class GameScene extends Scene {
  constructor () {
    super('Game');
  }

  init(){
    this.model = this.sys.game.globals.model;
    this.choice = Choice;
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

    self.add.sprite(config.width/2 + 564, config.height/2 - 159, 'char_bg')

    self.char = self.add.sprite(config.width/2 + 564, config.height/2 - 159, 'Char')

    self.new();

    self.exitBtn = new ExitBtn(this, 120, 135)
    self.add.image(115, 175, 'ltpBg')
    self.add.existing(self.exitBtn)

  }

  new(){
    let self = this

    let Answer = []

    if(self.model.level < 2){
      Answer[0] = _.sample(_.filter(self.choice, { 'type': 1 }))
      Answer[1] = _.sample(_.filter(self.choice, { 'type': 2 }))
      Answer[2] = _.sample(_.filter(self.choice, { 'type': 3 }))
    }else{
     Answer = _.sampleSize(self.choice, 3)
    }

    self.questionBase = new QuestionBase(self, -650,  config.height/2, self.model.level, self.choice, Answer);
    self.add.existing(self.questionBase)

    self.voiceBtn = new VoiceBtn(self, config.width -385, config.height -195,Answer)
    self.add.existing(self.voiceBtn)

    self.char.play('chip_in').on("animationcomplete", function(){
      self.char.play('char_idle');
      self.tweens.add({
        targets: [self.questionBase,self.questionBase],
        x: 585,
        ease: 'Power0',
        duration: 500
      })
    });

  }

  correct(){
    let self = this
    self.char.play('char_happy').on("animationcomplete", function(){
      self.new();
    });
  }

  wrong(){
    let self = this
    self.char.play('char_sad').on("animationcomplete", function(){
      self.new();
    });
  }




}
