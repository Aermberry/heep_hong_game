import Phaser from 'phaser'

export default class QuestionBase extends Phaser.GameObjects.Container {

  constructor(scene, x, y) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.background = scene.add.image(0, 0, 'pnlBg')
   // this.sprite =  scene.add.sprite(130, 0, 'plyBtn')


    this.add(this.background);
   // this.add(this.sprite);
    this.scene.add.existing(this);

  }

}