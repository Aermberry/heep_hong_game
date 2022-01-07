import Phaser from 'phaser'

export default class ChoiceBtn extends Phaser.GameObjects.Container {
  constructor(scene,x,y,item, onClickCallback, onEnableCallback, onStallCallback, getGameIndex){
    super(scene, x, y);
    this.scene = scene;
    this.item = item;
    this.selected = false;
    this.onClickCallback = onClickCallback;
    this.onEnableCallback = onEnableCallback;
    this.onStallCallback = onStallCallback;
    this.getGameIndex = getGameIndex

    let self = this;

    self.bg = self.scene.add.graphics();
    self.bg.fillStyle(0xffffff, 1);
    self.bg.fillRoundedRect(-100, -100, 190, 190, 16);
    self.image  = self.scene.add.image(0, 0, self.item.name);

    self.countNumBlock = self.scene.add.graphics();
    self.countNumBlock.setAlpha(0)
    self.countNumBlock.fillStyle(0x000000, 1)
    self.countNumBlock.fillRoundedRect(40, 40, 50, 50, 0)
    
    self.countNum = self.scene.add.text(58, 50, '', {
      align: 'center',
      fontSize: '30px',
      color: '#FFFFFF',
      // fontFamily: 'serif',
      fontFamily: 'monospace',
      // fontFamily: "cursive"
    })
    self.countNum.setAlpha(0)

    self.add(self.bg);
    self.add(self.image);
    
    self.add(self.countNumBlock)
    self.add(self.countNum)

    self.image.setInteractive({
      useHandCursor: true
    })
    .on('pointerdown', self.down.bind(this));

  }

  down(){
    let self = this;


    let stall = self.onStallCallback();
    if(stall) return;

    let enable = self.onEnableCallback(); 

    if(!self.selected){
      if(enable){

        self.selected = true;
        self.bg.clear().fillStyle(0x0080FF, 1).fillRoundedRect(-100, -100, 190, 190, 16);
        
        if(typeof this.getGameIndex === 'function') {
          const ind = this.getGameIndex()
          if(ind !== -1) {
            self.countNumBlock.setAlpha(1)
            self.countNum.setAlpha(1)
            self.countNum.setText(ind)
          }

        }

        self.playVo();
      }
    }else{
      self.selected = false;
      self.bg.clear().fillStyle(0xffffff, 1).fillRoundedRect(-100, -100, 190, 190, 16);
      self.countNumBlock.setAlpha(0)
      self.countNum.setAlpha(0)
    }

    self.onClickCallback(self)
  }

  updateIndex() {
    let self = this
    if(typeof this.getGameIndex === 'function') {
      const ind = this.getGameIndex(this.item.name)
      if(ind > 0) {
        self.countNumBlock.setAlpha(1)
        self.countNum.setAlpha(1)
        self.countNum.setText(ind)
      }

    }
  }

  playVo(){
    let self = this;
    let vo = self.scene.sound.add(self.item.name)
    vo.play();
  }

}