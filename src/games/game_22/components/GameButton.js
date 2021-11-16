import Phaser from 'phaser'

export default class GameButton extends Phaser.GameObjects.Container {

  constructor(scene, x, y, texture, step, gameController) {

    super(scene, x, y);

    this.step = step
    this.texture = scene.add.sprite(0, 0, texture);

    this.add(this.texture);
    this.setSize(this.texture.width, this.texture.height);

    scene.add.existing(this);
    console.log(gameController);
    this.setInteractive({ useHandCursor: true }).on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
        console.log("down")
        this.texture.setFrame(1);
        gameController.y += 100
      }
    )
      // .on(
      //   Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
      //     console.log("up")
      //     this.texture.setFrame(0);
      //   }
      // )
  }
}