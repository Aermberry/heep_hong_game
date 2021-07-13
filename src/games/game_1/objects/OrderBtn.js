import Phaser from 'phaser'

export default class OrderBtn extends Phaser.GameObjects.Container {
  constructor(scene,x,y, onClickCallback){
    super(scene, x, y);
    this.onClickCallback = onClickCallback;
    this.disable = true;
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
  }

  update(){
    let self = this
    self.sprite.setInteractive({
      useHandCursor: true
    })
    .on('pointerout', self.out.bind(this))
    .on('pointerdown', self.down.bind(this));
  }

  out(){
    let self = this;
    self.sprite.setFrame(0);
  }

  down(){
    let self = this;
    self.sprite.setFrame(1);
    self.onClickCallback(self);
  }

  setDisable(){
    let self = this;
    self.disable = true
  }
  setEnable(){
    let self = this;
    self.disable = false
  }
}