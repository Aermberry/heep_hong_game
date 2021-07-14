import Phaser from 'phaser';
import _ from 'lodash';

export default class VocieBtn extends Phaser.GameObjects.Container {

  constructor(scene, x, y) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.play = false;
    this.vo = [];
    this.voIndex = 0;
    this.voTotal = 0;


  }

  init(question){
    let self = this;
    this.question = question;
    self.create();
  }

  create(){
    let self = this;
    self.background = self.scene.add.image(0, 0, 'sndBg')
    self.sprite =  self.scene.add.sprite(130, 0, 'plyBtn')


    _.forEach(self.question, function(item){
      self.vo.push(self.scene.sound.add(item))
    })

    self.voTotal = self.vo.length



    self.scene.anims.create({
      key: 'wave',
      frames: self.scene.anims.generateFrameNames('wave', { prefix: 'frame', start: 0, end: 229 }),
      repeat: -1
    });

    self.wave = self.scene.add.sprite(-95, 0, 'Wave')

    self.add(self.background);
    self.add(self.sprite);
    self.add(self.wave);
    self.wave.play('wave');


    self.sprite.setInteractive({
        useHandCursor: true
    })
    .on('pointerout', self.out.bind(this))
    .on('pointerdown', self.down.bind(this));
  }

  out(){
    this.sprite.setFrame(0)
  }

  down(){
    let self = this
    self.sprite.setFrame(1);
    if(!this.play){
      self.sprite.setTexture('pusBtn');
      self.playVo();
    }
  }

  playVo(){
    let self = this
    if(self.vo[self.voIndex]){
      self.vo[self.voIndex].play();
      self.vo[self.voIndex].on('complete', function(){
        if(self.voIndex < self.voTotal){
          self.voIndex++;
        }
        self.playVo();
      });
    }else{
      self.stopVo();
    }
  }

  stopVo(){

  }


}