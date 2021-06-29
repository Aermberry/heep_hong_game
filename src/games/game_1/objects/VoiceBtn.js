import Phaser from 'phaser'

export default class VocieBtn extends Phaser.GameObjects.Container {

  constructor(scene, x, y) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.state = 'pause';

    this.background = scene.add.image(0, 0, 'sndBg')
    this.sprite =  scene.add.sprite(130, 0, 'plyBtn')


    this.add(this.background);
    this.add(this.sprite);
    this.scene.add.existing(this);

    this.sprite.setInteractive({
        useHandCursor: true
    })
    .on('pointerout', this.out.bind(this))
    .on('pointerdown', this.down.bind(this));

  }


  out(){
    this.sprite.setFrame(0)
  }

  down(){
    this.sprite.setFrame(1)
  }

}