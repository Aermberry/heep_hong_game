import Phaser from 'phaser'

export default class BasicButton extends Phaser.GameObjects.Container {

  constructor(scene, x, y) {

    super(scene, x, y)

    scene.add.existing(this);
    this.origSprite = undefined;
  }

  create(sprite, clickEvent) {
    this.origSprite = sprite;
    this.add(this.origSprite)
    this.origSprite.setInteractive({
      useHandCursor: true
    })
      .on('pointerout', this.out.bind(this))
      .on('pointerdown', this.down.bind(this, clickEvent))
  }

  out() {
    this.origSprite.setFrame(0)
  }

  down(clickEvent) {
    this.origSprite.setFrame(1)
    if (typeof clickEvent == 'function') {
      setTimeout(() => {
        clickEvent()
      }, 500)
    }
  }

}