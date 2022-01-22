import Phaser from 'phaser'

export default class BasicCarBtn extends Phaser.GameObjects.Container {



  constructor(scene, x, y, children) {
    super(scene, x, y, children)
    this.origSprite = null;
    this.isBtn = false;
  }

  create(sprite, clickEvent) {
    this.origSprite = sprite;
    this.add(this.origSprite)
    this.origSprite.setInteractive({
      useHandCursor: true
    })
      // .on('pointerout', this.out.bind(this))
      .on('pointerdown', this.down.bind(this, clickEvent));
  }
  out() {
    this.origSprite.setFrame(0)
  }

  down(clickEvent) {
    if(this.isBtn) {
      let Button = this.scene.sound.add('Button')
      Button.setLoop(false)
      Button.play()
      this.isBtn = false;
      this.origSprite.setFrame(2)
      if (typeof clickEvent == 'function') {
        setTimeout(() => {
          clickEvent()
        }, 500)
      }
    }
  }

  setIsBtn() {
    this.isBtn = true;
    this.origSprite.setFrame(1)
  }

}