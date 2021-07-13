import Phaser from 'phaser'

export default class ChoiceBtn extends Phaser.GameObjects.Container {
  constructor(scene,x,y,name, onClickCallback){
    super(scene, x, y);
    this.scene = scene;
    this.name = name;
    this.selected = false;
    this.disable = false;
    this.onClickCallback = onClickCallback;

    let self = this;

    self.bg = self.scene.add.graphics();
    self.bg.fillStyle(0xffffff, 1);
    self.bg.fillRoundedRect(-100, -100, 190, 190, 16);
    self.sprite  = self.scene.add.sprite(0, 0, self.name);

    self.add(self.bg);
    self.add(self.sprite);

    self.sprite.setInteractive({
      useHandCursor: true
    })
    .on('pointerdown', self.down.bind(this));

  }


  // onClick(){
  //   let self = this;
  //   if(!self.selected){
  //     self.selected = true;
  //     self.bg.clear().fillStyle(0x0080FF, 1).fillRoundedRect(-100, -100, 190, 190, 16);

  //   }else{
  //     self.selected = false;
  //     self.bg.clear().fillStyle(0xffffff, 1).fillRoundedRect(-100, -100, 190, 190, 16);
  //   }

  //   self.onClickCallback(self);
  // }

  down(){
    let self = this;

    let result = self.onClickCallback(self);

    if(result){
      if(!self.selected){
        self.selected = true;
        self.bg.clear().fillStyle(0x0080FF, 1).fillRoundedRect(-100, -100, 190, 190, 16);

      }else{
        self.selected = false;
        self.bg.clear().fillStyle(0xffffff, 1).fillRoundedRect(-100, -100, 190, 190, 16);
      }
    }
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