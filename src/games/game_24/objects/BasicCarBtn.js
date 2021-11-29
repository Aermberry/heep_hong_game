import Phaser from 'phaser'

export default class BasicCarBtn extends Phaser.GameObjects.Container {



  constructor(scene, x, y, children) {
    super(scene, x, y, children)
    this.origSprite = null
  }

  create(sprite, clickEvent){
    this.origSprite = sprite;
    this.add(this.origSprite)
    this.origSprite.setInteractive({
        useHandCursor: true
    })
    // .on('pointerout', this.out.bind(this))
    .on('pointerdown', this.down.bind(this, clickEvent));
  }
  // out(){
  //   this.origSprite.setFrame(0)
  // }

  down(clickEvent){
    if(typeof clickEvent == 'function') {
      setTimeout(() => {
        clickEvent()
      }, 500)
    }
  }

  setBtnCarGlow() {
    this.origSprite.setFrame(1)
  }

}