import Phaser from 'phaser'

export default class VocieBtn extends Phaser.GameObjects.Container {

  constructor(scene, x, y) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.play = false;

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

    console.log(self.question);


    self.scene.anims.create({
      key: 'wave',
      frames: self.scene.anims.generateFrameNames('wave', { prefix: 'frame', start: 0, end: 229 }),
      repeat: -1
    });

    self.wave = self.scene.add.sprite(-95, 0, 'Wave')

    self.vo1 = self.scene.sound.add('egg');

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
    self.sprite.setTexture('pusBtn');
    self.vo1.play();
  }

}