import Phaser from 'phaser'

export default class OrderBtn extends Phaser.GameObjects.Container {
  constructor(scene,x,y,onClickCallback){
    super(scene, x, y);
    this.enable = false;
    this.onClickCallback = onClickCallback;
  }

  init(){
    let self = this;
    self.create();
  }

  create(){
    let self = this;
    self.sprite =  self.scene.add.sprite(0, 0, 'cfmBtn');
    self.add(self.sprite);
    self.sprite.setFrame(2);
    self.sprite.setInteractive({
      useHandCursor: true
    })
    .on('pointerout', self.out.bind(this))
    .on('pointerdown', self.down.bind(this));
  }

  setEnable(){
    let self = this;
    self.enable = true;
    self.sprite.setFrame(0);
  }

  setDisable(){
    let self = this;
    self.enable = false;
    self.sprite.setFrame(2);

  }

  out(){
    let self = this;
    if(self.enable){
      self.sprite.setFrame(0);
    }
  }

  down(){
    let self = this;
    if(self.enable){
      self.sprite.setFrame(1);
      self.onClickCallback();
    }
  }


}