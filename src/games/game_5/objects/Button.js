import Phaser from 'phaser'

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key, targetScene, target) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;


    this.button = this.scene.add.sprite(0, 0, key).setInteractive();

    this.add(this.button);

    this.button.on('pointerdown', function () {
      this.button.setFrame(1)
      if(targetScene){
        setTimeout(() => {
          if(target == 'self'){
            this.scene.scene.start(targetScene);
          }else{
            window.location.href = targetScene;
          }
        }, 500);
      }
    }.bind(this));

    // this.button.on('pointerover', function () {
    // }.bind(this));

    this.button.on('pointerout', function () {
      this.button.setFrame(0);
    }.bind(this));

    this.scene.add.existing(this);
  }
}