import Phaser from 'phaser'

export default class QuestionBase extends Phaser.GameObjects.Container {

  constructor(scene, x, y) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.background = scene.add.image(0, 0, 'pnlBg');
    this.levelBg = scene.add.image(100, -145, 'ph1Bg');
    this.confirmBtn = scene.add.sprite(135, 355, 'cfmBtn');


    this.add(this.background);
    this.add(this.levelBg);
    this.add(this.confirmBtn);
    this.confirmBtn.setInteractive({
        useHandCursor: true
    })
    .on('pointerout', this.out.bind(this))
    .on('pointerdown', this.down.bind(this));


    this.scene.add.existing(this);

  }

  out(){
    this.confirmBtn.setFrame(0);
  }

  down(){
    this.confirmBtn.setFrame(1);
  }

  confirm(){
    this.confirmBtn.setFrame(2);
  }

  destroy(){
    console.log('destroy');
  }

}