import Phaser from 'phaser';
import _ from 'lodash';

export default class VocieBtn extends Phaser.GameObjects.Container {

  constructor(scene, x, y, callback, voiceStartCallback) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.callback = callback;
    this.voiceStartCallback = voiceStartCallback;
    this.disableVoice = false


  }

  init(question){
    let self = this;
    self.play = false;
    self.playTime = 0;
    self.vo = [];
    self.voIndex = 0;
    self.voTotal = 0;
    self.question = question;
    self.create();
  }

  create(){
    let self = this;
    self.background = self.scene.add.image(0, 0, 'sndBg');
    self.sprite =  self.scene.add.sprite(130, 0, 'plyBtn');

    self.vo.push(self.scene.sound.add('i_want'));

    _.forEach(self.question, function(item){
      self.vo.push(self.scene.sound.add(item));
    })
    self.voTotal = self.vo.length;




    self.scene.anims.create({
      key: 'wave',
      frames: self.scene.anims.generateFrameNames('wave', { prefix: 'waveform_gif', start: 0, end: 41, zeroPad: 4 }),
      repeat: -1
    });

    self.wave = self.scene.add.sprite(-85, 0, 'Wave')
    self.wave.setScale(0.4);

    self.add(self.background);
    self.add(self.sprite);

    self.add(self.wave);
    self.wave.visible = false;


    self.sprite.setInteractive({
        useHandCursor: true
    })
    .on('pointerout', self.out.bind(this))
    .on('pointerdown', self.down.bind(this));
  }

  out(){
    if(this.disableVoice) return;
    let self = this;
    self.sprite.setFrame(0);
  }

  down(){
    if(this.disableVoice) return;
    let self = this;
    self.sprite.setFrame(1);
    setTimeout(function(){
      if(!self.play){
        self.playVo();
      }else{
        self.stopVo();
      }
    }, 500);
  }

  playVo(){
    let self = this;
    if(typeof this.voiceStartCallback === 'function') this.voiceStartCallback()
    self.play = true;
    self.sprite.setTexture('pusBtn');
    self.wave.play('wave');
    self.wave.visible = true;
    self.loopVo();

  }

  loopVo(){
    let self = this

    if(self.vo[self.voIndex] && self.play){
      self.vo[self.voIndex].play();
      self.vo[self.voIndex].once('complete', function(){
        if(self.voIndex <= self.voTotal){
          self.voIndex++;
          self.loopVo();
        }
      });
    }else{
      self.stopVo();
    }
  }

  stopVo(){
    let self = this;
    self.play = false;
    self.sprite.setTexture('plyBtn');
    self.wave.stop();
    self.wave.visible = false;
    self.voIndex= 0;
    self.playTime++;
    self.callback()

  }

  setVoiceDisable(disable) {
    return this.disableVoice = disable
  }



}