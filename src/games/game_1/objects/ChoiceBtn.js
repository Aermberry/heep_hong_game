import Phaser from 'phaser'

export default class ChoiceBtn extends Phaser.GameObjects.Container {
  constructor(scene,x,y,name){
    super(scene, x, y);
    this.scene = scene;
    this.name = name;


    this.bg = this.scene.add.graphics();
    this.bg.fillStyle(0xffffff, 1);


    this.bg.fillRoundedRect(-90, -90, 180, 180, 16);

    this.sprite  = this.scene.add.sprite(0, 0, this.name);
    this.add(this.bg);
    this.add(this.sprite);

    this.sprite.setInteractive({
      useHandCursor: true
    })
    .on('pointerdown', this.down.bind(this));

  }
  down(){
    console.log("click item");
    this.bg.fillStyle(0x0080ff,1);
  }

}