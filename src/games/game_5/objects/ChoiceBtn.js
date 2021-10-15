import Phaser from 'phaser'

export default class ChoiceBtn extends Phaser.GameObjects.Container {
  constructor(scene,x,y,item, onClickCallback, onEnableCallback){
    super(scene, x, y);
    this.scene = scene;
    this.item = item;
    this.selected = false;
    this.onClickCallback = onClickCallback;
    this.onEnableCallback = onEnableCallback;

    let self = this;

    self.bg = self.scene.add.graphics();
    self.bg.fillStyle(0xffffff, 1);
    self.bg.fillRoundedRect(-100, -100, 190, 190, 16);
    self.image  = self.scene.add.image(0, 0, self.item.name);

    self.add(self.bg);
    self.add(self.image);

    self.image.setInteractive({
      useHandCursor: true
    })
    .on('pointerdown', self.down.bind(this));

  }

  down(){
    let self = this;

    let enable = self.onEnableCallback();

    if(!self.selected){
      if(enable){
        self.selected = true;
        self.bg.clear().fillStyle(0x0080FF, 1).fillRoundedRect(-100, -100, 190, 190, 16);
        self.playVo();
      }
    }else{
      self.selected = false;
      self.bg.clear().fillStyle(0xffffff, 1).fillRoundedRect(-100, -100, 190, 190, 16);
    }

    self.onClickCallback(self);
  }

  playVo(){
    let self = this;
    let vo = self.scene.sound.add(self.item.name)
    vo.play();
  }

}