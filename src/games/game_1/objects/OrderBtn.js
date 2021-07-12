import Phaser from 'phaser'

export default class OrderBtn extends Phaser.GameObjects.Container {
  constructor(scene,x,y){
    super(scene, x, y);

    this.sprite =  scene.add.sprite(0, 0, 'cfmBtn');
    this.add(this.sprite);


    if(!this.active){
      this.sprite.setInteractive({
        useHandCursor: true
      })
      .on('pointerout', this.out.bind(this))
      .on('pointerdown', this.down.bind(this));
    }else{
      this.sprite.setFrame(2);
    }


  }

  out(){
    this.sprite.setFrame(0);
  }

  down(){
    this.sprite.setFrame(1);
    console.log("click");
  }
}